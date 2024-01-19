const Icon = ({icon, borderColor, handleClick}) => {
    return (
        <div className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2`} style={{borderColor: `${borderColor}`}} onClick={handleClick}>
            {icon}
        </div>
    )
}

export default Icon