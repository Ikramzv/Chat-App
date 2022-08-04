import React from "react";
import { useRef } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { useConctacts } from "../contexts/ContactsContext";

function NewContactModal({ closeModal }) {
  const { createContact } = useConctacts();
  const idRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </FormGroup>
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </FormGroup>
          <Button type="submit" className="mt-4">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewContactModal;
