import React from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { ROOT, FEED, PROFILE, ACCEPT_REQUEST, NOTIFICATION_LIST, VIEWALL } from "./routeConfig";

//pages
import Feed from "pages/Feed/Feed";
import RequestDetails from "pages/RequestDetails/RequestDetails";
import AcceptRequest from "pages/RequestDetails/AcceptRequest";
import Profile from "pages/Profile/Profile";
import NotificationList from "pages/Notifications/NotificationList";
import NotificationViewAll from "pages/Notifications/NotificationViewAll";



export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Navigate replace to={FEED} />} />
        <Route exact path={FEED} element={<Feed />} />
        <Route exact path={`${FEED}/:requestid`} element={<RequestDetails />} />
        <Route exact path={`${FEED}/:requestid${ACCEPT_REQUEST}`} element={<AcceptRequest />} />
        <Route exact path={PROFILE} element={<Profile />} />
        <Route exact path={NOTIFICATION_LIST} element={<NotificationList />} />
        <Route exact path={VIEWALL} element={<NotificationViewAll />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};
