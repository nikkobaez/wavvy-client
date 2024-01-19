import {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, ChatContext, PageContext } from '../context'
import { getUserInfo, getDirectChat, createDirectChat, removeFriend } from '../services/firebase'
import { FaUser, BsChatTextFill, FaUserMinus } from '../assets'
import { Icon } from '../components'

const Friend = ({friendId}) => {
    // State to hold the friend information
    const [friendInfo, setFriendInfo] = useState(null)

    // Context for current user, chat, and responsive design
    const { currentUser } = useContext(AuthContext)
    const { chatDispatch } = useContext(ChatContext)
    const { showMessages, setShowMessages } = useContext(PageContext)

    // Initializing navigate using the useNavigate hook
    const navigate = useNavigate()

    // Navigate to a direct chat or create a chat if one does not exist
    const handleCreateDirectChat = async (senderId, recieverId) => {
        try {
            const response = await getDirectChat(senderId, recieverId)

            if (response.length > 0) {
                chatDispatch({type: "UPDATE_CHAT_INFO", payload: {currentChatId: response[0].id, currentReceiverId: recieverId}})
                navigate("/dashboard")
            } else {
                await createDirectChat(senderId, recieverId)
                const response = await getDirectChat(senderId, recieverId)
                chatDispatch({type: "UPDATE_CHAT_INFO", payload: {currentChatId: response[0].id, currentReceiverId: recieverId}})
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Remove a friend from the current users array of friends
    const handleRemoveFriend = async () => {
        try {
            await removeFriend(currentUser.uid, friendId)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch and set the friend information
    useEffect(() => { 
        if (friendId) {
            const handleGetUserInfo = async () => {
                try {
                    const response = await getUserInfo(friendId)
                    setFriendInfo(response)
                } catch (error) {
                    console.log(error)
                }
            }

            handleGetUserInfo()
        }
    }, [friendId])

    return (
        <>
            {friendInfo && (
                <div className='flex w-full items-center justify-between border-b border-t border-[#f5f5f5] py-5 pr-5'>
                    <div className='flex items-center gap-4'>
                        {friendInfo.photoURL.length > 0 ? (
                            <div className='flex max-h-14 max-w-14 cursor-pointer items-center justify-center'>
                                <img 
                                    src={friendInfo.photoURL}
                                    alt="profile"
                                    className='h-full w-full rounded-full'
                                />
                            </div>
                        ) : (
                            <div className='flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#ee7d6a]'>
                                <FaUser size={28} color="white"/>
                            </div>
                        )}

                        <h3 className='text-lg font-medium'>
                            {friendInfo.displayName}
                        </h3>
                    </div>

                    <div className='flex gap-5'>
                        <Icon
                            icon={<BsChatTextFill size={30} color="ee7d6a"/>}
                            borderColor="#ee7d6a"
                            handleClick={() => {
                                handleCreateDirectChat(currentUser.uid, friendId)

                                if (window.innerWidth < 1024) {
                                    setShowMessages(!showMessages)
                                } 
                            }}
                        />

                        <Icon
                            icon={<FaUserMinus size={30} color="ee7d6a"/>}
                            borderColor="#ee7d6a"
                            handleClick={() => handleRemoveFriend()}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Friend