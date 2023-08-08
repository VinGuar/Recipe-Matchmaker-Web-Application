'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from '../app/page.module.css'
import '../app/globals.css';
import Select from 'react-select';
import { useState } from 'react';
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'



export default function Home() {



  async function sendData(inp, typeIn){
    var dataToSend = {
      userInput: inp,
      type: typeIn
    };    
    const response = await fetch("https://backend-recipe-finder.vercel.app/input",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend)
    });
    
    const ans = await fetch("https://backend-recipe-finder.vercel.app/");
    const answer = await ans.json();
    var arr = [answer.valid, answer.msg]
    return arr
  
  }

  // use state to set which filters should be included in the options for the user
  const [opt1, setOpt] = useState([]);

    const optChange = () => {
      setOpt(curr => [])

      //these if statements makeit so if theres ever any input, it adds  that filter to Opt1
      if (typeMeal.length > 0){
        if (!(req.includes('mealType'))){

          setOpt(curr => [...curr, { label: 'Meal Type (Main Dish, Dessert, etc)', value: 'mealType' }])

        }

      }
      if (num != 999999999){
        if (!(req.includes('maxMin'))){
          setOpt(curr => [...curr, { label: 'Max Number of Minutes', value: 'maxMin' }])

        }

      }
      if (typeCuis.length > 0){
        if (!(req.includes('cuisine'))){
          setOpt(curr => [...curr, { label: 'Cuisine Type (mexican, italian, etc)', value: 'cuisine' }])

        }

      }
      if (typeIngred.length > 0){
        if (!(req.includes('ingred'))){
          setOpt(curr => [...curr, { label: 'Having all the ingredients needed', value: 'ingred' }])

        }

      }
      if (typeDish.length > 0){
        if (!(req.includes('dish'))){
          setOpt(curr => [...curr, { label: 'Dish Type (mac n cheese, brownies, etc)', value: 'dish' }])

        }

      }

    }


  // these next functions, handleclicksm handle the click or change of the input fields by editing the usestate variables for that filter.
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

  }

  const handleClick4 = (value) => {
    setDishElem((curr) => curr.filter((item) => item.props.id != value));
    setDish((curr) => curr.filter((item) => item != value));

  }

  const handleClick5 = (value) => {
    setReqElem((curr) => curr.filter((item) => item.props.id != value));
    setReq((curr) => curr.filter((item) => item != value));

  }


  // options for the filter of meal or course type
  const options = [
    { label: 'Main Dishes', value: 'main-dish' },
    { label: 'Side Dishes', value: 'side-dishes' },
    { label: 'Appetizers', value: 'appetizers' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Breakfast Foods', value: 'breakfast' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Lunch Foods', value: 'lunch' },

  ];


  //these are the useState variables used the store the user data for sending off at the end of the code.

  const [typeMeal, setTest] = useState([]);
  const [typeMealInc, setTypeInc] = useState([]);

  const [num, setNum] = useState(999999999);


  const [typeCuis, setCuis] = useState([]);
  const [typeCuisElem, setCuisElem] = useState([]);

  const [typeIngred, setIngred] = useState([]);
  const [typeIngredElem, setIngredElem] = useState([]);


  const [typeDish, setDish] = useState([]);
  const [typeDishElem, setDishElem] = useState([]);

  const [req, setReq] = useState([]);
  const [reqElem, setReqElem] = useState([]);


  //handle change functions are used when the dropdown menus are clicked or changed, and then adds the element to the page and adds it to list
  
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

  //these are used when the user clicks enter on a category. It then takes this data, does simple validation, and then sets the variables and page element to the value.

  const keyClick1 = (event) => {
    if (event.key === "Enter"){
      var numTemp = document.getElementById("numInput").value
      if (isNaN(numTemp)){

        window.alert("Please enter just a positive numerical number")
        document.getElementById("numInput").value = ""
        setNum(current => 999999999)


      } else{

        if (numTemp === ""){
          document.getElementById("numInput").blur()
          setNum(current => 999999999)
        } else {
          setNum(current => numTemp)
          document.getElementById("numInput").blur()
        }
      }

    }
  }

  const keyClick2 = async (event) => {
    if (event.key === "Enter"){
      var cuisTemp = document.getElementById("cuisInput").value
      cuisTemp = cuisTemp.toLowerCase();
      if (typeCuis.includes(cuisTemp)){
        window.alert("Already selected. Please choose something else.")

      } else if (cuisTemp.length < 4){
        window.alert("Please enter more than 3 letters.")
      }else{
          var arr1 = await sendData(cuisTemp, "cuisine")

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
      ingred = ingred.toLowerCase();

      if (typeIngred.includes(ingred)){
        window.alert("Already selected. Please enter a different ingredient.")
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
      dish = dish.toLowerCase();

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

  //function that turns an array that is formatted incorrectly into a correctly formatted array. Since the data set is so large, there are many things that need to be done to format correctly.
  function parseArray(arr, bool){

   try{
      var newArr = arr.replace(/', '/g, 'tempHolder, tempHolder')
   } catch{
    return arr
   }
    newArr = newArr.replace(/", "/g, 'tempHolder, tempHolder')
    newArr = newArr.replace(/', "/g, 'tempHolder, tempHolder')
    newArr = newArr.replace(/", '/g, 'tempHolder, tempHolder')




    if (bool){
      newArr = newArr.substring(2)
      newArr = newArr.substring(0, newArr.length-2)
      newArr = '[tempHolder' + newArr + 'tempHolder]'
    }

    var newArr = newArr.replace(/'/g, '')
    var newArr = newArr.replace(/"/g, '')
    var newArr = newArr.replace(/\\/g, '')

    var newArr = newArr.replace(/tempHolder/g, '"')

    newArr = JSON.parse(newArr)
    return newArr
  }

  //useStates for progress, num of recipes, pages, and message.
  const [prog, setProg] = useState(false)
  const [recNum, setRecNum] = useState(0)
  const [pageList, setPageList] = useState(false)
  const [msg, setMsg] = useState(false)


  //function when user submits form. quick validation, then sends data off to the docker container for creation of recipes, and then recieves said data, parses, and makes it into recipe elements.
  async function submitForm() {
    setMsg(curr => true)

    var recipeFin = []

    if (opt1.length>0){
      window.alert("Please select all options from the drop down menu in the required filter.")
      document.getElementById('rank').scrollIntoView({ behavior: 'smooth', block:'center'});
      setMsg(curr => false)
      return

    } 
    setProg(curr => true)

      var dataToSend1 = {
        mealType: typeMealInc,
        maxMin: num,
        cuisine: typeCuis,
        ingred: typeIngred,
        dish: typeDish,
        req: req,
      };   
      const response = await fetch("https://backend-recipe-finder.vercel.app/answers",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend1)
      });

      const recip = await fetch('https://backend-recipe-finder.vercel.app/recipes')
      var parsed = await recip.json()
      var recArr = await parsed.recipes

      var countMain = 0
      while (countMain < recArr.length){

        var current = recArr[countMain]

        var ingred = current.ingredients
        var nutr = current.nutrition
        var steps = current.steps
        var names = current.name

        ingred = parseArray(ingred, true)
        nutr = parseArray(nutr, false)
        steps = parseArray(steps, true)

        var desc = current.description
        var mins = current.minutes

        var ingredEls = []
        var count = 0
        while (count<ingred.length){
          ingredEls.push(<li>{ingred[count]}</li>)
          count+=1
        }

        var stepEls = []
        var count = 0
        while (count<steps.length){
          stepEls.push(<li>{steps[count]}</li>)
          count+=1
        }

        nutr[0] = Math.round(nutr[0])
        nutr[1] = Math.round(nutr[1]/1.28205128205)
        nutr[2] = Math.round(nutr[2]/2)
        nutr[3] = Math.round(nutr[3]*23)
        nutr[4] = Math.round(nutr[4]/2)
        nutr[5] = Math.round(nutr[5]/5)
        nutr[6] = Math.round(nutr[6]*2.75)

        var nutrEle = []
        nutrEle.push(<p>Calories: {nutr[0]}</p>)
        nutrEle.push(<p>Total Fat: {nutr[1]}g</p>)
        nutrEle.push(<p>Sugar: {nutr[2]}g</p>)
        nutrEle.push(<p>Sodium: {nutr[3]}mg</p>)
        nutrEle.push(<p>Protein: {nutr[4]}g</p>)
        nutrEle.push(<p>Saturated Fat: {nutr[5]}g</p>)
        nutrEle.push(<p>Carbohydrates: {nutr[6]}g</p>)

        recipeFin.push(
          <div className={styles.recDiv}>
            <div style={{"display":"flex", "flex-direction":"row", "justify-content": "space-between"}}>
              <h3>{names}</h3>
              <h5 >{countMain+1}/{recArr.length}</h5>
            </div>
            <div>
              <p>{mins} minutes</p> 
              <p>Description: {desc}</p>
            </div>
            <div>
              <div className={styles.ingredSec}> 
                <div>
                  <p className={styles.titleRec}>Ingredients:</p> 
                  <ol>{ingredEls}</ol>
                </div>
                <div>
                  <p>{nutrEle}</p>          
                </div>
              </div>
              <p style={{"font-weight":"bold"}}>Steps:</p>
              <ol>{stepEls}</ol>
            </div>

          </div>)

        countMain = countMain+1
        }
    
    await makePages(recipeFin)
    setRecNum(recArr.length)
    setNumCurr(curr => 1)
    setPageList(true)
    handlePageClick(1)
    document.getElementById('rec').scrollIntoView({ behavior: 'smooth', block:'start'});
    setProg(curr => false)
    setMsg(curr => false)
    
    


  }

  // use states for the pages
  const [page1, setPage1] = useState([]);
  const [page2, setPage2] = useState([]);
  const [page3, setPage3] = useState([]);
  const [page4, setPage4] = useState([]);
  const [page5, setPage5] = useState([]);
  const [page6, setPage6] = useState([]);
  const [page7, setPage7] = useState([]);
  const [page8, setPage8] = useState([]);
  const [page9, setPage9] = useState([]);
  const [page10, setPage10] = useState([]);

  //makes each page into ten recipes per page.
  function pageNum(currRecipe, numb, bigArr, bool){


    if (bool){
      if (numb <= 11){

        bigArr[0].push(currRecipe)
        return bigArr

      } else if (numb<=21){

        bigArr[1].push(currRecipe)
        return bigArr

      } else if (numb<=31){

        bigArr[2].push(currRecipe)
        return bigArr
        
      } else if (numb<=41){

        bigArr[3].push(currRecipe)
        return bigArr
        
      } else if (numb<=51){

        bigArr[4].push(currRecipe)
        return bigArr

      } else if (numb<=61){

        bigArr[5].push(currRecipe)
        return bigArr

      } else if (numb<=71){

        bigArr[6].push(currRecipe)
        return bigArr
   
      } else if (numb<=81){

        bigArr[7].push(currRecipe)
        return bigArr
        
      } else if (numb<=91){
          
        bigArr[8].push(currRecipe)
        return bigArr
   
      } else if (numb<=101){
          
        bigArr[9].push(currRecipe)
        return bigArr

      }

    } else if (!bool){
        setPage1(curr => bigArr[0])
        setPage2(curr => bigArr[1])
        setPage3(curr => bigArr[2])
        setPage4(curr => bigArr[3])
        setPage5(curr => bigArr[4])
        setPage6(curr => bigArr[5])
        setPage7(curr => bigArr[6])
        setPage8(curr => bigArr[7])
        setPage9(curr => bigArr[8])
        setPage10(curr => bigArr[9])

    }

    

  }

  //where main page making is done. loops through recipes and sets ten per page.
  function makePages(recipeFin){
    var currArr1 = []
    var currArr2 = []
    var currArr3 = []
    var currArr4 = []
    var currArr5 = []
    var currArr6 = []
    var currArr7 = []
    var currArr8 = []
    var currArr9 = []
    var currArr10 = []
    var arrOfArr = [currArr1, currArr2, currArr3, currArr4,currArr5,currArr6,currArr7,currArr8,currArr9,currArr10]

    var numCount = 1
    while (numCount <= recipeFin.length){

      var ten = numCount + 10

      while (numCount<ten){
        
        try{
          arrOfArr = pageNum(recipeFin[numCount-2], numCount, arrOfArr, true)
         
        }catch{
          numCount = numCount + 1
          break
        }

        numCount = numCount + 1
      }

      pageNum([], numCount, arrOfArr, false)
      
    }
    

  }


  //use effect to update opt1 each time something changes.
  useEffect(() => {
    optChange()
  }, [typeMeal, req, num, typeCuis, typeIngred, typeDish, req])

  const slivClick = (numClick) => {
    if (numClick===0){
      setSliver0(curr => !curr)
    } else if (numClick===1){
      setSliver1(curr => !curr)
    } else if (numClick===2){
      setSliver2(curr => !curr)
    } else if (numClick===3){
      setSliver3(curr => !curr)
    } else if (numClick===4){
      setSliver4(curr => !curr)
    } else if (numClick===5){
      setSliver5(curr => !curr)
    }
  }

  const [sliver0, setSliver0] = useState(true)
  const [sliver1, setSliver1] = useState(true)
  const [sliver2, setSliver2] = useState(true)
  const [sliver3, setSliver3] = useState(true)
  const [sliver4, setSliver4] = useState(true)
  const [sliver5, setSliver5] = useState(true)

  const [pageBool1, setPageBool1] = useState(true)
  const [pageBool2, setPageBool2] = useState(false)
  const [pageBool3, setPageBool3] = useState(false)
  const [pageBool4, setPageBool4] = useState(false)
  const [pageBool5, setPageBool5] = useState(false)
  const [pageBool6, setPageBool6] = useState(false)
  const [pageBool7, setPageBool7] = useState(false)
  const [pageBool8, setPageBool8] = useState(false)
  const [pageBool9, setPageBool9] = useState(false)
  const [pageBool10, setPageBool10] = useState(false)

  const [currNum, setNumCurr] = useState(1)


  const allFalse = () => {
    setPageBool1(curr => false)
    setPageBool2(curr => false)
    setPageBool3(curr => false)
    setPageBool4(curr => false)
    setPageBool5(curr => false)
    setPageBool6(curr => false)
    setPageBool7(curr => false)
    setPageBool8(curr => false)
    setPageBool9(curr => false)
    setPageBool10(curr => false)


  }

  const handlePageClick = (number) => {
    if (number<1){
      number = Math.ceil(recNum/10)
    } else if (number>Math.ceil(recNum/10)){
      number = 1
    }
    if (number==1){
      allFalse()
      setPageBool1(curr => true)
    } else if (number==2){
      allFalse()
      setPageBool2(curr => true)    
    }else if (number==3){
      allFalse()
      setPageBool3(curr => true)    
    }else if (number==4){
      allFalse()
      setPageBool4(curr => true)    
    }else if (number==5){
      allFalse()
      setPageBool5(curr => true)    
    }else if (number==6){
      allFalse()
      setPageBool6(curr => true)    
    }else if (number==7){
      allFalse()
      setPageBool7(curr => true)    
    }else if (number==8){
      allFalse()
      setPageBool8(curr => true)    
    }else if (number==9){
      allFalse()
      setPageBool9(curr => true)    
    }else if (number==10){
      allFalse()
      setPageBool10(curr => true)    
    }
    setNumCurr(curr => number)
    document.getElementById('rec').scrollIntoView({ behavior: 'smooth', block:'start'});
  }

  return (
    <main className={prog ? styles.everythingLoad : styles.everything}>
      <Navbar />
      <div className={styles.threeRow}>
        <div className={styles.leftMain}>
          <div className={styles.stick}>
            <p className={styles.deschead}>How it works (user aspects):</p>
            <div className={styles.line} style={{"border-color":"black", "margin":"15px"}}></div>
            <p className={styles.descText} style={{"padding-bottom":"30px"}}>Using your input, it precisely identifies recipes that perfectly match your needs among over 200,000 options. By filtering out recipes that fall short of your criteria, it presents the most relevant matches at the bottom!</p>
            <a className={styles.projorder2} href ="https://github.com/VinGuar/Recipe-Matchmaker-Web-Application" target = "_blank">
              <button className={styles.buttonGit}>View on Github!</button>
            </a>

          </div>
        </div>
        <div className={styles.mainsecs}>
          <h1 className={styles.maintitle}>Recipe Finder</h1>
          <p className={styles.header}>If you want to include all options of a filter, leave it blank, the default is no preference!</p>
          

          <div className={styles.mains}>
            <div onClick={() => slivClick(3)} className={styles.sliver}>Ingredients You Already Have (optional)</div>
            <div  className={sliver3 ? styles.hide : styles.ingreds}>
              <label className={styles.textfilt}>Enter ingredients you have to find recipes that have only your ingredients. The more you enter, the more possible recipes you can get! Press ENTER key after each one. </label>
              <label style={{"font-size":"12px"}} className={styles.textfilt}>(pre-includes these basic ingredients: water, flour, butter, sugar, oils, and the basic spices)</label>
              <label style={{"font-size":"13px"}} className={styles.textfilt}>(great tool if you want to use only ingredients you already have, however only use if you do not want to go to store.) </label>
              <input id = "ingredInput" onKeyDown={() => keyClick3(event)}></input>
              <ol className={styles.listBox}>
                {typeIngredElem}
              </ol>
            </div>
          </div>

          <div className={styles.mains}>
            <div onClick={() => slivClick(0)} className={styles.sliver}>Type Of Course/Meal (Main Dish, Breakfast, etc) (optional)</div>
            <div className={sliver0 ? styles.hide : styles.hold}>
              <label  className={styles.dropdownlabel} >Choose a type of course/meal (Main Dish, Breakfast, etc):</label>
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
          </div>

          <div className={styles.mains}>
            <div onClick={() => slivClick(2)} className={styles.sliver}>Cuisine Type (Mexican, Thai, etc) (optional)</div>
            <div  className={sliver2 ? styles.hide : styles.cuisine}>
              <label className={styles.textfilt}>Enter any cuisines you want (mexican, italian, etc). Press ENTER key after each one. </label>
              <input id = "cuisInput" onKeyDown={() => keyClick2(event)}></input>
              <ol className={styles.listBox}>
                {typeCuisElem}
              </ol>
            </div>
          </div>

          <div className={styles.mains}>
            <div onClick={() => slivClick(4)} className={styles.sliver}>Dish Type (pasta, brownies, etc) (optional)</div>
            <div className={sliver4 ? styles.hide : styles.cuisine}>
              <label className={styles.textfilt}>Enter specific dishes you want (mac n cheese, brownies, etc) Press ENTER key after each one. </label>
              <input id = "dishInput" onKeyDown={() => keyClick4(event)}></input>
              <ol className={styles.listBox}>
                {typeDishElem}
              </ol>
            </div>
          </div>

          <div className={styles.mains}>
            <div onClick={() => slivClick(1)} className={styles.sliver}>Max Minutes to Spend (optional)</div>
            <div  className={sliver1 ? styles.hide : styles.mins}>
              <label className={styles.textfilt}>Enter max minutes you want to spend. Press ENTER key when done.</label>
              <input id = "numInput" onKeyDown={() => keyClick1(event)}></input>
            </div>
          </div>

          <div id = "rank" className={styles.mains} style={{"padding-bottom":"70px"}}>

            <div onClick={() => slivClick(5)} className={styles.sliver}>Rank Your Chosen Filters! (REQUIRED)</div>
            

            <div className={sliver5 ? styles.hide : styles.rankSects}>
              <p className={styles.headRank}>Please choose/order ALL options in the question below.</p>
              <div className={styles.line}></div>
              <div className={styles.rankind}>
                <label>1. Select categories from the menu below to rank them in order of importance to you *</label>
                <div className={styles.wholedropper} onClick={() => optChange()}>
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


            </div>

          </div>


          <button className={prog ? styles.buttonLoad : styles.button} onClick={() => submitForm()}>Submit!</button>
          <p className={msg ? styles.msgShow : styles.hide}>Loading... </p>
          <p className={msg ? styles.msgShow : styles.hide} style={{"margin-bottom":"50px"}}>Please be patient, it can take a few seconds!</p>

        </div>
        <div className={styles.leftMain}>
          <div className={styles.stick}>
            <p className={styles.deschead}>How it works (technical aspects):</p>
            <div className={styles.line} style={{"border-color":"black", "margin":"15px"}}></div>
            <p className={styles.descText} style={{"padding-bottom":"30px"}}>It employs a FastAPI application hosted on Vercel that interacts with the website. User input is validated within the FastAPI app and used to search
            a large dataset for matching recipes, returning the results to the user.</p>
            <a className={styles.projorder2} href ="https://github.com/VinGuar/Recipe-Matchmaker-Web-Application" target = "_blank">
              <button className={styles.buttonGit}>View on Github!</button>
            </a>
          </div>

        </div>

        <div className={styles.recipeMain}>
          <h1 id = "rec">Recipe Results</h1>
          <p># of recipes shown varies</p>
          <p style={{"padding-top":"50px", "align-self":"center", "font-weight":"bold"}}className={pageList ? styles.hide : styles.show}>Recipes Go Here on User Submission!</p>
          <div className={pageList ? styles.showAll : styles.hide} >
            <div className={styles.showTop}>
              <p onClick={() => handlePageClick(currNum-1)} className={styles.arrows}>&#x21A2;</p>
              <p >Page {currNum}/{Math.ceil(recNum/10)}</p>
              <p onClick={() => handlePageClick(currNum + 1)} className={styles.arrows}>&#x21A3;</p>
            </div>
          </div>
          <div className={pageBool1 ? styles.show : styles.hide}>
            {page1}
          </div>
          <div className={pageBool2 ? styles.show : styles.hide}>
            {page2}
          </div>
          <div className={pageBool3 ? styles.show : styles.hide}>
            {page3}
          </div>
          <div className={pageBool4 ? styles.show : styles.hide}>
            {page4}
          </div>
          <div className={pageBool5 ? styles.show : styles.hide}>
            {page5}
          </div>
          <div className={pageBool6 ? styles.show : styles.hide}>
            {page6}
          </div>
          <div className={pageBool7 ? styles.show : styles.hide}>
            {page7}
          </div>
          <div className={pageBool8 ? styles.show : styles.hide}>
            {page8}
          </div>
          <div className={pageBool9 ? styles.show : styles.hide}>
            {page9}
          </div>
          <div className={pageBool10 ? styles.show : styles.hide}>
            {page10}
          </div>
          <div className={pageList ? styles.showAll : styles.hide} >
            <div className={styles.showTop}>
              <p onClick={() => handlePageClick(currNum-1)} className={styles.arrows}>&#x21A2;</p>
              <p >Page {currNum}/{Math.ceil(recNum/10)}</p>
              <p onClick={() => handlePageClick(currNum + 1)} className={styles.arrows}>&#x21A3;</p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}


