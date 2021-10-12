import React, { useState } from "react";

const ChatSelectedContext = React.createContext();

const ChatSelectedContextProvider = ({ children }) => {
  const [chatSelected, setChatSelected] = useState({
    chatId: null,
    chatName: "",
    loggedUser: "",
    access_key: "",
  });
  return (
    <ChatSelectedContext.Provider value={[chatSelected, setChatSelected]}>
      {children}
    </ChatSelectedContext.Provider>
  );
};
export { ChatSelectedContext, ChatSelectedContextProvider };
