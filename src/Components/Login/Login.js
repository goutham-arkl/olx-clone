import React,{useState,useContext} from 'react';
import {FirebaseContext} from '../../store/Context'
import {useHistory,Link} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';


function Login() {
  const [email,EmailState]=useState('')
  const [password,passwordState]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>{
              EmailState(e.target.value)
            }}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{
              passwordState(e.target.value)
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup" className="link">  <a>Signup</a></Link>
      
      </div>
    </div>
  );
}

export default Login;
