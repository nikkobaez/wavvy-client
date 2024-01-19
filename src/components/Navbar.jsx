import { useNavigate } from 'react-router-dom'
import { Logo } from '../assets'
import { Button } from '../components'

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className='h-22 mx-auto flex w-full max-w-[1140px] items-center justify-between p-5'>
            <div className='flex cursor-pointer items-center justify-center gap-2' onClick={() => navigate("/")}>
                <img 
                    src={Logo}
                    alt="wavvy logo"
                    width={28}
                    height={28}
                    className='object-contain'
                />
                <h1 className='text-2xl font-bold'>
                    Wavvy
                </h1>
            </div>
            <div className='flex items-center justify-between gap-7'>
                {/* <Button 
                    title="About"
                    buttonStyles="text-[#ee7d6a] font-medium"
                    handleClick={() => {}}
                /> */}
                <Button 
                    title="Login"
                    buttonStyles="text-[#ee7d6a] font-medium"
                    handleClick={() => navigate("/login")}
                />
                <Button 
                    title="Sign Up"
                    buttonStyles="min-w-[90px] py-2 bg-[#ee7d6a] rounded-lg text-white font-medium"
                    handleClick={() => navigate("/signup")}
                />
            </div>
        </div>
    )
}

export default Navbar