import React, { useState, useEffect } from "react";
import "./create.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from 'react-select'

export const Create = () => {
  let token = localStorage.getItem('token')
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useHistory();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/post/category");
        const formattedCategories = response.data.data.map(category => ({
          value: category.id,
          label: category.category
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Kategoriler getirilirken hata oluştu:", error);
      }
    };
    fetchCategories();
  }, []);

  if (!token) {
    history.push("/login");
  }
  const handleCreatePost = async () => {
    console.log("tok"  + token);
    try {
      if(selectedCategory.value == undefined && slug=="" && content==""){
        return  alert("Gerekli Alanlrı Lütfen Doldurun!")
      }
      const response = await fetch(process.env.REACT_APP_API_URL + "/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category_id: selectedCategory.value
        }),
      });
      console.log(response.ok);
      if (response.status===201) { 
        history.push("/"); 
      } else {
        const responseData = await response.json(); 
        if (responseData.errors && responseData.errors.content) {
          const errorMessage = responseData.errors.content;
          alert( errorMessage.message); 
        } else {
          alert( JSON.stringify(responseData.message));
        }
      }
      
    } catch (error) {
      console.error("Error creating post:", error); 
    }
  }

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "black", 
      borderRadius: 6, 
      height: 45 ,
    }),
  };

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className="select-input">
            <Select
              styles={customStyles}
              options={categories} 
             // defaultValue={categories[1]}
              value={selectedCategory} 
              onChange={(option) => setSelectedCategory(option)} 
              placeholder="Selected Category..."
            />
          </div>
          <form>

            {/* {
              categories.length > 0 ? ( 
                <select className="inputfile input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Bir kategori seçin</option>
                {
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))
                }
              </select>
            
              ) : (
                <p>Loading categories...</p>
              )} */}

            {/* <input type='text' placeholder='Slug' value={slug} onChange={(e) => setSlug(e.target.value)} /> */}
            <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content..." name='' id='' cols='30' rows='10' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button className='button' type='button' onClick={handleCreatePost}>
              Create Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
