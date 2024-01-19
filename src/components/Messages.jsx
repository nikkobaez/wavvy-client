import { useState, useEffect, useContext, useReducer } from 'react'
import { AuthContext, ChatContext, PageContext } from '../context'
import { initialMessageState, messageReducer } from '../reducers'
import { getUserInfo, sendMessage, getMessages, sendMessageAndImage, sendMessageAndVideo } from '../services/firebase'
import { FaUser, FaPaperclip, FaChevronLeft } from '../assets'
import { Message } from '../components'
import { supportedImageTypes, supportedVideoTypes } from '../constants'
import { scrollToBottom } from '../utils'

const Messages = () => {
    // State to hold information about receiver
    const [receiverInfo, setReceiverInfo] = useState(null)

    // State to hold messages
    const [messages, setMessages] = useState([])

    // Context for current user, chat, and responsive design
    const { currentUser } = useContext(AuthContext)
    const { chatState } = useContext(ChatContext)
    const { showMessages, setShowMessages } = useContext(PageContext)

    // Reducer for handling message states
    const [messageState, messageDispatch] = useReducer(messageReducer, initialMessageState)

    // Fetch and set receiver information
    useEffect(() => {  
        if (chatState.currentReceiverId) {
            const handleGetUserInfo = async () => {
                try {
                    const response = await getUserInfo(chatState.currentReceiverId)
                    setReceiverInfo(response)
                } catch (error) {
                    console.log(error)
                }
            }
    
            handleGetUserInfo()
        }
    }, [chatState.currentReceiverId])

    // Fetch and set messages
    useEffect(() => {
        let unsubscribe

        if (chatState.currentChatId) {
            unsubscribe = getMessages(setMessages, chatState.currentChatId)
        }

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [chatState.currentChatId])

    // Send a messsage and update message states as needed
    const handleSendMessage = async () => {
        if (messageState.message.length === 0 && !messageState.file) {
            return
        } 

        messageDispatch({type: "UPDATE_SENDING", payload: {sending: true}})

        try {
            if (messageState.message.length > 0 && !messageState.file) {
                await sendMessage(chatState.currentChatId, messageState.message, currentUser.uid)
                messageDispatch({type: "RESET"})
            } else {
                if (supportedImageTypes.includes(messageState.file.type)) {
                    await sendMessageAndImage(chatState.currentChatId, messageState.message, messageState.file, currentUser.uid)
                    messageDispatch({type: "RESET"})
                } else if (supportedVideoTypes.includes(messageState.file.type)) {
                    await sendMessageAndVideo(chatState.currentChatId, messageState.message, messageState.file, currentUser.uid)
                    messageDispatch({type: "RESET"})        
                } else {
                    alert("File Not Supported")
                    messageDispatch({type: "RESET"})
                    return
                }
            }

            scrollToBottom()
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            {chatState.currentChatId && receiverInfo && (
                 <div className='flex h-screen w-full flex-col'>
                    {/* HEADER */}
                    <div className='flex h-[80px] w-full items-center border-b border-[#f5f5f5] px-5'>
                        <div className='flex items-center gap-4'>
                            <div className='flex cursor-pointer lg:hidden' onClick={() => setShowMessages(!showMessages)}>
                                <FaChevronLeft size={18} color="black"/>
                            </div>

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
                            <h3 className='text-lg font-medium'>
                                {receiverInfo.displayName}
                            </h3>
                        </div>
                    </div>
        
                    {/* MESSAGES */}
                    <div name="container" className='flex w-full flex-1 flex-col gap-4 overflow-y-scroll p-5'>
                        {messages.map((message, index) => (
                            <Message 
                                key={message.id || index} message={message} 
                            />
                        ))}
                    </div>
        
                    {/* INPUT */}
                    <div className='flex h-[80px] w-full items-center gap-4 border-t border-[#f5f5f5] px-5'>
                        <div className='flex w-full items-center justify-center gap-4 rounded-3xl bg-[#f8f8f8] px-4 py-2'>
                            <label className='cursor-pointer'>
                                <FaPaperclip size={20} color="#9aa2a9"/>
                            
                                <input 
                                    type="file"
                                    className='hidden'
                                    onChange={(event) => {
                                        messageDispatch({type: "UPDATE_FILE", payload: {file: event.target.files[0]}})
                                        alert("File Attached")
                                    }}
                                />
                            </label>

                            <input
                                type='text'
                                placeholder='Wavvy Message'
                                className='w-full bg-transparent outline-none'
                                onChange={(event) => messageDispatch({type: "UPDATE_MESSAGE", payload: {message: event.target.value}})}
                                value={messageState.message}
                            />
                        </div>

                        <button disabled={messageState.sendingMessage} className='min-w-[100px] rounded-full bg-[#ee7d6a] py-2 font-medium text-white' onClick={handleSendMessage}>
                            {messageState.sending ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}



export default Messages