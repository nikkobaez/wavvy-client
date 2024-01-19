import { useNavigate } from 'react-router-dom'
import { FaArrowRight, Feature } from '../assets'
import { Button } from '../components'

const Banner = () => {
    const navigate = useNavigate()
    
    return (
        <div className='mt-10 flex w-full items-center justify-center px-5' style={{background: 'linear-gradient(to bottom, white 50%, #f5f5f5 50%)'}}>
            <div className='flex w-full max-w-[1140px] rounded-[30px] bg-[#ee7d6a] py-10 sm:rounded-[50px]'>
                <div className='flex flex-1 items-center justify-center'>
                    <img 
                        src={Feature}
                        alt="content"
                        className='max-h-[400px] object-contain'
                    />
                </div>
                <div className='flex flex-1 flex-col items-start justify-center gap-5'>
                    <h2 className='text-2xl font-bold leading-normal text-white sm:text-4xl'>
                        Want To Stay Connected?
                    </h2>
                    <Button 
                        title="Try it Now"
                        buttonStyles="flex items-center justify-center gap-2 px-5 py-2 text-[#ee7d6a] bg-white rounded-lg text-sm font-medium"
                        handleClick={() => navigate("/signup")}
                        rightIcon={<FaArrowRight size={16} color="#ee7d6a"/>}
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner