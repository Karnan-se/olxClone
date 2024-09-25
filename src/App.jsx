
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login"
import React, {useEffect, useContext, Children} from "react";
import { AuthContext } from "./store/authContext";
import  fireBaseContext from "./store/firebaseContext";
import Create from "./Pages/Create"
import View from "./Components/View/View";




/**
 */
import Home from './Pages/Home'; 

function App() {

  const {user, setUser} = useContext(AuthContext)
  const {firebase} = useContext(fireBaseContext)
  useEffect(()=>{
   firebase.auth().onAuthStateChanged((user)=>{
    

    setUser(user)
   })

  })


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/view" element={<View/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
