import { createContext, useReducer } from 'react'
import { initialChatState, chatReducer } from '../reducers'

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const [chatState, chatDispatch] = useReducer(chatReducer, initialChatState)

    return (
        <ChatContext.Provider value={{chatState, chatDispatch}}>
            {children}
        </ChatContext.Provider> 
    )
}