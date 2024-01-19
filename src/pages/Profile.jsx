import { useContext } from 'react'
import { PageContext } from '../context'
import { Sidebar, Details, Friends } from "../components"

const Profile = () => {
    const { showFriends } = useContext(PageContext)

    return (
        <div> 
            <div className='hidden lg:flex'>
                <Sidebar />
                <Details />
                <Friends />
            </div> 

            <div className='flex lg:hidden'>
                {showFriends === false ? (
                    <>
                        <Sidebar />
                        <Details />
                    </>
                ) : (
                    <>
                        <Friends />
                    </>
                )}
            </div>
        </div>
    ) 
}

export default Profile