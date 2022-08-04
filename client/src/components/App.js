import React from "react";
import { ContactsProvider } from "../contexts/ContactsContext";
import { ConversationsProvider } from "../contexts/ConversationsContext";
import { SocketProvider } from "../contexts/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [id ,setId] = useLocalStorage()
  const dashboard = (
    <SocketProvider id={id} >
      <ContactsProvider>
        <ConversationsProvider id={id} >
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    )
  return (
    <div className="App">
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </div>
  );
}

export default App;
