import React from "react";

import { Outlet } from "react-router-dom"

const NotificationPage = () => {
    return (
        <div> 
            {/* NotificationViewAll is for display all notification */}
            {/* NotificationList is the page that display contact */}
            <Outlet />
        </div>
    )
}

export default NotificationPage