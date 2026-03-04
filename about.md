# About the Thesis

## Title

Prediction of Student Performance in the Entrance Examination using Classification Technique

## Overview

This thesis focuses on predicting student performance in an entrance examination using machine learning classification techniques.

The system analyzes student background data and academic history.  
It then predicts the expected performance category:

- Excellent
- Very Good
- Good
- Average

The goal is to support early academic assessment using data-driven methods.

---

## Data Source

Due to data access limitations, the study uses a proxy dataset from Kaggle:

Student Performance on an Entrance Examination  
https://www.kaggle.com/datasets/adilshamim8/student-performance-on-an-entrance-examination

This dataset contains demographic, academic, and socio-economic attributes of students.

It serves as a structured substitute for institution-specific entrance exam data.

---

## Features Used in the Model

The prediction model uses the following input features:

### Demographic Information

- Gender
- Caste
- Medium of instruction

### Academic Background

- Class Ten Education Board
- Class Twelve Education Board
- Class X Percentage (Excellent, Vg, Good, Average)
- Class XII Percentage (Excellent, Vg, Good, Average)

### Socio-Economic Factors

- Father’s Occupation
- Mother’s Occupation

### Preparation Factor

- Coaching type
- Daily study time

These variables are encoded and used as predictors in the classification model.

---

## Core Methodology

The study applies a supervised machine learning approach.

### Model Used

Random Forest Classifier

This algorithm was selected because:

- It handles categorical variables effectively
- It reduces overfitting through ensemble learning
- It performs well in multi-class classification problems

### Target Variable

Entrance examination performance category:

- 3 → Excellent
- 2 → Vg
- 1 → Good
- 0 → Average

---

## Model Evaluation Results

The trained Random Forest Classifier produced the following metrics:

- Accuracy: 0.4478
- Precision: 0.451
- Recall: 0.4478
- F1 Score: 0.4364

### Confusion Matrix

| Actual \ Predicted | Average | Good | Vg  | Excellent |
| ------------------ | ------- | ---- | --- | --------- |
| Average            | 23      | 6    | 2   | 0         |
| Good               | 5       | 17   | 9   | 3         |
| Vg                 | 1       | 19   | 17  | 5         |
| Excellent          | 1       | 13   | 10  | 3         |

The results show moderate predictive capability.  
The model demonstrates challenges in distinguishing higher performance levels.

---

## Objectives of the Study

- To collect and prepare a structured dataset related to student entrance exam performance
- To build a predictive classification model
- To evaluate model performance using:
    - Accuracy
    - Precision
    - Recall
    - F1 Score
    - Confusion Matrix
- To design a user interface that allows performance prediction based on student input data

---

## Scope

- Uses Kaggle dataset as proxy data
- Focused on classification-based prediction
- Multi-class performance categorization
- Includes UI for prediction input and output display

---

## Expected Contribution

This study demonstrates how machine learning can:

- Assist in predicting entrance exam outcomes
- Identify patterns in academic and socio-economic factors
- Support early academic performance analysis

It provides a foundation for future work using real institutional data.
