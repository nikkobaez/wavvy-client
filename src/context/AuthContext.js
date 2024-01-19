import { useState, useEffect, createContext } from "react"
import { auth } from '../services/config'
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}