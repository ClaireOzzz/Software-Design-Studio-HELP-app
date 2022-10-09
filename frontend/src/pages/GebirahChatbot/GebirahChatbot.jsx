import React from "react"
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './GebirahChatbot.styles.css'

import config from './config.js';
import MessageParser from './Messageparser.js';
import ActionProvider from './ActionProvider.js';

const GebirahChatbot = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  )
}

export default GebirahChatbot