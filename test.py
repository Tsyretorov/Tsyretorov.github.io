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



list_col = ['Order_ID', 'Приоритет', 'Количество', 'Выручка', 'Метод доставки',
			'Прибыль', 'Покупатель', 'Регион', 'Продукт', 'Упаковка продукта']


x = data["Регион"]
y = data["Прибыль"]

plt.bar(x, y, label='Величина прибыли') #Параметр label позволяет задать название величины для легенды
plt.xlabel('Месяц года')
plt.ylabel('Прибыль, в млн руб.')
plt.title('Пример столбчатой диаграммы')
plt.legend()
plt.show()

plt.rcdefaults()
fig, ax = plt.subplots()


people = data["Приоритет"]
y_pos = np.arange(len(people))
performance = 3 + 10 * np.random.rand(len(people))
error = np.random.rand(len(people))

ax.barh(y_pos, performance, xerr=error, align='center')
ax.set_yticks(y_pos, labels=people)
ax.invert_yaxis()  # labels read top-to-bottom
ax.set_xlabel('Performance')
ax.set_title('How fast do you want to go today?')

plt.show()