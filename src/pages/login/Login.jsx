import React, { useState } from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Alert from "../../components/Alert/Alert";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const handleLogin = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return response.json();
    }).then(response => {
      if(response.token != undefined){
        localStorage.setItem('token', response.token);
        showAlert('Başarıyla Girişr yaptınız', 'success');
        setLoggedIn(true);
      }else{
        showAlert('Internal Server eror!', 'danger');
      }
    })
      .catch((error) => {
        alert('Login failed error')
        console.error('Login failed', error);
      });

  };
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const closeAlert = () => {
    setAlertMessage('');
    setAlertType('');
  };

  return (
    <>
      <section className='login'>
        <div className='container'>
       
          <div className='backImg'>
            <img  src={back} alt='' />
            <div className='text'>
              <h1>Signin</h1>
            </div>
          </div>
          <form >
            <span>Email address *</span>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span>Password *</span>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className='button' onClick={handleLogin} >Log in</button>
          </form>
        </div>
      </section>
      <Alert  message={alertMessage} type={alertType} onClose={closeAlert} />
    </>
  )
}
