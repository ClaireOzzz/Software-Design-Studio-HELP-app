import React from "react";

import userImage from "../../../../assets/pelican.png";

const UserAvatar = () => {
  return (
    <div className="react-chatbot-kit-user-avatar">
      <div
        className="react-chatbot-kit-user-avatar-container"
        style={{ background: "none" }}
      >
        <img alt="BotAvatar" src={userImage} width="40" />
      </div>
    </div>
  );
};

export default UserAvatar;