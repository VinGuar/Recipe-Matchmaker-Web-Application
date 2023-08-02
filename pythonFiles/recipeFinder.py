import pandas as pd
import ast

def applyRow(row):
    try:
        row = ast.literal_eval(row)
    except:
        pass  
    return row


def ingreds(ingredArr, fullDataTemp, numTemp):

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

    basicIngreds = ["water", "flour", "butter", "sugar", "olive oil", "vegetable oil", "salt", "pepper", "garlic powder", 'onion powder', 'cumin', 'paprika', 'oregano', 'thyme', 'basil', 'rosemary', 'cinnamon', 'nutmeg']
    ingredArr = ingredArr + basicIngreds
    data = update()


    dataFinal = data.loc[data['ingredients'].apply(len) <= numTemp]
    array = list(dataFinal['id'])

    newData = newData.loc[newData['id'].isin(array)]

    newData = newData.loc[newData['n_ingredients'].astype(int) > 3]

    newData = newData.sort_values(by=['n_ingredients'], ascending=False)


    return newData


def tagsUpdate(arr, fullData):


    fullData["tags"] = fullData["tags"].apply(applyRow)
    count = 0
    data = []
    for i in arr:
        if count == 0:
            data = fullData.loc[fullData["tags"].apply(lambda tags: i in tags)]
        else:
            data = pd.concat([data, fullData.loc[fullData["tags"].apply(lambda tags: i in tags)]], ignore_index = True)

        count+=1
    
    return data


def minRest(num, fullData):
    
    data = fullData.loc[fullData["minutes"].astype(int) <= num]
    return data

def dishUpdate(dishArr, fullData):
    
    count = 0
    for item in dishArr:
        if count == 0:
            dataFin = fullData[fullData['name'].str.contains(item, case=False, na=False)]
            df2 = fullData.loc[fullData['tags'].apply(lambda arr: item in arr)]
            data = pd.concat([dataFin, df2], ignore_index = True)

        else:
            df = fullData[fullData['name'].str.contains(item, case=False, na=False)]
            df2 = fullData.loc[fullData['tags'].apply(lambda arr: item in arr)]
            data = pd.concat([df, df2], ignore_index = True)

        data.drop_duplicates(subset="id", inplace=True)

        dataFin = pd.concat([dataFin, data], ignore_index = True)
        dataFin.drop_duplicates(subset="id", inplace=True)
        count+=1
    return dataFin


def mainMaker(fullData, userData):

    dataNew = fullData.copy()

    meal = userData.mealType
    min = userData.maxMin
    cuis = userData.cuisine
    ingred = userData.ingred
    dish = userData.dish
    req = userData.req
    opt = userData.opt

    dataArr = [meal, min, cuis, ingred, dish]

    if (len(meal)==0):
        if 'mealType' in req:
            req.remove('mealType')
        elif 'mealType' in opt:
            opt.remove('mealType')

    if (len(cuis)==0):
        if 'cuisine' in req:
            req.remove('cuisine')
        elif 'cuisine' in opt:
            opt.remove('cuisine')

    if (len(ingred)==0):
        if 'ingred' in req:
            req.remove('ingred')
        elif 'ingred' in opt:
            opt.remove('ingred')

    if (len(dish)==0):
        if 'dish' in req:
            req.remove('dish')
        elif 'dish' in opt:
            opt.remove('dish')

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
            dataTemp = dishUpdate(dish, dataTemp)
            if dataTemp.shape[0] < 3:
                dataTemp = dataNew.copy()

        count+=1    
        
        dataNew = dataTemp.copy()


    
    return dataNew