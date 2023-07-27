import pandas as pd
import numpy as np
import pythonFiles.userinput as userinput
import pythonFiles.recipeFinder as recipeFinder
import requests
import json
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

inp = ""
type1 = ""
message = ''
boolean = False

def mainValidater(input1, type2):
    global boolean
    global message

    if type2 == "cuisine":
        if (len(input1)>3):
            return userinput.ethnic(fullData, input1)
        else:
            boolean = False
            message = "Please enter a Cuisine type with 4 or more letters."

    elif type2 == "ingreds":
        if (len(input1)>2):
            userinput.ingredients(fullData, input1)
        else:
            boolean = False
            message = "Please enter an Ingredient with 3 or more letters."

    elif type2 == "typeOfFood":
        if (len(input1)>2):
            pass
        else:
            boolean = False
            message = "Please enter an Ingredient with 3 or more letters."

    return [message, boolean]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Model(BaseModel):
    userInput: str
    type: str

@app.get("/")
async def root():
    global inp
    global type1
    global boolean
    global message

    return {"valid":boolean, "msg":message}

@app.post("/input")
def validateInput(yes: Model):
    global inp
    global type1
    global boolean
    global message

    inp = yes.userInput
    type1 = yes.type
    returner = mainValidater(yes.userInput, yes.type)

    message = returner[0]
    boolean = returner[1]

    print(message, boolean)

    return {"test": "azsdfghjkl"}


fullData = pd.read_csv("recipes.csv")


#univ = userinput.householdItems()
#print("")
#ingredArr = userinput.ingredients(fullData)
#ingredArr.extend(univ)
#print("")
#minutes = userinput.minutes()
#print("")
#ethnicArr = userinput.ethnic(fullData)
#print("")
#mealArr = userinput.typeOfMeal()
#print("")
#ranked = userinput.rankRequests()

#userData = [ingredArr, minutes, ethnicArr, mealArr]

#dataNew = recipeFinder.mainMaker(fullData, ranked, userData)


#print(dataNew)

