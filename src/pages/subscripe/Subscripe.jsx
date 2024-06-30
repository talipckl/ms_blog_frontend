import React, { useEffect, useState } from "react"
import image from "../../assets/images/input.png"
import "./subscripe.css"
import { useHistory } from "react-router-dom";

export const Subscripe = () => {
  const token = localStorage.getItem('token')
  if(!token){
    history.push("/login");
  }
  const [email, setEmail] = useState("");
  
  const history = useHistory();

  const handleCreatePost = async () => {
    try {
      console.log(email);
      const response = await fetch(process.env.REACT_APP_API_URL+"/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          mail_address: email,
        }),
      });

      if (response.ok) {
        console.log("Post created successfully!");
      
        history.push("/");
      
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };


  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input type='file' accept='image/*' src={image} alt='img' />
                <img src={image} alt='image' class='image-preview' />
              </div>
            </div>
            <div className='right'>
              <label htmlFor=''>Email</label>
              <input type='email'  value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <button className='button ' onClick={handleCreatePost}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
