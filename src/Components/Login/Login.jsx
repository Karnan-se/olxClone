
import React, { useState, useContext, useEffect } from 'react';
import fireBaseContext from "../../store/firebaseContext"
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';






function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {firebase} = useContext(fireBaseContext)
  const navigate = useNavigate();



  const googleSignIn = (e)=>{
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result)=> {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user, "user_details");
      navigate("/")

    }).catch((error)=>{
      const errorcode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    })

  }
  


  
  


  const handleSubmit =(e)=>{
    e.preventDefault();

    
    console.log(firebase)
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>
      navigate("/")
    ).catch((error)=>{
      alert(error.message)
    })


  }

  

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={((e)=>setEmail(e.target.value))}
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={((e)=>setPassword(e.target.value))}
           
          />
          <br />
          <br />
          <button >Login</button>
          <div className='input'>
            <button id='google-login-button' onClick={googleSignIn}>  SignInWithGoogle</button>
          </div>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
