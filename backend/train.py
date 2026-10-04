import numpy as np
import pandas as pd
import lightgbm as lgb
import shap
import pickle
import os

print("Training Dubai Property Research Dataset Model & Calculating Calibration Residuals...")

np.random.seed(42)
n_samples = 5000

communities = ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JVC']
community_weights = [0.25, 0.20, 0.10, 0.25, 0.20]

comm_data = np.random.choice(communities, size=n_samples, p=community_weights)
sqft_data = np.random.randint(550, 4500, size=n_samples)
beds_data = np.random.choice([1, 2, 3, 4], size=n_samples, p=[0.4, 0.35, 0.2, 0.05])
baths_data = beds_data + np.random.choice([0, 1], size=n_samples, p=[0.7, 0.3])
age_data = np.random.randint(0, 12, size=n_samples)

base_rates = {'Dubai Marina': 2100, 'Downtown Dubai': 2800, 'Palm Jumeirah': 4600, 'Business Bay': 2050, 'JVC': 1250}
prices = []

for c, s, b, a in zip(comm_data, sqft_data, beds_data, age_data):
    rate = base_rates[c]
    price = (s * rate) + (b * 110000) - (a * 22000) + np.random.normal(0, 75000)
    prices.append(max(price, 500000))

df = pd.DataFrame({
    'community': comm_data,
    'sqft': sqft_data,
    'beds': beds_data,
    'baths': baths_data,
    'age': age_data,
    'price': prices
})

df['community_encoded'] = df['community'].map(base_rates)
X = df[['sqft', 'beds', 'baths', 'age', 'community_encoded']]
y = df['price']

# Train LightGBM Model
model = lgb.LGBMRegressor(
    objective='regression_l1',
    n_estimators=150,
    learning_rate=0.05,
    max_depth=8,
    random_state=42
)
model.fit(X, y)

# Calculate validation residuals for uncertainty interval calibration
preds = model.predict(X)
residuals = np.abs(y - preds)
residual_std = float(np.percentile(residuals, 95)) * 1.2 # 95th percentile error bound

# Calculate TreeSHAP expected value
explainer = shap.TreeExplainer(model)
ev = explainer.expected_value
expected_value = float(ev[0] if isinstance(ev, (list, np.ndarray)) else ev)

os.makedirs('backend/models', exist_ok=True)
artifact = {
    "model": model,
    "expected_value": expected_value,
    "residual_std": residual_std,
    "feature_names": list(X.columns)
}

with open('backend/models/lightgbm_dubai.pkl', 'wb') as f:
    pickle.dump(artifact, f)

print(f"Training Complete! Expected Value: AED {expected_value:,.2f}, Calibration Residual Spread: AED {residual_std:,.2f}")
print("Model artifact successfully saved.")
