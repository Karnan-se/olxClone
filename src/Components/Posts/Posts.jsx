import React, {useEffect, useContext, useState} from 'react';
import fireBaseContext from '../../store/firebaseContext';
import { AuthContext } from '../../store/authContext';
import { PostContext } from '../../store/viewContext';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const {firebase}=useContext(fireBaseContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const {setPostDetails} = useContext(PostContext)
  

  let allPosts =[]
  useEffect(()=>{
    console.log("allPost is woerrking")
    firebase.firestore().collection("products").get()
    .then((snapshot)=>{
      allPosts = snapshot.docs.map((product)=>{
        return {

        ...product.data(), id:product.id,
        }
       
      })
    
        setProducts(allPosts, "allPost")

      
    }).catch((error)=>{
      console.log("error fetching", error)
    })
    
    console.log(products, "products")
  },[])






  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {products.length > 0 && (
  <div className="cards">
    {products.map(product1 => (
      <div className="card" key={product1.id}>
        <div className="favorite">
          <Heart />
        </div>
        <div className="image">
          <img src={product1.url} alt={product1.productName} className='object-cover' />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product1.price}</p>
          <span className="kilometer">{product1.category}</span>
          <p className="name">{product1.productName}</p>
        </div>
        <div className="date">
          <span></span>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>


        
        <div className="cards">

        {products.length > 0 && (
  <div className="cards">
    {products.reverse().map((product, index) => (
      <div className="card" key={product.id || index} onClick={(()=>{ setPostDetails(product); navigate("/view") })}> 
        <div className="image">
          <img src={product.url} alt={product.productName} /> 
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p> 
          <span className="kilometer">{product.category}</span> 
          <p className="name">{product.productName}</p> 
        </div>
        <div className="date">
          <span>{new Date(product.createdAt).toLocaleDateString()}</span> 
        </div>
      </div>
    ))}
  </div>
)}

        </div>
      </div>
    </div>
    
  );
}

export default Posts;
