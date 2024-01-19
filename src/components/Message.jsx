import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context'
import { getUserInfo } from '../services/firebase'
import { FaUser } from '../assets'
import { formatTimestamp, scrollToBottom } from "../utils"

const Message = ({message}) => {
    // State to hold information about the sender
    const [senderInfo, setSenderInfo] = useState(null)

    // Context for current user 
    const { currentUser } = useContext(AuthContext)

    // Fetch and set sender information
    useEffect(() => {  
        if (message.senderId) {
            const handleGetUserInfo = async () => {
                try {
                    const response = await getUserInfo(message.senderId)
                    setSenderInfo(response)
                } catch (error) {
                    console.log(error)
                }
            }
            handleGetUserInfo()
        }
    }, [message.senderId, currentUser.email])

    return (
        <>
            {message.id && senderInfo && (
                <div className='mb-4 mt-4 flex w-full gap-4' onLoad={() => scrollToBottom()}>
                    {senderInfo.photoURL ? (
                        <div className='flex h-14 w-14 cursor-pointer items-center justify-center'>
                            <img 
                                src={senderInfo.photoURL}
                                alt="profile"
                                className='h-full min-h-14 w-full min-w-14 rounded-full'
                            />
                        </div>
                    ) : (
                        <div className='flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-full bg-[#ee7d6a]'>
                            <FaUser size={28} color="white"/>
                        </div>
                    )}
                    <div className="flex w-full flex-col justify-between gap-3 sm:w-1/2">
                        <div className='flex w-full items-center justify-between'>
                            <p>
                                {senderInfo.displayName}
                            </p>
                            <p className='mr-2'>
                                {message.timestamp && formatTimestamp(message.timestamp)}
                            </p>
                        </div>

                        {message.message && (
                            <div className='w-fit rounded-b-[25px] rounded-tr-[25px] px-5 py-3' style={{background: currentUser.uid === message.senderId ? "#ee7d6a" : "#f8f8f8", color: currentUser.uid === message.senderId ? "white" : "black"}}>
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        )}

                        {message.image && (
                            <div>
                                <img 
                                    src={message.image}
                                    alt="message"
                                    className='w-full rounded-2xl'
                                />
                            </div>
                        )}

                        {message.video && (
                            <div>
                                <video 
                                    controls 
                                    className='w-full rounded-2xl'
                                >
                                    <source src={message.video} />
                                </video>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>

    )
}

export default Message