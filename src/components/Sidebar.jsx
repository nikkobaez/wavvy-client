import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChatContext } from '../context'
import { logout } from '../services/firebase'
import { Logo, BsChatTextFill, FaUser, FaPowerOff } from '../assets'
import { Icon } from '../components'

const Sidebar = () => {
    const { chatDispatch } = useContext(ChatContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await logout()
            chatDispatch({type: "UPDATE_CHAT_INFO", payload: {currentChatId: "", currentReceiverId: ""}})
        } catch (error) {
            console.log(error)
        }

        logout()
    }

    return (
        <div className='flex min-h-screen w-full max-w-[90px] flex-col items-center justify-between border-r border-[#F5F5F5] py-5'>
            <div className='flex flex-col items-center'>
                <img 
                    src={Logo}
                    alt="wavvy logo"
                    width={50}
                    height={50}
                    className='object-contain'
                />
                <div className='flex flex-col gap-6 mt-14'>
                    <Icon
                        icon={<BsChatTextFill size={30} color={location.pathname === "/dashboard" ? "#ee7d6a" : "#9aa2a9"}/>}
                        borderColor={location.pathname === "/dashboard" ? "#ee7d6a" : "#9aa2a9"}
                        handleClick={() => navigate("/dashboard")}
                    />
                    <Icon
                        icon={<FaUser size={28}  color={location.pathname === "/profile" ? "#ee7d6a" : "#9aa2a9"}/>}
                        borderColor={location.pathname === "/profile" ? "#ee7d6a" : "#9aa2a9"}
                        handleClick={() => navigate("/profile")}
                    />
                </div>
            </div>
            <Icon
                icon={<FaPowerOff size={24} color='#ee7d6a'/>}
                borderColor='#ee7d6a'
                handleClick={handleLogout}
            />
        </div>
    )
}

export default Sidebar