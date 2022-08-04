import React , { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useConctacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
    const [contacts , setContacts] = useLocalStorage('contacts' , [])

    const createContact = (id , name) => {
        setContacts(prev => {
            return [...prev , { id , name }]
        })
    }
  return (
    <ContactsContext.Provider value={{ contacts , createContact }} >
        { children }
    </ContactsContext.Provider>
  )
}