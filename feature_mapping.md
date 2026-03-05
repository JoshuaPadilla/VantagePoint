# Dataset Adaptation and Feature Mapping

## Thesis Title:

**Prediction of Student Performance in the Entrance Examination using
Classification Technique**

------------------------------------------------------------------------

## Dataset Source

Due to restrictions in accessing institutional student data, a publicly
available dataset from Kaggle titled *Student Performance on an Entrance
Examination* was utilized.

The dataset was contextually adapted to align with the Philippine
educational system and the objectives of this study. The variables were
mapped to equivalent local educational indicators to simulate entrance
examination prediction modeling.

------------------------------------------------------------------------

# Feature Mapping and Contextual Interpretation

## 1. Gender

**Original Attribute:** Gender (string)\
**Mapped Variable:** Student Sex (Demographic Profile)

Represents the biological classification of the student and is used as a
demographic predictor variable in determining entrance examination
performance.

------------------------------------------------------------------------

## 2. Caste

**Original Attribute:** Caste (string)\
**Mapped Variable:** Socioeconomic Background Category

Since caste classification is specific to the dataset's country of
origin, this variable was reinterpreted as a categorical indicator of
socioeconomic background.

It serves as a proxy for: - Socioeconomic classification - Educational
access level - Social background category

------------------------------------------------------------------------

## 3. coaching

**Original Attribute:** coaching (string)\
**Mapped Variable:** Entrance Examination Review Participation

Indicates whether the student attended a formal review program prior to
taking the entrance examination.

-   Yes = Attended review center\
-   No = Did not attend

------------------------------------------------------------------------

## 4. Class_ten_education

**Original Attribute:** Class_ten_education (string)\
**Mapped Variable:** Junior High School Institution Type

Represents the type of institution where the student completed Junior
High School education.

Possible contextual equivalents: - Public School\
- Private School\
- Science High School\
- Technical-Vocational School

------------------------------------------------------------------------

## 5. twelve_education

**Original Attribute:** twelve_education (string)\
**Mapped Variable:** Senior High School Academic Track or Institution
Type

Represents the student's academic background prior to taking the
entrance examination.

Possible Philippine equivalents: - STEM\
- ABM\
- HUMSS\
- TVL\
- GAS

------------------------------------------------------------------------

## 6. medium

**Original Attribute:** medium (string)\
**Mapped Variable:** Primary Language of Instruction

Refers to the primary language used during the student's previous
education.

Contextual equivalents: - English\
- Filipino\
- Bilingual

This variable may influence comprehension during the entrance
examination.

------------------------------------------------------------------------

## 7. Class_X\_Percentage

**Original Attribute:** Class_X\_Percentage (string)\
**Mapped Variable:** Junior High School General Average

Represents the student's academic performance during Junior High
School.\
Converted to numeric format for model training.

------------------------------------------------------------------------

## 8. Class_XII_Percentage

**Original Attribute:** Class_XII_Percentage (string)\
**Mapped Variable:** Senior High School General Average

Represents the student's academic performance during Senior High
School.\
Converted to numeric format for classification modeling.

------------------------------------------------------------------------

## 9. Father_occupation

**Original Attribute:** Father_occupation (string)\
**Mapped Variable:** Father's Employment Category

Used as a socioeconomic indicator that may influence academic
preparation and access to educational resources.

Possible grouped categories: - Professional\
- Skilled Worker\
- Business Owner\
- Government Employee\
- Unemployed

------------------------------------------------------------------------

## 10. Mother_occupation

**Original Attribute:** Mother_occupation (string)\
**Mapped Variable:** Mother's Employment Category

Serves as an additional socioeconomic predictor variable and complements
the father's occupation data.

------------------------------------------------------------------------

## 11. time

**Original Attribute:** time (string)\
**Mapped Variable:** Preparation Time Allocation

Indicates the amount of time dedicated by the student in preparing for
the entrance examination.

This variable reflects study intensity and preparation level prior to
examination.

------------------------------------------------------------------------

# Scope Clarification

Since institutional data from NwSSU was not accessible, this study
utilizes a secondary dataset to simulate entrance examination prediction
modeling.

The results of this study are limited to the dataset used and may not
directly represent NwSSU students without institutional validation.

This study serves as a proof-of-concept implementation of a
classification-based predictive model for entrance examination
performance.
