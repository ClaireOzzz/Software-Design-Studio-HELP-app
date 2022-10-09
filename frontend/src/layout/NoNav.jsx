import React from "react";

import { Outlet } from "react-router-dom"

const NoNav = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default NoNav