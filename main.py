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

fullData = pd.read_csv("recipes.csv")
fullData = fullData.fillna('')


inp = ""
type1 = ""
message = ''
boolean = False
recipes = []


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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Model(BaseModel):
    userInput: str
    type: str

class Model2(BaseModel):
    mealType: list
    maxMin: int
    cuisine: list
    ingred: list
    dish: list
    req: list
    opt: list

def recipeMaker(answers):
    return recipeFinder.mainMaker(fullData, answers)



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


    return {"post": "return"}

@app.post("/answers")
def doFind(answ: Model2):
    global recipes

    recipes = recipeMaker(answ)

    return {"post": "return2"}

@app.get("/recipes")
async def root():
    global recipes
    recipes = pd.DataFrame(recipes)
    recipes.reset_index(inplace=True)
    recipes = recipes.truncate(after=99)

    recipes = recipes.to_dict(orient='records')
    return {"recipes":recipes}