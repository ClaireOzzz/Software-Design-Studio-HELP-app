import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { ROOT, FEED, USER, PROFILE, ACCEPT_REQUEST, NOTIFICATION, OTHER, SETTINGS, CHATBOT, MAP, LOGIN } from "./routeConfig";

//pages
import FeedIndex from "pages/Feed/components/FeedIndex";
import Feed from "pages/Feed/Feed"
import RequestDetails from "pages/RequestDetails/RequestDetails";
import AcceptRequest from "pages/RequestDetails/AcceptRequest";
import NewRequest from "pages/NewRequest/NewRequest";
import SuccessfulRequest from "pages/NewRequest/SuccessfulRequest";
import NewRequestForm from "pages/NewRequest/components/NewRequestForm";
import NewRequestIndex from "pages/NewRequest/components/NewRequestIndex";
import Profile from "pages/Profile/Profile";
import NotificationPage from "pages/Notifications/NotificationPage";
import NotificationList from "pages/Notifications/NotificationList";
import NotificationViewAll from "pages/Notifications/NotificationViewAll";
import Other from "pages/Other/Other";
import Settings from "pages/Settings/Settings";
import LanguageSettings from "pages/Settings/LanguageSettings";
import SettingsIndex from "pages/Settings/SettingsIndex";
import GebirahChatbot from "pages/GebirahChatbot/GebirahChatbot";
import MediaCapture from "pages/Map/MediaCapture";
import Login from "pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import WithNav from "layout/WithNav";
import NoNav from "layout/NoNav";

export const AppRoutes = () => {
  const { t } = useTranslation();
  const location = useLocation(); // get current url path

  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<PrivateRoutes />} >
          <Route element={<WithNav />} >
            <Route index element={<Navigate replace to={`/${USER}/${localStorage.getItem('help-login-id')}/${FEED}`} />} />
            <Route path={USER}>
              <Route exact path=":userid">
                <Route exact path={FEED} element={<Feed />}>
                  <Route index element={<FeedIndex />} />
                </Route>
                <Route exact path={PROFILE} element={<Profile />} />
                <Route exact path={OTHER} element={<Other />} />
                <Route exact path={MAP} element={<MediaCapture />} />
              </Route>
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>{t('nothing')}</p>
                </main>
              }
            />
          </Route>
        </Route>
        <Route element={<NoNav />} >
          <Route path={USER}>
            <Route exact path=":userid">
              <Route exact path={FEED} element={<Feed />}>
                <Route exact path=":requestid" element={<RequestDetails />} />
                <Route exact path={`:requestid/${ACCEPT_REQUEST}`} element={<AcceptRequest />} />
                <Route exact path="new" element={<NewRequest />}>
                  <Route index element={<NewRequestIndex />} />
                  <Route path=":type" element={<NewRequestForm />} />
                  <Route exact path=":type/success" element={<SuccessfulRequest />} />
                </Route>
              </Route>
              <Route exact path={NOTIFICATION} element={<NotificationPage />}>
                <Route index element={<NotificationList />} />
                <Route exact path="all" element={<NotificationViewAll />} />
              </Route>
              <Route exact path={CHATBOT} element={<GebirahChatbot />} />
              <Route exact path={SETTINGS} element={<Settings />} >
                <Route index element={<SettingsIndex />} />
                <Route exact path="language" element={<LanguageSettings />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path={LOGIN} element={<Login />} />
        <Route
          path="*"
          element={
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column wrap', paddingTop: '40px' }}>
              <p>You're not login.</p>
              <div>Login <Link to={LOGIN}>here</Link>.</div>
            </main>
          }
        />
      </Routes>
    </div>
  );
};
