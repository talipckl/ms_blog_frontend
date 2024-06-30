import React, { useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export const DetailsPages = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const storedData = localStorage.getItem(`blog_${id}`);
        if (storedData) {
          setBlog(JSON.parse(storedData));
        } else {
          console.log("cekti");
          const response = await fetch(`${process.env.REACT_APP_API_URL}/post/show/${id}`);
          const data = await response.json();
          setBlog(data.data);
          localStorage.setItem(`blog_${id}`, JSON.stringify(data.data));
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchDetails();
  }, [id]);
  return (
    <>
      {
      blog ? (
        <section className='singlePage'>
          <div className='container'>
            <div className='left'>
              <img src={blog.cover} alt='' />
            </div>
            <div className='right'>
              {/* <div className='buttons'>
                <button className='button'>
                  <BsPencilSquare />
                </button>
                <button className='button'>
                  <AiOutlineDelete />
                </button>
              </div> */}
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
              <p>Author: {blog.user.name || "Anonim"}</p>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
