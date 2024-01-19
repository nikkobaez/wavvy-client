import { useNavigate } from 'react-router-dom'
import { FaArrowRight, Meeting } from '../assets'
import { Button } from '../components'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <div className='px-5 py-10'>
            <div className='flex w-full flex-col items-center justify-center gap-6'>
                <h1 className='max-w-[500px] text-center text-[26px] font-bold leading-normal md:max-w-[625px] md:text-4xl'> 
                    Connect, Chat, and Collaborate: Where Friends and Family Come <span className='text-[#ee7d6a]'>Together</span>
                </h1>
                <p className='max-w-[450px] text-center font-light text-gray-500 md:max-w-[600px]'> 
                    Engage in heartfelt chats and embark on collaborative ventures that 
                    transcend distances. Wavvy is more than just a simple chat platform; 
                    it's a space where relationships deepen, laughter echoes, and memories 
                    are crafted.
                </p>
                <Button 
                    title="Sign Up"
                    buttonStyles="flex items-center justify-center gap-2 px-5 py-2 bg-[#ee7d6a] rounded-lg text-white text-sm font-medium"
                    handleClick={() => navigate("/signup")}
                    rightIcon={<FaArrowRight size={16} color="white"/>}
                />
                <img 
                    src={Meeting}
                    alt="wavvy logo"
                    className='-z-10 w-full object-contain sm:max-w-[600px]'
                />
            </div>
        </div>
    )
}

export default Hero