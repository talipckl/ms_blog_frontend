import React from "react"
import image from "../../assets/images/input.png"
import "./account.css"

export const Account = () => {
  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Email</h1>
          <div className='content'>
            <div className='right'>
              <label htmlFor=''>username</label>
              <input type='text' />
              <label htmlFor=''>Email</label>
              <input type='email' />
              <label htmlFor=''>Password</label>
              <input type='password' />
              <button className='button'>Update</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
