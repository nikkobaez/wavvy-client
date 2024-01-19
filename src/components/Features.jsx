import { useNavigate } from 'react-router-dom'
import { FaArrowRight, TbLocationFilled, FaSmile, GoClockFill, FaLock } from '../assets'
import { Button, Feature } from '../components'

const Features = () => {
    const navigate = useNavigate()

    return (
        <div className='z-10 -mt-[60px] flex w-full items-center justify-center bg-[#ee7d6a]'>
            <div className='flex h-full w-full max-w-[1140px] flex-col gap-8 px-5 py-10 lg:flex-row lg:gap-0'>
                <div className='flex flex-1 items-center justify-center sm:justify-start'>
                    <div className='flex max-w-[450px] flex-col items-start gap-5'>
                        <h2 className='text-2xl font-bold leading-normal text-white sm:text-3xl'>
                            Why you should choose Wavvy
                        </h2>
                        <p className='font-light text-white'>
                            We can help you build your relationship with friends and family and 
                            create moments that overcome the challenges of distance
                        </p>
                        <Button 
                            title="Try it Now"
                            buttonStyles="flex items-center justify-center gap-2 px-5 py-2 text-[#ee7d6a] bg-white rounded-lg text-sm font-medium"
                            handleClick={() => navigate("/signup")}
                            rightIcon={<FaArrowRight size={16} color="#ee7d6a"/>}
                        />
                    </div>
                </div>

                <div className='flex flex-1 items-center justify-center py-5 sm:justify-start sm:py-10'>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                        <Feature 
                            icon={<TbLocationFilled size={28} color="#40666F"/>}
                            title="Faster"
                            text="We have a fast server and can help you quickly connect"
                            containerStyles='h-64 min-w-[250px] flex-1 rounded-b-[50px] rounded-tl-[50px] bg-[#f09284] overflow-hidden flex justify-center items-center flex-col gap-4 px-6'

                        />

                        <Feature 
                            icon={<FaSmile size={30} color="#40666F"/>}
                            title="Easy To Use"
                            text="Designed and built simple so it is easy to use for anyone"
                            containerStyles='h-64 min-w-[250px] flex-1 rounded-t-[50px] rounded-bl-[50px] bg-[#f09284] overflow-hidden flex justify-center items-center flex-col gap-4 px-6'

                        />    

                        <Feature 
                            icon={<GoClockFill size={30} color="#40666F"/>}
                            title="Real Time"
                            text="Receive notifications from your friends and family instantly"
                            containerStyles='h-64 min-w-[250px] flex-1 rounded-b-[50px] rounded-tr-[50px] bg-[#f09284] overflow-hidden flex justify-center items-center flex-col gap-4 px-6'

                        />    

                        <Feature 
                            icon={<FaLock size={28} color="#40666F"/>}
                            title="Safety & Privacy"
                            text="Enjoy knowing your data is safe when you connect"
                            containerStyles='h-64 min-w-[250px] flex-1 rounded-t-[50px] rounded-br-[50px] bg-[#f09284] overflow-hidden flex justify-center items-center flex-col gap-4 px-6'
                        />    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features