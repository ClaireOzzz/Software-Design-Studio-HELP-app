import React from "react";

// import { ReactComponent as UrlIcon } from "../../icons/link.svg";

import "./Link.styles.css";

const Link = (props) => {
    // console.log(props)
  return (
    <a
      href={props.payload.url}
    //   target="_blank"
    //   rel="noopener noreferrer"
      className="url-link"
    >
      {/* <UrlIcon className="url-icon" /> */}
      <h1 className="url-header">{props.payload.title}</h1>
    </a>
  );
};

export default Link;