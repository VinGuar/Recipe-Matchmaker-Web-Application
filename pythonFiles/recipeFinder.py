import pandas as pd
import ast

def applyRow(row):
    try:
        row = ast.literal_eval(row)
    except:
        pass  
    return row


def ingreds(ingredArr, fullData):

    def removeIngred(row):
        row = ast.literal_eval(row)

        for i in ingredArr:
            for n in row:
                if i in n:
                    i = n
                    row.remove(n)
        return row


    def update():
        fullData['ingredients'] = fullData['ingredients'].apply(removeIngred)
      
            
        return fullData
    
    
    data = update()


    dataFinal = data.loc[data['ingredients'].apply(len) <= 0]
    dataFinal = dataFinal.loc[dataFinal['n_ingredients'].astype(int) > 0]

    return dataFinal


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

    dataNew = fullData

    #for reference!
    #mealType=[] maxMin=5 cuisine=[] ingred=[] dish=[] req=['maxMin'] opt=[]

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
            dataNew = tagsUpdate(meal, dataNew)
        elif req[count] == "maxMin":
            dataNew = minRest(min, dataNew)
        elif req[count] == "cuisine":
            dataNew = tagsUpdate(cuis, dataNew)
        elif req[count] == "ingred":
            dataNew = ingreds(ingred, dataNew)
        elif req[count] == "dish":
            dataNew = dishUpdate(dish, dataNew)

        count+=1
        
        print(dataNew)


    count = 0

    while count < len(opt):
        if opt[count] == "mealType":
            dataTemp = tagsUpdate(meal, dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew

        elif opt[count] == "maxMin":
            dataTemp = minRest(min, dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew

        elif opt[count] == "cuisine":
            dataTemp = tagsUpdate(cuis, dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew

        elif opt[count] == "ingred":
            dataTemp = ingreds(ingred, dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew

        elif opt[count] == "dish":
            dataTemp = dishUpdate(dish, dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew
        

        dataNew = dataTemp
        #print(dataNew)


        count+=1
    
    return dataNew