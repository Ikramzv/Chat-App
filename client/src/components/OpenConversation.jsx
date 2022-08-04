import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsContext";

function OpenConversation() {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    node?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );

    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3 overflow-v  -auto">
          {selectedConversation.messages.map((message, index) => {
            return (
              <div
                ref={setRef}
                className={`my-1 d-flex flex-column ${
                  message.fromMe && "align-self-end"
                }`}
                key={index}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="m-2">
          <InputGroup>
            <Form.Control
              as={"textarea"}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}

export default OpenConversation;
