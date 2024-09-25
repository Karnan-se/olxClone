
import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from "react-router-dom";
import  fireBaseContext  from '../../store/firebaseContext';
import swal from 'sweetalert';




export default function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] =  useState("");
  const [phone, setPhone] = useState();
  const [password,  setPassword] = useState("")
  const [error, setError] = useState({})

  const validateForm =()=>{
    let errors = {};
    let isValid = true;
  
    if (!username) {
      errors.username = "Username is required";
      isValid = false;
   
    }
  
    
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    
    }
  
 
    if (!phone) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
      isValid = false;
     
      
    }
  

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
      
      
    }
    
    setError(errors)
    return isValid

  
  }

  useEffect(()=>{
  console.log(error)
    

  },[error])



  const {firebase} = useContext(fireBaseContext)
  console.log(firebase, "fireBase")

  const  handleSubmit =(e)=>{
    e.preventDefault()
    



    if(!validateForm()){
      return 

    }

    const db = firebase.firestore()
   
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
      console.log(result)

      result.user.updateProfile({displayName:username}).then(()=> {
       db.collection("users").add({
        id:result.user.uid,
        username:username,
        phone:phone
       }).then(()=>{
        navigate("/login")

       }).catch((error)=> {
        swal({
          icon: "warning",
          title: "Routing Failed",
          text: "Some Error"
        })
       })
       
      }).catch((error)=>{
        swal({
          icon: "warning",
          title: "Update Failed",
          text: "FireBase Updation Failed"
        })
        
      })
      
      
    }).catch((error)=>{
      swal({
        icon: "error",
        title: "Authentication Failed",
        text: " Email Already Exist"
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv w-30">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className={`input border-2 ${error.username? "border-red-500" : "border-grey-300"}`}
            type="text"
            id="fnamee"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className={`input border-2 box-border ${error.email? "border-red-500" : "border-grey-300"}`}
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className={`input border-2 ${error.phone? "border-red-500" : "border-grey-300"}`}
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname1"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className={`input border-2 ${error.password? "border-red-500" : "border-grey-300"}`}
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
