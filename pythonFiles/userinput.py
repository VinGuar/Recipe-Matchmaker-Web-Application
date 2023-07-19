def checkInt(min):

    if min.isdigit():
        return False
    else:
        print("Please enter a numerical number.")
        return True


def minutes():
    x = True
    while x:
        minutes = input("What is the max amout of minutes you want to spend cooking? (Enter digits): ")
        x = checkInt(minutes)
    return minutes

def ethnic(fullData):

    ethnic = input("Is there any type of Cuisine you want (mexican, italian, etc)? If yes, type which one you want. If not, type 'no' : ")

    while True:
        if ethnic not in ["no", "'no'", "NO", "No"]:
            df = fullData.loc[fullData['tags'].apply(lambda arr: ethnic in arr)]
            if (df.shape[0] > 5):
                break
            else:
                ethnic = input("Your Cuisine was not in the dataset. Either try again with a different wording, choose a different cuisine, or type 'no' : ")
                continue
        else:
            return "none"
    return ethnic

def ingredients(fullData):
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
                ingredList.append(ingred)
            
        else:
            break

    return ingredList

def typeOfMeal():
    mealArray = ["Main Dishes", "Side Dishes", "Appetizers", "Desserts", "Breakfast Foods", "Snacks", "Lunch Foods", ]
    #HAVE SELECT MULTIPLE IF FITS THEIR NEEDS
