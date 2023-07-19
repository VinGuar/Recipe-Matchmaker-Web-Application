import pandas as pd
import numpy as np
import userinput

fullData = pd.read_csv("recipes.csv")

#minutes = userinput.minutes()
#ethnic = userinput.ethnic(fullData)
ingredArray = userinput.ingredients(fullData)
print(ingredArray)