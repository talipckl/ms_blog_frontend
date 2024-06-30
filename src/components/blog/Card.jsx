import React, { useEffect, useRef, useState } from "react";
import "./blog.css";
import { Link } from "react-router-dom";

const truncateText = (text, length) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

export const Card = ({ blogData, containerRef }) => {
  return (
    <>
      <section className='blog'>
        <div className='container grid3' ref={containerRef}>
          {
            blogData.map((item) => (
              <div className='box boxItems' key={item.id}>
                <Link to={`/${item.slug}`} className='link'>
                <h3>{truncateText(item.title,50)}</h3>
                <div className='details'>
                  {/* <p>{item}</p> */}
                  <h5 className='created-at'>{"Oluşturma Tarihi  " + item.created_at}</h5>
                </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
