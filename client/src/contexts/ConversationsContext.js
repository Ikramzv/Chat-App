import React, { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useConctacts } from "./ContactsContext";
import { useSocket } from "./SocketProvider";

const ConversationContext = React.createContext()

export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationsProvider({ children , id }) {
    const [conversations , setConversations] = useLocalStorage('conversations' , [])
    const { contacts } = useConctacts()
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const socket = useSocket()

    const createConversation = (recipients) => {
        setConversations(prev => {
            return [...prev , { recipients , messages: [] }]
        })
    }

    const formattedConversation = conversations.map((conversation , index) => {
        const recipients = conversation.recipients.map(r => {
            const contact = contacts.find(contact => {
                return contact.id === r
            })
            const name = (contact && contact.name) || r
            return { id: r , name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })

            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message , senderName: name , fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation , messages ,recipients , selected }
    })

    const addMessage = useCallback(({recipients , text, sender}) => {
        setConversations(prev => {
            let madeChange = false
            const newMessage = { sender , text}
            const newConversations = prev.map(c => {
                if(arrayEquality(c.recipients , recipients)) {
                    madeChange = true
                    return { ...c, messages: [...c.messages , newMessage] }
                }
                return c
            })

            if(madeChange) {
                return newConversations
            } else {
                return [...prev , { recipients , messages: [newMessage]}]
            }
        })
    } , [setConversations])

    useEffect(() => {
        if(socket) {
            socket.on('receive-message' , addMessage)
        }

        return () => socket?.off('receive-message')
    } , [socket , addMessage])

    const sendMessage = (recipients , text) => {
        socket.emit('sendMessage' , {recipients , text})
        console.log(recipients);
        addMessage({recipients , text , sender: id})
    }

    const value = {
        conversations: formattedConversation,
        selectedConversation: formattedConversation[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationContext.Provider value={value} >
            { children }
        </ConversationContext.Provider>
    )
}

function arrayEquality(a,b) {
    if(a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, i) => {
        return element === b[i]
    })
}