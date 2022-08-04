import React from "react";
import { useState } from "react";
import { Modal, Form, Button, FormGroup } from "react-bootstrap";
import { useConctacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";

function NewConversationModal({ closeModal }) {
  const { contacts } = useConctacts();
  const { createConversation } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxChange = (id) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prev) => prev.id !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <FormGroup
              controlId={contact.id}
              key={contact.id}
              className="d-flex gap-2"
            >
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                onChange={() => handleCheckboxChange(contact.id)}
              />
              <Form.Label>{contact.name}</Form.Label>
            </FormGroup>
          ))}
          <Button type="submit" className="mt-4">
            Create Conversation
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
