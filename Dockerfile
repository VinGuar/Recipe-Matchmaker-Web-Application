#Deriving the latest base image
FROM python:latest


#Labels as key value pair
LABEL Maintainer="vincentMe17"


# Any working directory can be chosen as per choice like '/' or '/home' etc
# i have chosen /usr/app/src
WORKDIR /cont

#to COPY the remote file at working directory in container
COPY pythonFiles/ ./pythonFiles/
COPY recipes.csv ./
COPY ./requirements.txt /requirements.txt
COPY main.py  ./

RUN pip install -r /requirements.txt


#CMD instruction should be used to run the software
#contained by your image, along with any arguments.

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
