def ethnic(fullData, inp):

    message = ""
    boolean = False

    df = fullData.loc[fullData['tags'].apply(lambda arr: inp in arr)]
    if (df.shape[0] > 0):
        boolean = True
        return [message, boolean]
                    
    else:
        message = "Your Cuisine was not in the dataset. Either try again with a different wording / spelling, choose a different cuisine, or move on"
        boolean = False

        return [message, boolean]
                

        

def ingredients(fullData, inp):
    message = ""
    boolean = False

    df = fullData.loc[fullData['ingredients'].apply(lambda arr: inp in arr)]
    if df.shape[0]>0:
        boolean = True
        return [message, boolean]
    else:
        message = "This ingredient was not in dataset. Change wording / spelling and try again, or just enter a different one."
        boolean = False

        return [message, boolean]


def typeMeal(fullData, inp):

    message = ""
    boolean = False
    
    df = fullData[fullData['name'].str.contains(inp, case=False, na=False)]
    df2 = fullData.loc[fullData['tags'].apply(lambda arr: inp in arr)]

    if ((df.shape[0]>0) or (df2.shape[0]>0)):

        boolean = True
        return [message, boolean]
    
    else:
        message = "This type of meal was not in dataset. Change wording / spelling and try again, or just enter a different one."
        boolean = False

        return [message, boolean]
    
    
    