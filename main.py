from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import os
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(title="Medical Insurance Cost Prediction API")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
try:
    # Model is in the parent directory
    model_path = os.path.join(os.path.dirname(__file__), '..', 'insurance_model.pkl')
    model = joblib.load(model_path)
    print(f"Model loaded successfully from {model_path}")
except FileNotFoundError:
    print(f"Error: Model file not found at {model_path}")
    model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Define input data model
class InsuranceInput(BaseModel):
    age: int
    sex: str  # "male", "female"
    bmi: float
    children: int
    smoker: str  # "yes", "no"
    region: str  # "southwest", "southeast", "northwest", "northeast"

@app.get("/")
def read_root():
    return {"message": "Medical Insurance Cost Prediction API is running"}

@app.post("/predict")
def predict_insurance_cost(data: InsuranceInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        # 1. Encode Categorical Data
        # Sex: male=0, female=1 (from notebook analysis)
        sex_val = 0 if data.sex.lower() == "male" else 1

        # Smoker: yes=0, no=1 (Note: In the notebook/app logic: smoker=True -> 0, smoker=False -> 1? Wait, let me re-check)
        # Re-checking notebook/app logic:
        # user selection: smoker = st.toggle("Is Smoker?", value=False)
        # smoker_val = 0 if smoker else 1
        # If user selects "Yes" (toggle on), smoker is True. smoker_val becomes 0.
        # If user selects "No" (toggle off), smoker is False. smoker_val becomes 1.
        # So: Yes -> 0, No -> 1.
        
        smoker_val = 0 if data.smoker.lower() == "yes" else 1
        # Region Mapping
        # region_map = {"Southeast": 0, "Southwest": 1, "Northeast": 2, "Northwest": 3}
        region_map = {
            "southeast": 0,
            "southwest": 1,
            "northeast": 2,
            "northwest": 3
        }
        
        region_clean = data.region.lower()
        if region_clean not in region_map:
            raise HTTPException(status_code=400, detail=f"Invalid region. Must be one of {list(region_map.keys())}")
            
        region_val = region_map[region_clean]

        # 2. Prepare Feature Vector
        features = pd.DataFrame([[
            data.age,
            sex_val,
            data.bmi,
            data.children,
            smoker_val,
            region_val
        ]], columns=['age', 'sex', 'bmi', 'children', 'smoker', 'region'])

        # 3. Make Prediction
        prediction = model.predict(features)[0]

        return {
            "prediction_cost": float(prediction),
            "input_summary": {
                "age": data.age,
                "bmi": data.bmi,
                "smoker_status": "Yes" if data.smoker.lower() == "yes" else "No",
                "risk_factor": "High" if data.smoker.lower() == "yes" or data.bmi > 30 else "Normal"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
