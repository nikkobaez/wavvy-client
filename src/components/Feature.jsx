const Feature = ({icon, title, text, containerStyles}) => {
    return (
        <div className={containerStyles}>
            <div className='flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white'>
                {icon}
            </div>
            <h3 className='text-lg text-white'>
                {title}
            </h3>
            <p className='text-center font-thin text-white'>
                {text}
            </p>
        </div>
    )
}

export default Feature