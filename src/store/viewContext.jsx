import React ,{createContext, useState } from "react";

export const PostContext = createContext(null)

export default function Post ({children}){

    const [postDetails, setPostDetails] = useState(()=>{
        const storedProducts = localStorage.getItem("productDetails")
        console.log(storedProducts, "storedProducts")
        return storedProducts ? JSON.parse(storedProducts) :[]
    })


    return (
        <PostContext.Provider value={{postDetails, setPostDetails}}>
            {children}
        </PostContext.Provider>
    )

}