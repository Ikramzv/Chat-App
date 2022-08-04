import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConctacts } from "../contexts/ContactsContext";

function Contacts() {
  const { contacts } = useConctacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Contacts;
