import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountBoxLine, RiImageAddLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import Alert from "../Alert/Alert"

export const User = () => {
  const user = true;
  let token = localStorage.getItem('token');
  const [profileOpen, setProfileOpen] = useState(false);
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const close = () => {
    setProfileOpen(false);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        }
      });
      if (response.status === 200) {
        localStorage.removeItem('token');
        showAlert('Başarıyla çıkış yaptınız', 'success');
        history.push("/login");
      }else{
        showAlert('Internal Server eror!', 'danger');
      }
    } catch (error) {
      showAlert('Internal Server eror!', 'danger');
      console.error('Hata oluştu', error);
    }
  };

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
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg' alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to='/login'>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>Login</h4>
                  </button>
                </Link>
                <Link to='/account'>
                  <button className='box'>
                    <RiAccountBoxLine className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                <button className='box' onClick={logout}>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
      <Alert  message={alertMessage} type={alertType} onClose={closeAlert} />
    </>
  );
};
