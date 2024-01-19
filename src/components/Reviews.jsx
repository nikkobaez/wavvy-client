import { useState } from 'react'
import { IoMdArrowBack, IoMdArrowForward } from '../assets'
import { reviews } from '../constants/index'

const Reviews = () => {
    const [sliderIndex, setSliderIndex] = useState(0)

    const handleClick = (direction) => {
        if (direction === "left") {
            if (sliderIndex === 0) {
                return
            } else {
                setSliderIndex(sliderIndex - 1)
            }
        } else {
            if (sliderIndex === reviews.length - 2) {
                return
            } else {
                setSliderIndex(sliderIndex + 1)
            }
        }
    }

    return (
        <div className='mb-24 mt-5 hidden w-full items-center justify-center lg:flex'>
            <div className='flex w-full max-w-[1140px] flex-col'>
                <div className='mx-5 flex items-center justify-between'>
                    <h2 className='text-3xl font-bold leading-normal'>
                        What Are Users Are Saying
                    </h2>
                    <div className='flex gap-6'>
                        <div className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-in-out' style={{background: sliderIndex === 0 ? '#ebebeb' : '#ee7d6a'}} onClick={() => handleClick("left")}>
                            <IoMdArrowBack size={28} color={sliderIndex === 0 ? "#afafaf" : "white"}/>
                        </div>
                        <div className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-in-out' style={{background: sliderIndex === reviews.length - 2 ? '#ebebeb' : '#ee7d6a'}} onClick={() => handleClick("right")}>
                            <IoMdArrowForward size={28} color={sliderIndex === reviews.length - 2 ? "#afafaf" : "white"}/>
                        </div>
                    </div>
                </div>
                
                <div className='flex w-full items-center justify-between gap-[3.9%] overflow-hidden'>
                    {reviews.map((review) => (
                        <div key={review.id} className='my-10 flex h-72 min-w-[48%] flex-col gap-4 rounded-t-[50px] rounded-br-[50px] bg-[#f3f3f3] p-8 transition-all duration-[1500ms] ease-in-out lg:h-64' style={{ transform: `translateX(-${sliderIndex * 108}%`}}>
                            <div className='flex gap-6'>
                                <img 
                                    src={review.profileImage}
                                    alt="profile"
                                    className='h-14 w-14 rounded-full object-cover'
                                />
                                <div>
                                    <h3 className='text-lg font-medium text-[#162945]'> 
                                        {review.fullName}
                                    </h3>
                                    <p className='text-[#8a8e97]'>
                                        {review.jobTitle}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#3b3a3a]">
                                {review.reviewText}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Reviews