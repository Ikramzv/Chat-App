import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsContext";

function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  return (
    <ListGroup className="rounded-0">
      {conversations.map((conversation, i) => (
        <ListGroup.Item
          key={i}
          onClick={() => selectConversationIndex(i)}
          active={conversation.selected}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversations;
