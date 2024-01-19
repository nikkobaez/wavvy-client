import { useState, createContext } from 'react'

export const PageContext = createContext()

export const PageContextProvider = ({children}) => {
    const [showMessages, setShowMessages] = useState(false)
    const [showFriends, setShowFriends] = useState(false)

    return (
        <PageContext.Provider value={{showMessages, setShowMessages, showFriends, setShowFriends}}>
            {children}
        </PageContext.Provider> 
    )
}