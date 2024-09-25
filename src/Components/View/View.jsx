import React,  {useEffect,useContext, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/viewContext';
import fireBaseContext from '../../store/firebaseContext';
import { json } from 'react-router-dom';

function View() {


  const [userDetails, setUserDetails] = useState()
  const {postDetails, setPostDetails} = useContext(PostContext)
  const {firebase} = useContext(fireBaseContext)



  useEffect(()=>{
    console.log(postDetails, "PostDetails")
    firebase.firestore().collection("users").where("id", "==", postDetails.userId)
    .get().then((res)=>{
      res.forEach(doc=>{
        setUserDetails(doc.data())
        
      })
    })
    
   

  },[])

  useEffect(()=>{
    console.log(postDetails.length, "postDetails.length")
    if(postDetails.length >0){
      localStorage.setItem('productDetails', JSON.stringify(postDetails));
    }

  },[postDetails])

  useEffect(()=>{
    if(postDetails.length == 0){
      const storedProducts = localStorage.getItem("productDetails");
      if(storedProducts){
        setPostDetails(JSON.parse(storedProducts))
      }
    }
  },[postDetails])



  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        < img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.productName}</span>
          <p>{postDetails.categoryName}</p>
          {/* <span>{postDetails.new Date(createdAt).toLocaleDateString()}</span> */}
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
