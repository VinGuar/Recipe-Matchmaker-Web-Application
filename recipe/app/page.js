'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from '../app/page.module.css'
import '../app/globals.css';
import Select from 'react-select';
import { useState } from 'react';



export default function Home() {

  async function logMovies() {
    const dataToSend = {
      userInput: "m",
      type: "cuisine"

    };    
    const response = await fetch("http://192.168.80.1:8000/input",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend)
    });
    const validater = await fetch("http://192.168.80.1:8000");
    const text = await validater.json();
    console.log(text);

  }

  useEffect(() => {
    logMovies();

  }, []);

 

  const handleClick = (label, value) => {
    setTest((curr) => curr.filter((item) => item.props.id != value));
    setTypeInc((curr) => curr.filter((item) => item != value));

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


  const handleChange = (selectedOption) => {
    var label = selectedOption['label']
    var value = selectedOption['value']
    

    if (typeMealInc.includes(value)){

      window.alert("Already selected. Please select a different one.")
    } else {
      setTest(curr => [...curr, <li id={value} className={styles.list} onClick={() => handleClick(label, value)}>{label}</li>]);
      setTypeInc(prevState  => [...prevState, value]);
    }

  }

  

  return (
    <main className={styles.everything}>
      <div>
        <label className={styles.dropdownlabel} >Choose a type of course/meal (Main Dish, Breakfast, etc):</label>
        <Select 
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
    </main>
  );
}


