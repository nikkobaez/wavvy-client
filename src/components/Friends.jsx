import { useState, useEffect, useContext } from 'react'
import { AuthContext, PageContext } from '../context'
import { getUserInfo } from '../services/firebase'
import { Button, Friend, FriendModal, Pending } from '../components'
import { FaChevronLeft } from '../assets'

const Friends = () => {
    // State to hold information about the sender
    const [senderInfo, setSenderInfo] = useState(null)

    // State to manage the visbility of the friends modal
    const [showFriendModal, setShowFriendModal] = useState(false)

    // State for managing local navigation
    const [navigation, setNavigation] = useState("All")

    // Context for current user and responsive design
    const { currentUser } = useContext(AuthContext)
    const { showFriends, setShowFriends } = useContext(PageContext)

    // Fetch and set sender information
    useEffect(() => { 
        if (currentUser.uid) {
            const handleGetUserInfo = async () => {
                try {
                    const response = await getUserInfo(currentUser.uid)
                    setSenderInfo(response)
                } catch (error) {
                    console.log(error)
                }
            }

            handleGetUserInfo()
        }
    }, [currentUser, senderInfo])

    return (
        <div className='flex flex-col w-full h-screen'>
            {/* HEADER */}
            <div className='flex h-[80px] items-center gap-4 border-b border-[#f5f5f5] px-5 sm:gap-5'>
                <div className='flex cursor-pointer lg:hidden' onClick={() => setShowFriends(!showFriends)}>
                    <FaChevronLeft size={18} color="black"/>
                </div>
                <h3 className='text-lg font-medium'>
                    Friends
                </h3>
                <p className='text-lg'>
                    |
                </p>
                <Button 
                    title="All"
                    buttonStyles="text-base"
                    handleClick={() => setNavigation("All")}
                />

                <Button 
                    title="Pending"
                    buttonStyles="text-base"
                    handleClick={() => setNavigation("Pending")}
                />

                <Button
                    title="Add Friend"
                    buttonStyles="text-[#ee7d6a]"
                    handleClick={() => setShowFriendModal(true)}
                />
            </div>

            {/* ALL FRIENDS */}
            {navigation === "All" && senderInfo && (
                <div className='flex flex-col flex-1 w-full gap-4 py-5 pl-5'>
                    <h3 className='text-lg'>
                        All Friends - {senderInfo.friends.length === 0 ? "0" : senderInfo.friends.length }
                    </h3>
                    {senderInfo.friends.length > 0 && (
                        <div>
                            {senderInfo.friends.map((friendId, index) => (
                                <Friend key={friendId || index } friendId={friendId}/>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* PENDING */}
            {navigation === "Pending" && senderInfo && (
                <div className='flex flex-col flex-1 w-full gap-4 py-5 pl-5 overflow-y-scroll'>
                    <h3 className='text-lg'>
                        Pending - {senderInfo.pending.length === 0 ? "0" : senderInfo.pending.length }
                    </h3>
                    {senderInfo.pending.length > 0 && (
                        <div>
                            {senderInfo.pending.map((friendId, index) => (
                                <Pending key={friendId || index } friendId={friendId}/>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* FRIENDS MODAL */}
            {showFriendModal && (
                <FriendModal setShowFriendModal={() => setShowFriendModal(false)}/>
            )}
        </div>
    )
}

export default Friends