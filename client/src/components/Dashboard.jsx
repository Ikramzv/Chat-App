import React from "react";
import { useConversations } from "../contexts/ConversationsContext";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex vh-100">
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}

export default Dashboard;
