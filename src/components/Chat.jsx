import { useState, useEffect, useContext } from "react"
import { AuthContext, ChatContext, PageContext } from "../context"
import { getUserInfo } from "../services/firebase"
import { FaUser } from "../assets"
import { formatTimestamp } from "../utils"

const Chat = ({chat}) => {
    // State for storing information about the chat receiver
    const [receiverInfo, setReceiverInfo] = useState(null)

    // Context for current user, chat, and responsive design
    const { currentUser } = useContext(AuthContext)
    const { chatDispatch } = useContext(ChatContext)
    const { showMessages, setShowMessages } = useContext(PageContext)

    // Fetch and set receiver information 
    useEffect(() => {       
        const handleGetUserInfo = async () => {
            const receiverId = chat.members.filter(id => id !== currentUser.uid)

            try {
                const response = await getUserInfo(receiverId[0])
                setReceiverInfo(response)
            } catch (error) {
                console.log(error)
            }
        }

        handleGetUserInfo()
    }, [chat.members, currentUser.uid])

    return (
        <>
            {chat.id && receiverInfo && (
                <div className="relative mb-8 mt-2 flex w-full cursor-pointer items-center gap-4" onClick={() => {chatDispatch ({type:"UPDATE_CHAT_INFO", payload: {currentChatId: chat.id, currentReceiverId: receiverInfo.id}})}}>
                    {receiverInfo.photoURL.length > 0 ? (
                        <div className='flex max-h-14 max-w-14 cursor-pointer items-center justify-center'>
                            <img 
                                src={receiverInfo.photoURL}
                                alt="profile"
                                className='h-full w-full rounded-full'
                            />
                        </div>
                    ) : (
                        <div className='flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#ee7d6a]'>
                            <FaUser size={28} color="white"/>
                        </div>
                    )}

                    <div className="flex w-full flex-col truncate">
                        <h4 className="mb-1 text-lg font-medium">
                            {receiverInfo.displayName}
                        </h4>
                        <p className="truncate">
                            {chat.lastMessage}
                        </p>
                    </div>

                    <div className="absolute right-1 top-1 hidden sm:flex">
                        <p>  
                            {chat.timestamp && formatTimestamp(chat.timestamp)} 
                        </p>
                    </div>

                    <div 
                        className="absolute flex h-full w-full cursor-pointer lg:hidden" 
                        onClick={() => setShowMessages(!showMessages)}
                    />
                </div>
            )}
        </>
    )
}

export default Chat