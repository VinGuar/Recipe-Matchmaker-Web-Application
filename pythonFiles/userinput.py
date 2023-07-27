def ethnic(fullData, inp):

    message = ""
    boolean = False

    df = fullData.loc[fullData['tags'].apply(lambda arr: inp in arr)]
    if (df.shape[0] > 0):
        boolean = True
        return [message, boolean]
                    
    else:
        message = "Your Cuisine was not in the dataset. Either try again with a different wording, choose a different cuisine, or move on"
        boolean = False

        return [message, boolean]
                

        

def ingredients(fullData, inp):
    int = 1
    ingred = ""
    ingredList = []
    print("Enter an Ingredient you currently have, and hit enter. When your done, type 'done' :  ")
    while True:
        ingred = input(str(int) + ": ")
        int+=1
        if ingred not in ["DONE", "Done", "done", "'done'"]:
            df = fullData.loc[fullData['ingredients'].apply(lambda arr: ingred in arr)]
            if df.shape[0]>0:
                if ingred in ingredList:
                    print("You have already chosen this one. Either choose a different one or type 'done'")
                else:
                    ingredList.append(ingred)
            else:
                print("This ingredient was not in dataset. Change wording / spelling and try again, or just enter a different one.")
            
        else:
            if len(ingredList) == 0:
                ingredList = ["all"]
            break

    return ingredList


    
    
    