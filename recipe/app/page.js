'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from '../app/page.module.css'
import '../app/globals.css';
import Select from 'react-select';
import { useState } from 'react';



export default function Home() {



  async function sendData(inp, typeIn){
    var dataToSend = {
      userInput: inp,
      type: typeIn
    };    
    const response = await fetch("http://192.168.80.1:8000/input",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend)
    });
    
    const ans = await fetch("http://192.168.80.1:8000");
    const answer = await ans.json();
    var arr = [answer.valid, answer.msg]
    return arr
  
  }

  var options2 = [

  ];


  const [opt1, setOpt] = useState([]);

    const optChange = () => {
      setOpt(curr => [])

      if (typeMeal.length > 0){
        if (!(req.includes('mealType') || optional.includes('mealType'))){

          setOpt(curr => [...curr, { label: 'Meal Type (Main Dish, Dessert, etc)', value: 'mealType' }])

        }

      }
      if (num != 999999999){
        if (!(req.includes('maxMin') || optional.includes('maxMin'))){
          setOpt(curr => [...curr, { label: 'Max Number of Minutes', value: 'maxMin' }])

        }

      }
      if (typeCuis.length > 0){
        if (!(req.includes('cuis') || optional.includes('cuis'))){
          setOpt(curr => [...curr, { label: 'Cuisine Type (mexican, italian, etc)', value: 'cuis' }])

        }

      }
      if (typeIngred.length > 0){
        if (!(req.includes('ingreds') || optional.includes('ingreds'))){
          setOpt(curr => [...curr, { label: 'Having all the ingredients needed', value: 'ingreds' }])

        }

      }
      if (typeDish.length > 0){
        if (!(req.includes('dish') || optional.includes('dish'))){
          setOpt(curr => [...curr, { label: 'Dish Type (mac n cheese, brownies, etc)', value: 'dish' }])

        }

      }

    }



  const handleClick = (value) => {
    setTest((curr) => curr.filter((item) => item.props.id != value));
    setTypeInc((curr) => curr.filter((item) => item != value));

  }

  const handleClick2 = (value) => {
    setCuisElem((curr) => curr.filter((item) => item.props.id != value));
    setCuis((curr) => curr.filter((item) => item != value));
  }

  const handleClick3 = (value) => {
    setIngredElem((curr) => curr.filter((item) => item.props.id != value));
    setIngred((curr) => curr.filter((item) => item != value));
    setMain((curr) => curr.filter((item) => item != value));

  }

  const handleClick4 = (value) => {
    setDishElem((curr) => curr.filter((item) => item.props.id != value));
    setDish((curr) => curr.filter((item) => item != value));

  }

  const handleClick5 = (value) => {
    setReqElem((curr) => curr.filter((item) => item.props.id != value));
    setReq((curr) => curr.filter((item) => item != value));

  }

  const handleClick6 = (value) => {
    setOptionalElem((curr) => curr.filter((item) => item.props.id != value));
    setOptional((curr) => curr.filter((item) => item != value));

  }


  const options = [
    { label: 'Main Dishes', value: 'main-dish' },
    { label: 'Side Dishes', value: 'side-dishes' },
    { label: 'Appetizers', value: 'appetizers' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Breakfast Foods', value: 'breakfast' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Lunch Foods', value: 'lunch' },

  ];



  const [typeMeal, setTest] = useState([]);
  const [typeMealInc, setTypeInc] = useState([]);

  const [num, setNum] = useState(999999999);


  const [typeCuis, setCuis] = useState([]);
  const [typeCuisElem, setCuisElem] = useState([]);

  const [typeIngred, setIngred] = useState([]);
  const [typeIngredElem, setIngredElem] = useState([]);
  const [main, setMain] = useState([]);


  const [typeDish, setDish] = useState([]);
  const [typeDishElem, setDishElem] = useState([]);

  const [req, setReq] = useState([]);
  const [reqElem, setReqElem] = useState([]);

  const [optional, setOptional] = useState([]);
  const [optionalElem, setOptionalElem] = useState([]);



  const handleChange = (selectedOption) => {
    var label = selectedOption['label']
    var value = selectedOption['value']
    

    if (typeMealInc.includes(value)){
      window.alert("Already selected. Please select a different one.")
    } else {
      setTest(curr => [...curr, <li id={value} className={styles.list} onClick={() => handleClick(value)}>{label}</li>]);
      setTypeInc(prevState  => [...prevState, value]);
    }


  }

  const handleChange2 = (selectedOption) => {
    var label = selectedOption['label']
    var value = selectedOption['value']

    if (req.includes(value)){

      window.alert("Already selected. Please select a different one.")
    } else {
      setReqElem(curr => [...curr, <li id={value} className={styles.list} onClick={() => handleClick5(value)}>{label}</li>]);
      setReq(prevState  => [...prevState, value]);
    }

  }

  const handleChange3 = (selectedOption) => {
    var label = selectedOption['label']
    var value = selectedOption['value']

    if (req.includes(value)){

      window.alert("Already selected. Please select a different one.")
    } else {
      setOptionalElem(curr => [...curr, <li id={value} className={styles.list} onClick={() => handleClick6(value)}>{label}</li>]);
      setOptional(prevState  => [...prevState, value]);
    }

  }

  const keyClick1 = (event) => {
    if (event.key === "Enter"){
      var numTemp = document.getElementById("numInput").value
      if (isNaN(numTemp)){

        window.alert("Please enter just a positive numerical number")
        document.getElementById("numInput").value = ""

      } else{

        if (numTemp === ""){
          window.alert("Please enter just a positive numerical number")
        }
        setNum(current => numTemp)
        document.getElementById("numInput").blur()
      }

    }
  }

  const keyClick2 = async (event) => {
    if (event.key === "Enter"){
      var cuisTemp = document.getElementById("cuisInput").value
      if (typeCuis.includes(cuisTemp)){
        window.alert("Already selected. Please choose something else.")

      } else if (cuisTemp.length < 4){
        window.alert("Please enter more than 3 letters.")
      }else{
          var arr1 = await sendData(cuisTemp, "cuisine")
          console.log(arr1);

            if (arr1[0]===true){
              setCuisElem(curr => [...curr, <li id={cuisTemp} className={styles.list} onClick={() => handleClick2(cuisTemp)}>{cuisTemp}</li>])
              setCuis(curr => [...curr, cuisTemp])
              document.getElementById("cuisInput").value = ""
            } else{
              window.alert(arr1[1])
            }

          }

        
      }

  }

  const keyClick3 = async (event) => {
    if (event.key === "Enter"){
      var ingred = document.getElementById("ingredInput").value
      if (typeIngred.includes(ingred)){

        if (main.includes(ingred)){
          window.alert("Already selected as MAIN. Please choose something else.")
        } else {
          setIngredElem((curr) => curr.filter((item) => item.props.id != ingred));
          setIngredElem(curr => [...curr, <li id={ingred} className={styles.list} onClick={() => handleClick3(ingred)}>{ingred} - MAIN</li>])
          setMain(curr => [...curr, ingred])
          document.getElementById("ingredInput").value = ""

        }

      } else if (ingred.length < 3){
        window.alert("Please enter more than 2 letters.")
      }else{
            var arr2 = await sendData(ingred, "ingreds")
            if (arr2[0]===true){
              setIngredElem(curr => [...curr, <li id={ingred} className={styles.list} onClick={() => handleClick3(ingred)}>{ingred}</li>])
              setIngred(curr => [...curr, ingred])
              document.getElementById("ingredInput").value = ""
            }else{
              window.alert(arr2[1])
            }

          }

        
      }

  }

  const keyClick4 = async (event) => {
    if (event.key === "Enter"){
      var dish = document.getElementById("dishInput").value
      if (typeDish.includes(dish)){
        window.alert("Already selected. Please choose something else.")

      } else if (dish.length < 3){
        window.alert("Please enter more than 2 letters.")
      }else{
            var arr3 = await sendData(dish, "typeOfFood")
            if (arr3[0]===true){
              setDishElem(curr => [...curr, <li id={dish} className={styles.list} onClick={() => handleClick4(dish)}>{dish}</li>])
              setDish(curr => [...curr, dish])
              document.getElementById("dishInput").value = ""
            }else{
              window.alert(arr3[1])
            }

          }

        
      }

  }



  async function submitForm() {

    if (opt1.length>0){
      window.alert("Please select all options from drop down menu in bottom two questions.")
      document.getElementById('rank').scrollIntoView({ behavior: 'smooth'});

    } else{
      var dataToSend1 = {
        mealType: typeMealInc,
        maxMin: num,
        cuisine: typeCuis,
        ingred: typeIngred,
        dish: typeDish,
        req: req,
        opt: optional
      };   
      console.log(dataToSend1)
      const response = await fetch("http://192.168.80.1:8000/answers",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend1)
      });
    }

  }

  useEffect(() => {
    optChange()
  }, [typeMeal, req, num, typeCuis, typeIngred, typeDish, req, optional])


  return (
    <main className={styles.everything}>
      <p className={styles.header}>If you want to include all options of a filter, leave it blank, the default is no preference!</p>
      <p className={styles.requiredPara}>**   =   required</p>

      <div>
        <label className={styles.dropdownlabel} >Choose a type of course/meal (Main Dish, Breakfast, etc):</label>
        <Select 
          id = "select1"
          className={styles.dropdown}
          options={options}
          isSearchable = {true}
          placeholder="Type here..."
          onChange={handleChange}
        />
        <ol className={styles.listBox}>
          {typeMeal}
        </ol>
      </div>

      <div className={styles.mins}>
        <label>Enter max minutes you want to spend. Press ENTER key when done.</label>
        <input id = "numInput" onKeyDown={() => keyClick1(event)}></input>
      </div>

      <div className={styles.cuisine}>
        <label>Enter any cuisines you want (mexican, italian, etc). Press ENTER key after each one. </label>
        <input id = "cuisInput" onKeyDown={() => keyClick2(event)}></input>
        <ol className={styles.listBox}>
          {typeCuisElem}
        </ol>
      </div>

      <div className={styles.ingreds}>
        <label>Enter ingredients you have. The more the better! Press ENTER key after each one. </label>
        <label style={{"font-size":"13px"}}>(enter an ingredient twice to make it a main ingredient) </label>
        <input id = "ingredInput" onKeyDown={() => keyClick3(event)}></input>
        <ol className={styles.listBox}>
          {typeIngredElem}
        </ol>
      </div>

      <div className={styles.cuisine}>
        <label>Enter specific dishes you want (mac n cheese, brownies, etc) Press ENTER key after each one. </label>
        <input id = "dishInput" onKeyDown={() => keyClick4(event)}></input>
        <ol className={styles.listBox}>
          {typeDishElem}
        </ol>
      </div>

      <div id = "rank" className={styles.rankers}>

        <p className={styles.headRank}>* Please choose/order all options in the two below. *</p>

        <div className={styles.rankSects}>
          <div>
            <label>* Select the categories from ones you edited that you want as required filters *</label>
            <div onClick={() => optChange()}>
              <Select 
                className={styles.dropdown}
                options={opt1}
                isSearchable = {true}
                placeholder="Type here..."
                onChange={handleChange2}
              />
            </div>
            <ol className={styles.listBox}>
              {reqElem}
            </ol>
          </div>

          <div onClick={() => optChange()}>
            <label>* Now rank the remaining categories in order of importance to you. *</label>
            <Select 
            className={styles.dropdown}
            options={opt1}
            isSearchable = {true}
            placeholder="Type here..."
            onChange={handleChange3}
            />
            <ol className={styles.listBox}>
              {optionalElem}
            </ol>
          </div>
        </div>

      </div>
      <button className={styles.button} onClick={() => submitForm()}>Submit!</button>
    </main>
  );
}


