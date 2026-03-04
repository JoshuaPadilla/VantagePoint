from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal
import joblib
import pandas as pd

app = FastAPI()
model = joblib.load("student_performance_model.pkl")

# --- Preprocessing constants (must match the notebook exactly) ---
ORDINAL_MAPPING = {
    "Excellent": 3,
    "Vg": 2,
    "Good": 1,
    "Average": 0,
}

TIME_MAPPING = {
    "ONE": 1, "TWO": 2, "THREE": 3, "FOUR": 4,
    "FIVE": 5, "SIX": 6, "SEVEN": 7,
}

CLASS_LABELS = {3: "Excellent", 2: "Vg", 1: "Good", 0: "Average"}

CATEGORICAL_COLS = [
    "Gender", "Caste", "coaching", "Class_ten_education",
    "twelve_education", "medium", "Father_occupation", "Mother_occupation",
]


class StudentData(BaseModel):
    Gender: Literal["male", "female"]
    Caste: Literal["General", "OBC", "SC", "ST"]
    coaching: Literal["NO", "WA", "OA"]
    Class_ten_education: Literal["SEBA", "OTHERS", "CBSE"]
    twelve_education: Literal["AHSEC", "CBSE", "OTHERS"]
    medium: Literal["ENGLISH", "OTHERS", "ASSAMESE"]
    Class_X_Percentage: Literal["Excellent", "Vg", "Good", "Average"]
    Class_XII_Percentage: Literal["Excellent", "Vg", "Good", "Average"]
    Father_occupation: Literal[
        "DOCTOR", "SCHOOL_TEACHER", "BUSINESS", "COLLEGE_TEACHER",
        "OTHERS", "BANK_OFFICIAL", "ENGINEER", "CULTIVATOR"
    ]
    Mother_occupation: Literal[
        "DOCTOR", "SCHOOL_TEACHER", "BUSINESS", "COLLEGE_TEACHER",
        "OTHERS", "BANK_OFFICIAL", "ENGINEER", "CULTIVATOR", "HOUSE_WIFE"
    ]
    time: Literal["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"]


@app.post("/predict")
def predict_performance(data: StudentData):
    df = pd.DataFrame([data.dict()])

    # 1. Apply ordinal mappings (same as training notebook)
    df["Class_X_Percentage"] = df["Class_X_Percentage"].astype(str).map(ORDINAL_MAPPING)
    df["Class_XII_Percentage"] = df["Class_XII_Percentage"].astype(str).map(ORDINAL_MAPPING)
    df["time"] = df["time"].astype(str).map(TIME_MAPPING)

    # 2. Feature engineering (must mirror train.py)
    df["academic_sum"]  = df["Class_X_Percentage"] + df["Class_XII_Percentage"]
    df["academic_prod"] = df["Class_X_Percentage"] * df["Class_XII_Percentage"]

    # 3. One-hot encode nominal columns with drop_first=True (same as training)
    df_encoded = pd.get_dummies(df, columns=CATEGORICAL_COLS, drop_first=True)

    # 4. Align columns to match exactly what the model was trained on
    #    (reindex adds any missing dummy columns as 0)
    df_aligned = df_encoded.reindex(columns=model.feature_names_in_, fill_value=0)

    # 5. Predict class and confidence
    prediction = int(model.predict(df_aligned)[0])
    proba = model.predict_proba(df_aligned)[0]
    confidence = round(float(max(proba)) * 100, 2)

    return {
        "result": prediction,
        "label": CLASS_LABELS[prediction],
        "confidence": confidence,
    }