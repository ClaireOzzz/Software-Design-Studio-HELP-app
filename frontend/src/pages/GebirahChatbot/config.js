import { createChatBotMessage } from 'react-chatbot-kit';
import Link from "./widget/Link/Link.jsx"
import MultiOption from './widget/MultiOption/MultiOption.jsx';
import BotAvatar from './widget/BotAvatar/BotAvatar.jsx';
import UserAvatar from './widget/UserAvatar/UserAvatar.jsx';
import ChatbotBackButton from './widget/ChatbotBackButton/ChatbotBackButton.jsx';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const config = {

  initialMessages: [
    createChatBotMessage(`Hello, I am Tony, your friendly chatbot assistant, I would like to guide you around the Gebirah HELP app!`),
  ],
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
    header: () => <div style={{ backgroundColor: "#D22108", color: "#FFF3F3", fontSize: "20px", padding: "10px", width: "100%", position: "fixed", overflow: "hidden", zIndex: 1, top: 0 }}>
      <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
        <div className="mt-3">
          <ChatbotBackButton />
        </div>
        <Typography variant="h5" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
          Conversation with Chatbot
        </Typography>
      </Container>
    </div>
  },
  widgets: [
    {
      widgetName: 'Link',
      widgetFunc: (props) => <Link {...props} />,
      mapStateToProps: ['url', 'title'],
    },
    {
      widgetName: 'MultiOption',
      widgetFunc: (props) => <MultiOption {...props} />,
      mapStateToProps: ['options'],
    },
  ]
};

export default config;