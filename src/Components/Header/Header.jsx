import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/authContext';
import { useContext } from 'react';
import fireBaseContext from '../../store/firebaseContext';






function Header() {


  const {firebase} = useContext(fireBaseContext)
 const {user}= useContext(AuthContext)
 const navigate = useNavigate()

 const Logout = (e)=>{
  e.preventDefault()
  firebase.auth().signOut();
  navigate("/login")

 }

 const goToCreate =()=>{
  navigate("/create")
 }






  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={((e)=> !user.displayName?   navigate("/login") : "")}>{user?.displayName ? `Welcome ${user.displayName}` : "Login"}</span>
          <hr />
          {user && 
            <span onClick={Logout}>{} Logout</span>

          }
          
        </div>

        <div className="sellMenu" onClick={goToCreate}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus goToCreate={goToCreate}></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
