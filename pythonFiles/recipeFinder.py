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
            print(data)
        else:
            data = pd.concat([data, fullData.loc[fullData["tags"].apply(lambda tags: i in tags)]], ignore_index = True)

        count+=1
    
    return data


def minRest(num, fullData):
    
    data = fullData.loc[fullData["minutes"].astype(int) <= num]
    return data

#def decideOrder(d2Array):
    reqArr = d2Array[0]
    optRanked = d2Array[1]

    dictOrder = {"0": "ingreds", "1": "minRest", "2": "cuisine", "3": "mealType"}
    reqCoded = []
    optRankedCoded = []

    count = 0
    while count < len(reqArr):
        reqCoded.append(dictOrder[reqArr[count]])
        count+=1
    
    count=0
    while count<len(optRanked):
        optRankedCoded.append(dictOrder[optRanked[count]])
        count+=1

    return [reqCoded, optRankedCoded]

def mainMaker(fullData, d2array, userData):

    #for reference!
    dictOrder = {"0": "ingreds", "1": "minRest", "2": "cuisine", "3": "mealType"}
    dataNew = fullData

    reqArr = d2array[0]
    optRanked = d2array[1]

    count = 0
    while count < len(reqArr):
        if reqArr[count] == "0":
            dataNew = ingreds(userData[0], dataNew)
        elif reqArr[count] == "1":
            dataNew = minRest(userData[1], dataNew)
        elif reqArr[count] == "2":
            dataNew = tagsUpdate(userData[2], dataNew)
        elif reqArr[count] == "3":
            dataNew = tagsUpdate(userData[3], dataNew)
            print(dataNew)
            print(userData[3])
        
        print(dataNew)

        count += 1

    count = 0
    while count < len(optRanked):
        if optRanked[count] == "0":
            dataTemp = ingreds(userData[0], dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew

        elif optRanked[count] == "1":
            dataTemp = minRest(userData[1], dataNew)
            if dataTemp.shape[0] == 0:
                dataTemp = dataNew

        elif optRanked[count] == "2":
            if userData[2][0] != "all":
                dataTemp = tagsUpdate(userData[2], dataNew)
                if dataTemp.shape[0] == 0:
                    dataTemp = dataNew

        elif optRanked[count] == "3":
            if userData[3][0] != "all":
                dataTemp = tagsUpdate(userData[3], dataNew)
                if dataTemp.shape[0] == 0:
                    dataTemp = dataNew
        

        dataNew = dataTemp
        print(dataNew)


        count+=1
    
    return dataNew