import pandas as pd
import numpy as np
import pythonFiles.userinput as userinput
import pythonFiles.recipeFinder as recipeFinder
import requests
import json
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from zipfile import ZipFile

#make fast api app
app = FastAPI()

fullData = pd.read_csv('recipes.zip',compression='zip')

fullData = fullData.fillna('')

#blank vars for output on fastapi
inp = ""
type1 = ""
message = ''
boolean = False
recipes = []

#this validates the data sent over
def mainValidater(input1, type2):
    global boolean
    global message

    #these if statements either send it over to userInput to validate further, or stop it right here and send back error message.
    if type2 == "cuisine":
        if (len(input1)>3):
            return userinput.ethnic(fullData, input1)
        else:
            boolean = False
            message = "Please enter a Cuisine type with 4 or more letters."

    elif type2 == "ingreds":
        if (len(input1)>2):
            return userinput.ingredients(fullData, input1)
        else:
            boolean = False
            message = "Please enter an Ingredient with 3 or more letters."

    elif type2 == "typeOfFood":
        if (len(input1)>2):
            return userinput.typeMeal(fullData, input1)
        else:
            boolean = False
            message = "Please enter an Ingredient with 3 or more letters."

    return [message, boolean]

#this is here just so nothing is blocked access.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#model for validating input
class Model(BaseModel):
    userInput: str
    type: str

#model for crating recipes
class Model2(BaseModel):
    mealType: list
    maxMin: int
    cuisine: list
    ingred: list
    dish: list
    req: list

#calls the mainMaker in recipe finder file and returns it.
def recipeMaker(answers):
    return recipeFinder.mainMaker(fullData, answers)


#default get, displays the validation error message or success message.
@app.get("/")
async def root():
    global inp
    global type1
    global boolean
    global message

    return {"valid":boolean, "msg":message}

#this is where the user sends data to validate.
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


    return {"post": "return"}

#this is where all user data is sent from the website
@app.post("/answers")
def doFind(answ: Model2):
    global recipes

    recipes = recipeMaker(answ)

    return {"post": "return2"}

#this is where the recipes are outputted. Drops duplicates and resets index for simplicity. Then it makes it a length of 100 so it is not posting some huge file.
@app.get("/recipes")
async def root():
    global recipes
    recipes = pd.DataFrame(recipes)
    recipes.drop_duplicates(subset="id", inplace=True)
    recipes.reset_index(drop=True, inplace=True)
    recipes = recipes.truncate(after=99)

    recipes = recipes.to_dict(orient='records')
    return {"recipes":recipes}