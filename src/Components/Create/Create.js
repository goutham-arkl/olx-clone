import React, { Fragment, useContext, useState,useEffect } from 'react';
import './Create.css';
import {useHistory} from 'react-router-dom'
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
const Create = () => {
  const {firebase}= useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,SetName]=useState('');
  const [category,SetCategory]=useState('');
  const [price,SetPrice]=useState('');
  const [image,setImage]=useState('');
  const [nameErr,setnameErr]=useState('')
  const [priceErr,setpriceErr]=useState('')
  const [categoryErr,setcategoryErr]=useState('')
  const [imageErr,setimageErr]=useState('')
  const date=new Date()
  const history=useHistory()

  function imagevalidation(){
    if(!image){
      setimageErr("Image is required");
      return false;
    }
    setimageErr(null)
    return true;
  }

  function validateName(){
    if (!name) {
      setnameErr("name is required");
      return false;
    }
    else if (name.trim().length < 4) {
      setnameErr("name have minimum 4 character");
      return false;
    } 
    setnameErr(null);  
      return true;
    }

  function validatecategory(){
    if (!category) {
      setcategoryErr("Category is required");
      return false;
    }else if (category.trim().length < 4) {
      setcategoryErr("Category have minimum 4 character");
      return false;
    } 
    setcategoryErr(null);  
    return true;
  }
  
  function pricecheck(){
    if(!price){
      setpriceErr("Price is required")
      return false;
    }
    setpriceErr(null);
    return true;
  }
  useEffect(() => {
    validateName()
    validatecategory()
    pricecheck()
    imagevalidation()
  }, [name,category,price,image])
  
  //////////////////////////////////////////////////////
  const handleSubmit=()=>{
    if(!validateName()||!validatecategory()||!pricecheck()||!imagevalidation()) return ;

firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
  ref.getDownloadURL().then((url)=>{
    firebase.firestore().collection('products').add({
      name,category,price,url,userId:user.uid,createdAt:date.toDateString()
    })
    history.push('/')
  })
})
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>{SetName(e.target.value) }}
              name="Name"
              defaultValue="John"
              required
            />
             {nameErr && <div style={{color:"Red"}}> {nameErr}</div>} 
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{SetCategory(e.target.value)}}
              id="fname"
              name="category"
              defaultValue="John"
              required
            />
            {categoryErr && <div style={{color:"Red"}}> {categoryErr}</div>}  
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e)=>{SetPrice(e.target.value)}} id="fname" name="Price" required />
            {priceErr && <div style={{color:"Red"}}> {priceErr}</div>}   
            <br />
          
          <br />
          <img  alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>
       
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file"
            required />
             {imageErr && <div style={{color:"Red"}}> {imageErr}</div>}   
            <br />
            <button onClick={handleSubmit}  className="uploadBtn">upload and Submit</button>
       
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
