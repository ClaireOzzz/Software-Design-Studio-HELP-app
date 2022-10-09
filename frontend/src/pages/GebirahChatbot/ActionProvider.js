// in ActionProvider.jsx
import React from 'react';

import { getChatbotMessage } from 'utils/api';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const addMessageToState = (message) => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
    window.scrollTo(0, document.body.scrollHeight);
  };
  const handleRequest = (text) => {
    (async () => {

          const res = await getChatbotMessage(text);
          // console.log(res)
          let data = JSON.parse(res.data.data);
          let message = res.data.text
          let payload; 
          try{
            payload = data.payload["richContent"][0][0]
          }catch{
            payload = null
          }
          // console.log(payload)
          // console.log(res)
          // const botMessage = createChatBotMessage(res.data["data"]);
          let botMessage;
          if (payload != null) {
            if (payload.type === "button"){
              botMessage = createChatBotMessage(message, {
                "widget": "Link",
                "payload": {
                  "url": payload.link,
                  "title": payload.text
                }
              });
            }else{
              // console.log("multi option")
              // console.log(handleRequest)
              botMessage = createChatBotMessage(message, {
                "widget": "MultiOption",
                "payload": {
                  "options": payload.options,
                  "createChatBotMessage": createChatBotMessage, 
                  "addMessageToState": addMessageToState,
                  "handleRequest": handleRequest 
                }
              });
            }
          }else{
            console.log("no payload")
            botMessage = createChatBotMessage(message);
          }
          addMessageToState(botMessage);
      })();
  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleRequest,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;