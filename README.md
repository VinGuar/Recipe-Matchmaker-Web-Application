# Recipe Matchmaker Web Application

URL: recipematchmaker.com

### Description:
In this repository it gives you personolized recipes based on different filters and things the user wants in a recipe. From things like Cuisine, to using only ingredients you currently have, to many more, it finds you the perfect recipes from almost 200,000 options. It contains two folders, one for the frontend Next.JS website, and one for the backend, which is a FastAPI application. 

<br/>

### How to use it
Navigate on over to recipematchmaker.com and enter in your input into the filters and let the application do its magic to find you the best recipes that are tailored to your needs.
<br/>

## File/Folder breakdown:

### backend-recipe-finder folder:

This folder contains the FastAPI, and also the python code and dataset that is used to find the recipes

- **RecpeFinder.py:** This file is where the recipe finding is done, it takes the user input and uses the ranking filter to filter out and remove recipes that do not match their needs, eventually returning the recipes list that contains user recipes.

- **userinput.py** This file is where user data is validated, it sees if it exists in dataset, and if it does not, it sends back an error message to display to the user.

- **main.py** This file is where the fastapi is located. It recieves data from the front end, manipulates it based on what it is with the other files, and sends it back to be used for the frontend.

- **recipes.parquet** This is needed because you can only upload up to 50 MBS to vercel, so I needed to make the dataset into a smaller and compressed file to fit into this requirement.


### recipe folder:

This folder contains the Next.JS front end. The files contained in here are more self-explainable as it is just the frontend.


## Other Notes:

- I hope you enjoy this tool! Let me know if there is any questions, ideas, or bugs you have that you want to run by me.