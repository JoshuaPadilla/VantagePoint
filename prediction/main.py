from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal
import joblib
import pandas as pd
import uvicorn

app = FastAPI()
model_artifact = joblib.load("student_performance_model.pkl")

# --- Preprocessing constants (must match the notebook exactly) ---
ORDINAL_MAPPING = {
    "Average": 1,
    "Good": 2,
    "Vg": 3,
    "Excellent": 4,
}

if isinstance(model_artifact, dict):
    model = model_artifact["model"]
    feature_columns = model_artifact["feature_columns"]
    CLASS_LABELS = {
        int(key): value
        for key, value in model_artifact.get("class_labels", {}).items()
    }
else:
    model = model_artifact
    feature_columns = list(model.feature_names_in_)
    CLASS_LABELS = {1: "Excellent/Vg", 0: "Good/Average"}

CATEGORICAL_COLS = [
    "Gender", "Caste", "coaching", "Class_ten_education",
    "twelve_education", "medium", "Father_occupation", "Mother_occupation",
    "time",
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
    payload = data.model_dump()
    print("Received data:", payload)
    df = pd.DataFrame([payload])

    # 1. Apply ordinal mappings (same as training notebook)
    df["Class_X_Percentage"] = df["Class_X_Percentage"].astype(str).map(ORDINAL_MAPPING)
    df["Class_XII_Percentage"] = df["Class_XII_Percentage"].astype(str).map(ORDINAL_MAPPING)
    if df[["Class_X_Percentage", "Class_XII_Percentage"]].isnull().any().any():
        raise ValueError("Unexpected grade band received by the prediction service.")

    df[["Class_X_Percentage", "Class_XII_Percentage"]] = df[
        ["Class_X_Percentage", "Class_XII_Percentage"]
    ].astype(int)

    # 2. Feature engineering (must mirror train.py)
    df["academic_sum"] = df["Class_X_Percentage"] + df["Class_XII_Percentage"]
    df["academic_product"] = (
        df["Class_X_Percentage"] * df["Class_XII_Percentage"]
    )

    # 3. One-hot encode every categorical input with the same settings as training.
    df_encoded = pd.get_dummies(
        df,
        columns=CATEGORICAL_COLS,
        drop_first=False,
        dtype=int,
    )

    # 4. Align columns to match exactly what the model was trained on
    #    (reindex adds any missing dummy columns as 0)
    df_aligned = df_encoded.reindex(columns=feature_columns, fill_value=0)

    # 5. Predict binary class and confidence
    prediction = int(model.predict(df_aligned)[0])
    proba = model.predict_proba(df_aligned)[0]
    confidence = round(float(proba[prediction]) * 100, 2)

    return {
        "result": prediction,
        "label": CLASS_LABELS[prediction],
        "confidence": confidence,
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8006, reload=True)