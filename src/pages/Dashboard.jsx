import { useContext } from 'react'
import { PageContext } from '../context'
import { Sidebar, Chats, Messages } from "../components"

const Dashboard = () => {
    const { showMessages } = useContext(PageContext)

    return (
        <div>
            <div className="hidden lg:flex">
                <Sidebar />
                <Chats />
                <Messages />
            </div>

            <div className="flex lg:hidden">
                {showMessages === false ? (
                    <>
                        <Sidebar />
                        <Chats/>
                    </>
                ) : (
                    <>
                        <Messages />
                    </>
                )}
            </div>
        </div>
    )
}

export default Dashboard