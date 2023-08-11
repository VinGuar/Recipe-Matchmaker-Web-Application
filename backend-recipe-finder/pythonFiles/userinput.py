#This file validates user data on entry.
import pandas as pd

#validates cuisine type.
def ethnic(fullData, inp):

    message = ""
    boolean = False

    #makes dataframe with user input, and if greater than 0 length, it continues. If not, it gives error message and returns.
    df = fullData.loc[fullData['tags'].apply(lambda arr: inp in arr)]
    if (df.shape[0] > 2):
        boolean = True
        return [message, boolean]
                    
    else:
        message = "Your Cuisine was not in the dataset. Either try again with a different wording / spelling, choose a different cuisine, or move on"
        boolean = False

        return [message, boolean]
                

        
#validates ingredients
def ingredients(fullData, inp):
    message = ""
    boolean = False

    #makes dataframe with user input, and if greater than 0 length, it continues. If not, it gives error message and returns.
    df = fullData.loc[fullData['ingredients'].apply(lambda arr: inp in arr)]
    if df.shape[0]>0:
        boolean = True
        return [message, boolean]
    else:
        message = "This ingredient was not in dataset. Change wording / spelling and try again, or just enter a different one."
        boolean = False

        return [message, boolean]


#validates meal type
def typeMeal(fullData, inp):

    message = ""
    boolean = False
    
    #makes dataframes with user input, and if greater than 0 length, it continues. If not, it gives error message and returns.
    try:
        df = fullData[fullData['name'].str.contains(inp, case=False, na=False)]
    except:
        df = pd.DataFrame()
    try:
        df2 = fullData.loc[fullData['tags'].apply(lambda arr: inp in arr)]
    except:
        df2 = pd.DataFrame()

    if ((df.shape[0]>2) or (df2.shape[0]>2)):

        boolean = True
        return [message, boolean]
    
    else:
        message = "This type of meal was not in dataset. Change wording / spelling and try again, or just enter a different one."
        boolean = False

        return [message, boolean]
    
    
    