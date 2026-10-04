import unittest
import os
import pickle
import numpy as np
import shap

class TestImusMLPipeline(unittest.TestCase):
    
    def test_01_model_artifact_exists(self):
        self.assertTrue(os.path.exists("backend/models/lightgbm_dubai.pkl"), "Model artifact missing.")

    def test_02_model_and_explainer_loading(self):
        with open("backend/models/lightgbm_dubai.pkl", "rb") as f:
            artifact = pickle.load(f)
        self.assertIn("model", artifact)
        self.assertIn("expected_value", artifact)
        self.assertIn("residual_std", artifact)
        
        model = artifact["model"]
        explainer = shap.TreeExplainer(model)
        self.assertIsNotNone(explainer)

    def test_03_shap_mathematical_reconciliation(self):
        with open("backend/models/lightgbm_dubai.pkl", "rb") as f:
            artifact = pickle.load(f)
        
        model = artifact["model"]
        expected_val = float(artifact["expected_value"])
        
        # Test feature vector: 1250 sqft, 2 beds, 2 baths, 4 years old, Marina encoded (2100)
        sample = np.array([[1250, 2, 2, 4, 2100]], dtype=np.float64)
        pred = float(model.predict(sample)[0])
        
        explainer = shap.TreeExplainer(model)
        shap_vals = explainer.shap_values(sample)
        if isinstance(shap_vals, list):
            sample_shap = shap_vals[0][0]
        else:
            sample_shap = shap_vals[0]
            
        sum_shap = float(np.sum(sample_shap))
        reconstructed = expected_val + sum_shap
        
        # Verify strict reconciliation within floating-point tolerance
        self.assertAlmostEqual(reconstructed, pred, places=3, msg=f"Reconstructed {reconstructed} does not match prediction {pred}")

    def test_04_prediction_intervals(self):
        with open("backend/models/lightgbm_dubai.pkl", "rb") as f:
            artifact = pickle.load(f)
        
        model = artifact["model"]
        residual_std = float(artifact["residual_std"])
        
        sample = np.array([[1500, 3, 2, 2, 2800]], dtype=np.float64)
        pred = float(model.predict(sample)[0])
        
        range_low = max(0.0, pred - residual_std)
        range_high = pred + residual_std
        
        self.assertLess(range_low, pred)
        self.assertGreater(range_high, pred)

if __name__ == "__main__":
    unittest.main()
