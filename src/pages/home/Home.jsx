import React, { useEffect, useRef, useState } from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"

export const Home = () => {

  let token = localStorage.getItem('token');
  const [blogData, setBlogData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  
  const fetchData = async (pageNumber) => {
    try {
      console.log();
      setLoading(true); 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post?page=${pageNumber}`);
      const data = await response.json();
      setBlogData((prevData) => [...prevData, ...data.data]); 
      setLoading(false); 
    } catch (error) {
      console.error('Blog verileri getirilirken hata oluştu', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(page); 
  }, [page]); 

  const handleScroll = () => {
    if (
      containerRef.current &&
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
      !loading
    ) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <>
      <Category />
      <Card blogData={blogData} containerRef={containerRef} />
      {loading && <div className='loading'>Yükleniyor...</div>}
    </>
  )
}
