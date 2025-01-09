// src/App.jsx
import Header from "./components/Header/Header";
import styles from "./ChatBotComponent.module.css";
import React, { useState } from "react";
import ChatBox from "./components/ChatBox/ChatBox";
import InputBox from "./components/InputBox/InputBox";
import { AiOutlineMessage } from "react-icons/ai";

const ChatBotComponent = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you?", isUser: false },
  ]);
  const [showChatBot, setShowChatBot] = useState(false);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isUser: true }]);

    // Simulate AI bot response (replace this with API call for real functionality)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Let me look that up for you.", isUser: false },
      ]);
    }, 1000);
  };

  return (
    <> 
      {showChatBot ? (
        <div className={styles.app}>
          <Header  setChatBot={setShowChatBot}/>
          <main className={styles.main}>
            <ChatBox messages={messages} />
            <InputBox onSend={handleSendMessage} />
          </main>
        </div>
      ) : (
       <button
          className={styles.floatingButton}
          onClick={() => setShowChatBot(!showChatBot)}
        >
          {" "}
          <AiOutlineMessage size={24} />
        </button>
      )}
    </>
  );
};

export default ChatBotComponent;
