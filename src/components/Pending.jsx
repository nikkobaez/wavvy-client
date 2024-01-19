import {useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context'
import { getUserInfo, removeFriendRequest, approveFriendRequest } from '../services/firebase'
import { FaUser, FaXmark, FaCheck } from '../assets'
import { Icon } from '../components'

const Friend = ({friendId}) => {
    // State to hold friend information
    const [friendInfo, setFriendInfo] = useState(null)

    // Context for current user
    const { currentUser } = useContext(AuthContext)

    // Add the requesters id to the current users friends array and the current users id to the requesters friends array
    const handleApproveFriendRequest = async() => {
        try {
            await approveFriendRequest(currentUser.uid, friendId)
        } catch (error) {
            console.log(error)
        }
    }

    // Remove the requesters id from the current users pending array
    const handleRemoveFriendRequest = async () => {
        try {
            await removeFriendRequest(currentUser.uid, friendId)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch and set friend information
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
                            icon={<FaCheck size={30} color="ee7d6a"/>}
                            borderColor="#ee7d6a"
                            handleClick={() => handleApproveFriendRequest()}
                        />

                        <Icon
                            icon={<FaXmark size={30} color="ee7d6a"/>}
                            borderColor="#ee7d6a"
                            handleClick={() => handleRemoveFriendRequest()}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Friend