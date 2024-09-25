import React, { Fragment, useContext, useEffect } from 'react';
import { useState } from 'react';
import fireBaseContext from '../../store/firebaseContext';
import { AuthContext } from '../../store/authContext';
import swal from 'sweetalert';



import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [blob, setBlob] = useState([])
  const [productName, setProductname] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [price, setPrice] = useState("")
  const {firebase} =  useContext(fireBaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()


  const handleFileChange =(e) =>{

    const files = Array.from(e.target.files).slice(0,3)
    setBlob(files)
    

    const newImageSrc = files.map((file)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file)

      return new Promise((resolve)=> {
        reader.onload =(e)=>resolve(e.target.result)
      })

    })
    Promise.all(newImageSrc).then((images)=>{
      setSelectedFiles(images)
    })

  }
  useEffect(()=>{
    console.log(selectedFiles)
  },[selectedFiles])


  const handleSubmit =(e)=>{
   


   const currDate = new Date().toString();
      firebase.storage().ref(`/image/${blob[0].name}`).put(blob[0])
      .then((snapshot)=>{
       return snapshot.ref.getDownloadURL()
        .then((url)=>{
          console.log(url, "goturl from firebase")
          firebase.firestore().collection("products").add({
            productName,
            categoryName,
            price,
            url:url,
            userId:user.uid,
            createdAt:currDate

          })
        })
      }).then(()=>{
        swal({
          title:"Success",
          icon:"success",
          text:"Product Saved successfully",
          confirmButtonText:"Ok"
        }).then(()=>{
          navigate(0)
        })
   
      })
      .catch((error) =>{
        console.log(error, "error uploading File")
      })


  }

  return (
    <Fragment>
      <Header />

      <card className="w-full h-screen flex align-middle justify-center items-center">
        <div className="centerDiv flex-col align-middle justify-center w-80  border h-fit p-9 ">
          
            <label htmlFor="fname">Name</label>

            <br />
            <input
              className="input  border-black rounded w-full  border h-8" 
              type="text"
              id="fname"
              name="Name"
              value={productName}
              onChange={((e)=> setProductname(e.target.value))}
  
   
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input border border-black rounded-md w-full h-8"
              type="text"
              id="fname"
              name="category"
              value={categoryName}
              onChange={((e)=>setCategoryName(e.target.value))}
              
            />
            <br />
            <label htmlFor="fname" className='w-full border-black '>Price</label>
            <br />
            <input className="input w-full rounded border-black border h-8" type="number" id="fname" name="Price" value={price} onChange={((e)=>setPrice(e.target.value))} />
            <br />
          
          <br />

          <img alt="Posts" width="200px" height="200px" src={selectedFiles && selectedFiles[0]} className='border-black border align-middle'></img>

          
            <br />
            <input type="file" onChange={handleFileChange} className='h-8 my-5'  />
            <br />
            <button onClick={handleSubmit} className="uploadBtn block w-40 border border-black bg-gray-600 text-white h-7">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
