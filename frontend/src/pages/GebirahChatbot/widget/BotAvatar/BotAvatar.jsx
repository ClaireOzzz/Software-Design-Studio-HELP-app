import React from "react";

import botImage from "../../../../assets/chatbot.png";

const BotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none" }}
      >
        <img alt="BotAvatar" src={botImage} width="40" />
      </div>
    </div>
  );
};

export default BotAvatar;