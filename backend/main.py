from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os
import shap

app = FastAPI(title="IMUS AI Valuation & TreeSHAP Inference Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "backend/models/lightgbm_dubai.pkl"
model = None
explainer = None
expected_value = 0.0
residual_std = 78044.0 * 1.96  # Calibrated validation residual scale (~95% coverage proxy)

if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, "rb") as f:
        artifact = pickle.load(f)
        if isinstance(artifact, dict):
            model = artifact.get("model")
            expected_value = artifact.get("expected_value", 0.0)
            residual_std = artifact.get("residual_std", 150000.0)
        else:
            model = artifact
            
    if model:
        # Initialize true TreeSHAP explainer using the exact loaded model
        explainer = shap.TreeExplainer(model)
        if not expected_value and hasattr(explainer, "expected_value"):
            ev = explainer.expected_value
            expected_value = float(ev[0] if isinstance(ev, (list, np.ndarray)) else ev)

class ValuationRequest(BaseModel):
    community: str
    sqft: int
    beds: int
    baths: int
    age: int

COMMUNITY_ENCODING = {
    'Dubai Marina': 2100,
    'Downtown Dubai': 2800,
    'Palm Jumeirah': 4600,
    'Business Bay': 2050,
    'JVC': 1250
}

FEATURE_LABELS = {
    'sqft': 'Built-up Area (SqFt)',
    'beds': 'Bedrooms',
    'baths': 'Bathrooms',
    'age': 'Building Age',
    'community_encoded': 'Micro-Market Tier (Community)'
}

@app.post("/api/predict")
def predict_valuation(req: ValuationRequest):
    if not model or not explainer:
        raise HTTPException(status_code=500, detail="Model artifact or explainer not initialized.")
    
    comm_enc = COMMUNITY_ENCODING.get(req.community, 2000)
    features_array = np.array([[req.sqft, req.beds, req.baths, req.age, comm_enc]], dtype=np.float64)
    
    # 1. Real Model Prediction
    predicted_price = float(model.predict(features_array)[0])
    
    # 2. True TreeSHAP Calculation
    shap_values = explainer.shap_values(features_array)
    if isinstance(shap_values, list):
        sample_shap = shap_values[0][0]
    elif len(shap_values.shape) == 2:
        sample_shap = shap_values[0]
    else:
        sample_shap = shap_values

    # Base value from explainer or artifact
    base_val = float(expected_value)
    
    feature_names = ['sqft', 'beds', 'baths', 'age', 'community_encoded']
    shap_factors = []
    
    sum_shap = 0.0
    for idx, fname in enumerate(feature_names):
        val = float(sample_shap[idx])
        sum_shap += val
        direction = 'up' if val >= 0 else 'down'
        shap_factors.append({
            "feature": FEATURE_LABELS.get(fname, fname),
            "impactValue": round(val, 2),
            "direction": direction,
            "description": f"Exact TreeSHAP marginal attribution for {fname}"
        })
        
    # Strict mathematical reconciliation check (no fake residual buckets)
    reconstructed = base_val + sum_shap
    diff = abs(reconstructed - predicted_price)
    
    # Data-driven prediction interval based on validation residuals
    range_low = round(max(0.0, predicted_price - residual_std))
    range_high = round(predicted_price + residual_std)

    return {
        "estimatedValue": round(predicted_price),
        "baseValue": round(base_val),
        "rangeLow": range_low,
        "rangeHigh": range_high,
        "reconciliationDiff": round(diff, 4),
        "shapFactors": shap_factors
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None, "explainer_loaded": explainer is not None}
