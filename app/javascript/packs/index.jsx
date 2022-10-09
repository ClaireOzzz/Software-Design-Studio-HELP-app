// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';

import App from "../App";
import Feed from "../components/Feed/Feed";
import RequestDetails from "../components/RequestDetails/RequestDetails";

document.addEventListener('DOMContentLoaded', () => {
  let g = document.body.appendChild(document.createElement('div'));
  g.setAttribute("id", "app");

  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route exact path="feed" element={<Feed />} />
          <Route exact path="feed/:requestid" element={<RequestDetails />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
})
