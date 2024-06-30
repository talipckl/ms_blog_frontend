import React, { useState } from "react";
import "./login.css";
import back from "../../assets/images/my-account.jpg";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const Regsiter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    try {
      console.log(process.env.API_URL + '/auth/register');
      const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/signup', {
        email: email,
        password: password,
      });
      console.log(response);
      history.push('/login');
    } catch {
      console.log('error!');
    }

  };
  return (

    <section className='login'>
      <div className='container'>
        <div className='backImg'>
          <img src={back} alt='' />
          <div className='text'>
            <h3>Register</h3>
            <h1>My account</h1>
          </div>
        </div>
        <form>
          <span>Email address *</span>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <span>Password *</span>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className='button' type="button" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </section>

  );
};
