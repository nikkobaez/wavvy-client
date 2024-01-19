import { Button } from '../components'
import { useNavigate } from 'react-router-dom'

const Content = ({orientation, leadingTitle, endingTitle, highlightedTitle, text, image}) => {
    const navigate = useNavigate()

    return (
        <>
            {orientation === "left" ? (
                <div className='flex w-full items-center justify-center'>
                    <div className='mb-14 flex w-full max-w-[1140px] flex-col gap-8 py-14 lg:flex-row lg:gap-0'>
                        <div className='flex flex-1 flex-col items-center justify-center'>
                            <div className='flex max-w-[350px] flex-col items-start gap-5'>
                                <h2 className='text-2xl font-bold leading-normal md:text-3xl'>
                                    {leadingTitle} <span className='text-[#ee7d6a]'> {highlightedTitle} </span> {endingTitle}
                                </h2>
                                <p className='font-light text-gray-500'>
                                    {text}
                                </p>
                                <Button 
                                    title="Learn More"
                                    buttonStyles="flex items-center justify-center gap-2 px-5 py-2 bg-[#ee7d6a] rounded-lg text-white text-sm font-medium"
                                    handleClick={() => navigate("/signup")}
                                />
                            </div>
                        </div>  
                        <div className='flex flex-1 items-center justify-center'>
                            <img 
                                src={image}
                                alt="content"
                                className='max-h-[300px] w-full object-contain sm:max-w-[500px]'
                            />
                        </div>
                    </div>
                </div>
            ) : 
            (
                <div className='flex w-full items-center justify-center'>
                    <div className='flex w-full max-w-[1140px] flex-col gap-8 py-10 sm:mt-10 sm:py-14 lg:flex-row lg:gap-0'>
                        <div className='flex flex-1 items-center justify-center'>
                            <img 
                                src={image}
                                alt="content"
                                className='max-h-[300px] w-full object-contain sm:max-w-[500px]'
                            />
                        </div>
                        <div className='flex flex-1 flex-col items-center justify-center'>
                            <div className='flex max-w-[350px] flex-col items-start gap-5'>
                                <h2 className='text-2xl font-bold leading-normal md:text-3xl'>
                                    {leadingTitle} <span className='text-[#ee7d6a]'> {highlightedTitle} </span> {endingTitle}
                                </h2>
                                <p className='font-light text-gray-500'>
                                    {text}
                                </p>
                                <Button 
                                    title="Learn More"
                                    buttonStyles="flex items-center justify-center gap-2 px-5 py-2 bg-[#ee7d6a] rounded-lg text-white text-sm font-medium"
                                    handleClick={() => navigate("/signup")}
                                />
                            </div>
                        </div>  
                    </div>
                </div>
            )}
        </>
    )
}

export default Content