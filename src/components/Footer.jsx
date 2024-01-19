import { useNavigate } from "react-router-dom"
import { Logo, MdOutlineMailOutline, MdPhoneAndroid } from "../assets"
import { footerLinks } from "../constants"

const Footer = () => {
    const navigate = useNavigate()

    return (
        <div className='flex w-full items-center justify-center bg-[#f5f5f5] px-6 pb-10 pt-20'>
            <div className='flex w-full max-w-[1140px] flex-col justify-between gap-10 sm:flex-row'>
                <div className="flex-1">
                    <div className='mr-2 flex w-fit cursor-pointer items-center gap-2'>
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
                    <div className="mt-7 flex flex-col gap-6">
                        <div className="flex gap-2">
                            <MdOutlineMailOutline size={25} />
                            <p> support@wavvy.com </p>
                        </div>
                        <div className="flex gap-2">
                            <MdPhoneAndroid size={25} />
                            <p> +1 832-392-2426 </p>
                        </div>
                    </div>
                </div>

                <div className="flex-2 mt-5 flex flex-wrap gap-8 gap-y-12 sm:mt-0">
                    {footerLinks.map((item) => (
                        <div key={item.title} className="flex min-w-[120px] flex-col">
                            <h4 className="font-medium text-[#3b3b3b]">
                                {item.title}
                            </h4>
                            <div className="mt-8 flex flex-col gap-6">
                                {item.links.map((link) => (
                                    <p key={link.title} className="w-fit cursor-pointer text-[#3b3a3a]" onClick={() => navigate(link.url)}> 
                                        {link.title} 
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer