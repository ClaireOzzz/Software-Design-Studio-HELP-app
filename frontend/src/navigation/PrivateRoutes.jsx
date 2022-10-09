import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOGIN } from './routeConfig';

const PrivateRoutes = () => {
  const location = useLocation(); // get current url path
  const [isLogin, setIsLogin] = useState(localStorage.getItem("help-login-username"));

  useEffect(() => {
    setIsLogin(localStorage.getItem("help-login-username"));
    // console.log(isLogin)
  }, [location])

  return isLogin 
    ? <Outlet />
    : <Navigate to={LOGIN} />
}

export default PrivateRoutes;