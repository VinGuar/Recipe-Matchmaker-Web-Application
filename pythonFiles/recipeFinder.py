#This file finds recipes for user based on their input. 

import pandas as pd
import ast

#turns stringified arrays into arrays
def applyRow(row):
    try:
        row = ast.literal_eval(row)
    except:
        pass  
    return row

#finds reciopes that match ingredients entered
def ingreds(ingredArr, fullDataTemp, numTemp):

    #removes ingredients from rows. This is done to see which rows are left with no ingredients, which means that all of its ingredients are user ingredients.
    def removeIngred(row):

        row = ast.literal_eval(row)

        for useringred in ingredArr:
            for ingr in row:
                if useringred in ingr:
                    row.remove(ingr)
        return row

    
    def update():
        fullDataTemp['ingredients'] = fullDataTemp['ingredients'].apply(removeIngred)
                  
        return fullDataTemp
    

    newData = fullDataTemp.copy()

    #ingredients that most people have already in their household
    basicIngreds = ["water", "flour", "butter", "sugar", "olive oil", "vegetable oil", "salt", "pepper", "garlic powder", 'onion powder', 'cumin', 'paprika', 'oregano', 'thyme', 'basil', 'rosemary', 'cinnamon', 'nutmeg']
    ingredArr = ingredArr + basicIngreds
    data = update()

    #next 8ish lines find dataframes where ingredients are less than numTemp and then gets these rows id to copy into a new dataframe
    #new dataframe does not have ingredients removed by old dataframe. Then it sorts values and returns them.
    dataFinal = data.loc[data['ingredients'].apply(len) <= numTemp]
    array = list(dataFinal['id'])

    newData = newData.loc[newData['id'].isin(array)]

    newData = newData.loc[newData['n_ingredients'].astype(int) > 3]

    newData = newData.sort_values(by=['n_ingredients'], ascending=False)

    return newData

#Updates both the cuisine and course type into a dataframe.
def tagsUpdate(arr, fullData):

    #makes string arrays into normal arrays
    fullData["tags"] = fullData["tags"].apply(applyRow)
    count = 0
    data = []
    #for loop loops from the array and adds these recipes that it finds into the main dataframe for eachelement in array of input
    for i in arr:
        if count == 0:
            data = fullData.loc[fullData["tags"].apply(lambda tags: i in tags)]
        else:
            data = pd.concat([data, fullData.loc[fullData["tags"].apply(lambda tags: i in tags)]], ignore_index = True)

        count+=1
    
    return data

#function that makes dataframe of only recipes under the max number of minutes
def minRest(num, fullData):
    
    data = fullData.loc[fullData["minutes"].astype(int) <= num]
    return data

#updates the dish type aspect into an array
def dishUpdate(dishArr, fullData, arrForIngred):
    
    #this for loop finds where the dish is located in the name, tags, and description, and adds all into a main array, and then drops duplicates.
    count = 0
    for item in dishArr:
        if count == 0:
            dataFin = fullData[fullData['name'].str.contains(item, case=False, na=False)]
            df2 = fullData.loc[fullData['tags'].apply(lambda arr: item in arr)]
            df3 = fullData.loc[fullData['description'].apply(lambda arr: item in arr)]
            data = pd.concat([dataFin, df2], ignore_index = True)
            data = pd.concat([data, df3], ignore_index=True)

        else:
            df = fullData[fullData['name'].str.contains(item, case=False, na=False)]
            df2 = fullData.loc[fullData['tags'].apply(lambda arr: item in arr)]
            df3 = fullData.loc[fullData['description'].apply(lambda arr: item in arr)]
            data = pd.concat([df, df2], ignore_index = True)
            data = pd.concat([data, df3], ignore_index=True)

        data.drop_duplicates(subset="id", inplace=True)

        dataFin = pd.concat([dataFin, data], ignore_index = True)
        dataFin.drop_duplicates(subset="id", inplace=True)
        count+=1
    

    return dataFin

#this is the main function that creates the recipes for the user. Calls the other functions.
def mainMaker(fullData, userData):

    dataNew = fullData.copy()

    #creates variables for the user data.
    meal = userData.mealType
    min = userData.maxMin
    cuis = userData.cuisine
    ingred = userData.ingred
    dish = userData.dish
    req = userData.req

    #The next sequence of if statements removes blank arrays from required options
    if (len(meal)==0):
        if 'mealType' in req:
            req.remove('mealType')

    if (len(cuis)==0):
        if 'cuisine' in req:
            req.remove('cuisine')

    if (len(ingred)==0):
        if 'ingred' in req:
            req.remove('ingred')

    if (len(dish)==0):
        if 'dish' in req:
            req.remove('dish')


    #This while loop is where each filter is done, if its in req it calls its parent function. If the df has at least 3 options it keeps it, and if it doesnt, it sets it to its old value.
    count = 0
    while count < len(req):
        if req[count] == "mealType":
            dataTemp = dataNew.copy()
            dataTemp = tagsUpdate(meal, dataTemp)
            if dataTemp.shape[0] < 3:
                dataTemp = dataNew.copy() 

        elif req[count] == "maxMin":
            dataTemp = dataNew.copy()
            dataTemp = minRest(min, dataTemp)
            if dataTemp.shape[0] < 3:
                dataTemp = dataNew.copy()

        elif req[count] == "cuisine":
            dataTemp = dataNew.copy()
            dataTemp = tagsUpdate(cuis, dataTemp)
            if dataTemp.shape[0] < 3:
                dataTemp = dataNew.copy()

        #This one is a little different. If it has less than 3, it then finds matches that are only one off, then two, and so on.
        elif req[count] == "ingred":
            dataTemp = dataNew.copy()
            dataTemp = ingreds(ingred, dataTemp, 0)

            if dataTemp.shape[0] < 3:
                dataTemp = dataNew.copy()
                dataTemp = ingreds(ingred, dataTemp, 1)

                if dataTemp.shape[0] < 3:
                    dataTemp = dataNew.copy()
                    dataTemp = ingreds(ingred, dataTemp, 2)


                    if dataTemp.shape[0] < 3:
                        dataTemp = dataNew.copy()
                        dataTemp = ingreds(ingred, dataTemp, 3)

                        if dataTemp.shape[0] < 3:
                            dataTemp = dataNew.copy()
                            dataTemp = ingreds(ingred, dataTemp, 4)

                            if dataTemp.shape[0] < 3:
                                dataTemp = dataNew.copy()

        elif req[count] == "dish":
            dataTemp = dataNew.copy()
            dataTemp = dishUpdate(dish, dataTemp, req)
            if dataTemp.shape[0] < 3:
                dataTemp = dataNew.copy()
        if 'ingred' in req:
            if req.index('ingred') < count:
                dataTemp = dataTemp.sort_values(by=['n_ingredients'], ascending=False)

        count+=1    
        
        dataNew = dataTemp.copy()


    
    return dataNew