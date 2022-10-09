import React from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { ROOT, FEED, USER, PROFILE, ACCEPT_REQUEST, NOTIFICATION, VIEWMORE } from "./routeConfig";
import { USER_ID } from "utils/constants"

//pages
import FeedIndex from "pages/Feed/components/FeedIndex";
import Feed from "pages/Feed/Feed"
import RequestDetails from "pages/RequestDetails/RequestDetails";
import AcceptRequest from "pages/RequestDetails/AcceptRequest";
import NewRequest from "pages/NewRequest/NewRequest";
import NewRequestForm from "pages/NewRequest/components/NewRequestForm";
import NewRequestIndex from "pages/NewRequest/components/NewRequestIndex";
import Profile from "pages/Profile/Profile";
import NotificationPage from "pages/Notifications/NotificationPage";
import NotificationList from "pages/Notifications/NotificationList";
import NotificationViewAll from "pages/Notifications/NotificationViewAll";
import ViewMore from "pages/Viewmore/ViewMore";

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Navigate replace to={`${USER}/${USER_ID}/${FEED}`} />} />
        <Route path={USER}>
          <Route exact path=":userid">
            <Route exact path={FEED} element={<Feed />}>
              <Route index element={<FeedIndex />} />
              <Route exact path=":requestid" element={<RequestDetails />} />
              <Route exact path={`:requestid/${ACCEPT_REQUEST}`} element={<AcceptRequest />} />
              <Route exact path="new" element={<NewRequest />}>
                <Route index element={<NewRequestIndex />} />
                <Route path=":type" element={<NewRequestForm />} />
              </Route>
            </Route>
            <Route exact path={PROFILE} element={<Profile />} />
            <Route exact path={VIEWMORE} element={<ViewMore />} />
            <Route exact path={NOTIFICATION} element={<NotificationPage />}>
              <Route index element={<NotificationList />} />
              <Route exact path="all" element={<NotificationViewAll />} />
            </Route>
          </Route>
        </Route>
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
