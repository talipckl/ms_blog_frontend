import React, { useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500); 

      return () => clearTimeout(timer); 
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};
const styles = {
  alert: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000, // Yüksek bir z-index değeri diğer öğelerin üzerinde görüntülenmesini sağlar
  },
};
export default Alert;
