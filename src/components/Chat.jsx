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
                <div className="relative flex items-center w-full gap-4 mt-2 mb-8 cursor-pointer" onClick={() => {chatDispatch ({type:"UPDATE_CHAT_INFO", payload: {currentChatId: chat.id, currentReceiverId: receiverInfo.id}})}}>
                    {receiverInfo.photoURL.length > 0 ? (
                        <div className='flex items-center justify-center cursor-pointer max-h-14 max-w-14 min-w-14 min-h-14'>
                            <img 
                                src={receiverInfo.photoURL}
                                alt="profile"
                                className='w-full h-full rounded-full'
                            />
                        </div>
                    ) : (
                        <div className='flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#ee7d6a]'>
                            <FaUser size={28} color="white"/>
                        </div>
                    )}

                    <div className="flex flex-col w-full truncate">
                        <h4 className="mb-1 text-lg font-medium">
                            {receiverInfo.displayName}
                        </h4>
                        <p className="truncate">
                            {chat.lastMessage}
                        </p>
                    </div>

                    <div className="absolute hidden right-1 top-1 sm:flex">
                        <p>  
                            {chat.timestamp && formatTimestamp(chat.timestamp)} 
                        </p>
                    </div>

                    <div 
                        className="absolute flex w-full h-full cursor-pointer lg:hidden" 
                        onClick={() => setShowMessages(!showMessages)}
                    />
                </div>
            )}
        </>
    )
}

export default Chat