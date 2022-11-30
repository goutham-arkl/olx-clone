import React, { useState,useContext } from 'react';


import Logo from '../../olx-logo.png';
import {useHistory,Link} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

export default function Signup() {
  const history=useHistory()
  const [username,SetUsername]=useState('')
  const [email,SetEmail]=useState('')
  const [phone,SetPhone]=useState('')
  const [password,SetPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const handleSubmit=(e)=>{
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
result.user.updateProfile({displayName:username}).then(()=>{
  firebase.firestore().collection('users').add({id:result.user.uid,
  username:username,
  phone:phone
  }).then(()=>{
    history.push('/login')

  })
})
    
   }).catch((err)=>{
    alert(err.message)
  })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>SetUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{SetEmail(e.target.value)}}
            id="fname"
            name="email"
            defaultValue="John"
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="lname"
            name="phone"
            onChange={(e)=>{SetPhone(e.target.value)}}
            defaultValue="Doe"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{SetPassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
            required
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login" className="link">    <a>Login</a></Link>
      
      </div>
    </div>
  );
}
