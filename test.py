import warnings
from typing import Tuple, List

import numpy as np
import pandas as pd
import os
import shap
import numpy as np
import pandas as pd
import xgboost as xgb
import catboost as cb
import matplotlib.pyplot as plt

from sklearn.metrics import roc_auc_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error

data = pd.read_csv(
    "./data/data.csv"
)

print(data.head(n=2))
print(data.columns)
p = input("Хотите список покупателей")

if p.lower() == "да":
	print(data["Метод доставки"])

