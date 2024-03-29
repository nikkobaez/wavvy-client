import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context'
import { getUser, sendFriendRequest } from '../services/firebase'
import { FaSearch, FaUser, FaUserPlus } from '../assets'
import { Button } from '../components'

const FriendModal = ({setShowFriendModal}) => {
    // State to hold the search input
    const [searchInput, setSearchInput] = useState("")

    // State to hold users that match the search input
    const [users, setUsers] = useState([])

    // Context for current user
    const { currentUser } = useContext(AuthContext)

    // Add the current user to the receviers pending array
    const handleSendFriendRequest = async (senderId, receiverId) => {
        try {
            await sendFriendRequest(senderId, receiverId)
            setShowFriendModal()
        } catch (error) {
            console.log(error)
            setShowFriendModal()
        }
    }

    // Fetch and set users data to users that match the search input
    useEffect(() => {
        let unsubscribe
        
        if (currentUser.uid) {
            unsubscribe = getUser(setUsers, searchInput, currentUser)
        }

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [searchInput, currentUser])

    return (
        <div className='absolute left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25'>
            <div className='mx-5 flex w-full max-w-[450px] flex-col justify-between rounded-lg bg-white p-5'>
                <div className='flex flex-col gap-4'>
                    <h2 className='px-2 text-2xl font-medium'>
                        New Friend Request
                    </h2>
                    <div className='mb-2 flex w-full items-center justify-center rounded-3xl bg-[#f8f8f8] px-4 py-2'>
                        <input
                            type='text'
                            placeholder='Search For A User'
                            className='w-full bg-transparent outline-none'
                            onChange={(event) => {
                                setSearchInput(event.target.value)
                            }}
                        />
                        <FaSearch size={20} color="#9aa2a9"/>
                    </div>
                </div>

                <div>
                    {users.length > 0 && (
                        <div key={users[0].id} className='my-6 flex w-full items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                {users[0].id && users[0].photoURL.length > 0 ? (
                                    <div className='flex max-h-14 max-w-14 cursor-pointer items-center justify-center'>
                                        <img 
                                            src={users[0].photoURL}
                                            alt="profile"
                                            className='h-full w-full rounded-full'
                                        />
                                    </div>
                                ) : (
                                    <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#ee7d6a]'>
                                        <FaUser size={28} color="white"/>
                                    </div>
                                )}
                                <p className='text-lg'>
                                    {users[0].id && users[0].displayName}
                                </p>
                            </div>
                            <div className='flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-[#ee7d6a]' onClick={() => {
                                handleSendFriendRequest(currentUser.uid, users[0].id)
                            }}>
                                <FaUserPlus size={30} color="#ee7d6a"/>
                            </div>
                        </div>
                    )} 
                </div>

                <Button
                    title="Cancel"
                    buttonStyles="w-full py-2 bg-[#ee7d6a] rounded-lg text-white font-medium mt-3"
                    handleClick={setShowFriendModal}
                />
            </div>
        </div>
    )
}

export default FriendModal