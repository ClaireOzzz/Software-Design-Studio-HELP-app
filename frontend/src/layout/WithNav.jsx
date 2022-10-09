import React from "react";

import { Outlet } from "react-router-dom";
import NavBar from 'components/NavBar';

const WithNav = () => {
  return (
    <div>
      <Outlet />
      <NavBar />
    </div>
  )
}

export default WithNav