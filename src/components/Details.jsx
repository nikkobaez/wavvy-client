import { useState, useEffect, useContext, useReducer } from 'react'
import { AuthContext, PageContext } from '../context'
import { initialDetailsState, detailsReducer } from '../reducers'
import { updateUserInfo } from '../services/firebase'
import { FaUser, BiSolidPencil } from '../assets'
import { Button, PasswordModal } from '../components'
import { supportedImageTypes } from '../constants'

const Details = () => {
    // State to manange visibility of password modal
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    // Context for current user and responsive design
    const { currentUser } = useContext(AuthContext)
    const { showFriends, setShowFriends } = useContext(PageContext)

    // Reducer for handling user details state
    const [detailsState, detailsDispatch] = useReducer(detailsReducer, initialDetailsState)

    // Updating password modal visibility and checking if uploading file is an allowed type
    const handlePasswordModal = () => {
        if (!detailsState.file) {
            setShowPasswordModal(true)
        } else {
            if (supportedImageTypes.includes(detailsState.file.type)) {
                setShowPasswordModal(true)
            } else {
                alert("File Not Supported")
                detailsDispatch({type: "RESET", payload: {file: null, displayName: currentUser.displayName, email: currentUser.email, currentPassword: "", newPassword: ""}})
                return
            }
        }
    }
 
    // Updating password modal visibility, updating the current users details, and reseting the user details state
    const handleUpdateUserInfo = async () => {
        if (detailsState.currentPassword.length === 0) {
            return
        }

        setShowPasswordModal(false)

        try {
            await updateUserInfo(currentUser, detailsState)
            detailsDispatch({type: "RESET", payload: {file: null, displayName: currentUser.displayName, email: currentUser.email, currentPassword: "", newPassword: ""}})
        } catch (error) {
            console.log(error)
        }
    }

    // Reseting the user details state when there is a change to the current user
    useEffect(() => {
        if (currentUser.uid) {
            detailsDispatch({type: "RESET", payload: {file: null, displayName: currentUser.displayName, email: currentUser.email, currentPassword: "", newPassword: ""}})
        }
    }, [currentUser])

    return (
            <div className='flex h-screen w-full max-w-[450px] flex-col border-r border-[#f5f5f5] p-5'>
                <div className='w-full h-10 px-2'>
                    <h2 className='text-3xl font-medium'>
                        Profile
                    </h2>
                </div>

                <div className='flex flex-col items-center justify-between w-full h-full'>
                    <div className='flex flex-col items-center w-full h-full'>
                        <label>
                            {currentUser.photoURL && currentUser.photoURL.length > 0 ? (
                                    <div className='relative w-32 h-32 my-3 cursor-pointer'>
                                        <img 
                                            src={currentUser.photoURL}
                                            alt="profile"
                                            className='w-full h-full rounded-full'
                                        />

                                        <div className='absolute -right-2 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#FA9584]'>
                                            <BiSolidPencil size={22} color="white"/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='relative my-5 flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-[#ee7d6a]'>
                                        <FaUser size={50} color="white"/>

                                        <div className='absolute -right-2 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#FA9584]'>
                                            <BiSolidPencil size={22} color="white"/>
                                        </div>
                                    </div>
                            )}
                        
                            <input 
                                type="file"
                                className='hidden'
                                onChange={(event) => {
                                    detailsDispatch({type: "UPDATE_PROFILE_IMAGE", payload: {file: event.target.files[0]}})
                                    alert("File Attached")
                                }}
                            />
                        </label>

                        <p className='my-2 flex cursor-pointer text-[#ee7d6a] lg:hidden' onClick={() => setShowFriends(!showFriends)}>
                            View Friends
                        </p>

                        {currentUser.displayName && currentUser.email && (
                            <div className='flex flex-col w-full gap-4'>
                                <div className='flex flex-col w-full gap-2'>
                                    <p className='ml-1'>
                                        Display Name
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Display Name"
                                        className='rounded-lg bg-[#f8f8f8] px-4 py-2 outline-none'
                                        onChange={(event) => detailsDispatch({type: "UPDATE_DISPLAY_NAME", payload: {displayName: event.target.value}})}
                                        value={detailsState.displayName}
                                    />
                                </div>

                                <div className='flex flex-col w-full gap-2'>
                                    <p className='ml-1'>
                                        Email
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className='rounded-lg bg-[#f8f8f8] px-4 py-2 outline-none'
                                        onChange={(event) => detailsDispatch({type: "UPDATE_EMAIL", payload: {email: event.target.value}})}
                                        value={detailsState.email}
                                    />
                                </div>

                                <div className='flex flex-col w-full gap-2'>
                                    <p className='ml-1'>
                                        Password
                                    </p>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        className='rounded-lg bg-[#f8f8f8] px-4 py-2 outline-none'
                                        onChange={(event) => detailsDispatch({type: "UPDATE_NEW_PASSWORD", payload: {newPassword: event.target.value}})}
                                        value={detailsState.newPassword}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        title="Update Profile"
                        buttonStyles="w-full py-2 bg-[#ee7d6a] rounded-lg text-white font-medium"
                        handleClick={handlePasswordModal}
                    />
                </div>

                {/* PASSWORD MODAL */}
                {showPasswordModal && (
                    <PasswordModal 
                        detailsDispatch={detailsDispatch}
                        handleUpdateUserInfo={() => handleUpdateUserInfo()}
                    />
                )}
            </div>
    )
}

export default Details