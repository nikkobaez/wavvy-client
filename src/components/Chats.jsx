import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context'
import { getChats } from '../services/firebase'
import { FaPlus, FaSearch } from '../assets'
import { MessageModal, Chat, ChatModal } from '../components'


const Chats = () => {
    // State to hold the search input
    const [searchInput, setSearchInput] = useState("")

    // State to hold chats the current user is a member of
    const [chats, setChats] = useState([])

    // State to manage the visibility of the message modal
    const [showMessageModal, setShowMessageModal] = useState(false)

    // Context for current user
    const { currentUser } = useContext(AuthContext)

    // Fetch and set chat data to chats the current user is a member of
    useEffect(() => {
        let unsubscribe

        if (currentUser.uid) {
            unsubscribe = getChats(setChats, currentUser.uid)
        }
            
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [currentUser.uid])

    return (
        <div className='flex w-full max-w-[400px] flex-col border-r border-[#F5F5F5] p-5'>
            
            {/* HEADER */}
            <div className='flex items-center justify-between w-full h-10 px-2'>
                <h2 className='text-3xl font-medium'>
                    Messages
                </h2>
                <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#ee7d6a]' onClick={() => setShowMessageModal(!showMessageModal)}>
                    <FaPlus size={18} color="white"/>
                </div>
            </div>

            {/* SEARCH */}
            <div className='relative my-5 flex w-full items-center justify-center rounded-3xl bg-[#f8f8f8] px-4 py-2'>
                <input
                    type='text'
                    placeholder='Search For A Chat'
                    className='w-full bg-transparent outline-none'
                    onChange={(event) => setSearchInput(event.target.value)}
                    value={searchInput}
                />
                
                <FaSearch size={20} color="#9aa2a9"/>

                {searchInput.length > 0 && (
                    <div className='absolute z-10 w-full top-12'>
                        <ChatModal 
                            searchInput={searchInput} 
                            setSearchInput={() => setSearchInput("")}
                        />
                    </div>
                )}
            </div>

            {/* CHATS */}
            <div>
                {chats.map((chat, index) => (
                    <Chat key={chat.id || index} chat={chat}/>
                ))}
            </div>

            {showMessageModal && (
                <MessageModal setShowMessageModal={() => setShowMessageModal(!showMessageModal)}/>
            )}
            
        </div>
    )
}

export default Chats