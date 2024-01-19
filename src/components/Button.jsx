const Button = ({title, buttonStyles, handleClick, rightIcon}) => {
    return (
        <button className={buttonStyles} onClick={handleClick}>
            {title} {rightIcon} 
        </button>
    )
}

export default Button