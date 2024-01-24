import { useState, useEffect, useContext } from "react"
import { AuthContext, ChatContext, PageContext } from "../context"
import { getChat } from "../services/firebase"
import { FaUser } from '../assets'
import { formatTimestamp } from "../utils"

const ChatModal = ({searchInput, setSearchInput}) => {
    // State to hold information about the receiver 
    const [receiverInfo, setReceiverInfo] = useState(null)

    // State to hold chats that match the search input
    const [chats, setChats] = useState([])

    // Context for current user, chat, and responsive design
    const { currentUser } = useContext(AuthContext)
    const { chatDispatch } = useContext(ChatContext)
    const { showMessages, setShowMessages } = useContext(PageContext)
    
    // Updating chat context, search input, and messages component responsiveness
    const handleClick = () => {
        chatDispatch({type: "UPDATE_CHAT_INFO", payload: {currentChatId: chats[0].id, currentReceiverId: receiverInfo[0].id}})
        setSearchInput()
        setShowMessages(!showMessages)
    }

    // Fetch and set chat data to chats that match the search input
    useEffect(() => {
        let unsubscribe

        const handleGetChat = async () => {
            if (currentUser.uid) {
                try {
                    unsubscribe = await getChat(setChats, setReceiverInfo, searchInput, currentUser.uid)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        handleGetChat()

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [currentUser.uid, searchInput])

    console.log(chats)

    return (
        <>
            {chats.length > 0 && receiverInfo.length > 0 && (
                <div className='w-full p-5 bg-white shadow-md rounded-xl' onClick={handleClick}>
                    <div className="relative flex items-center w-full gap-4 cursor-pointer">
                        {receiverInfo[0].id && receiverInfo[0].photoURL.length > 0 ? (
                            <div className='flex items-center justify-center cursor-pointer max-h-14 max-w-14 min-h-14 min-w-14'>
                                <img 
                                    src={receiverInfo[0].photoURL}
                                    alt="profile"
                                    className='w-full h-full rounded-full'
                                />
                            </div>
                        ) : (
                            <div className='flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#ee7d6a]'>
                                <FaUser size={28} color="white"/>
                            </div>
                        )}

                        <div className="flex-col w-full truncate">
                            <h4 className="mb-1 text-lg font-medium">
                                {receiverInfo[0].id && receiverInfo[0].displayName}
                            </h4>
                            <p className="truncate">
                                {chats[0].id && chats[0].lastMessage}
                            </p>
                        </div>

                        <div className="absolute hidden right-1 top-1 md:flex">
                            <p>  
                                {chats[0].id && chats[0].timestamp && formatTimestamp(chats[0].timestamp)} 
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatModal