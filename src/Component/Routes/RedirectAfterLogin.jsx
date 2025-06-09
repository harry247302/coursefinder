// src/Component/Routes/RedirectAfterLogin.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectAfterLogin = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("I was hit but ",userInfo)

  if (userInfo?.role === 'partner') {
    return <Navigate to="/partner/dashboard" replace />;
  }

  if (userInfo?.role === 'franchise') {
    console.log("it should trigger here ")
    return <Navigate to="/frenchise/dashboard" replace />;
  }
  if (userInfo?.role === 'counsellor') {
    return <Navigate to="/counsellor/dashboard" replace />;
  }


  return <Navigate to="/" replace />;
};

export default RedirectAfterLogin;
