import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/firebase'
import { Button, Footer, Navbar } from '../components'

const Signup = () => {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async (event) => {
        event.preventDefault()
        try {   
            await signup(displayName, email, password, setError, error)

            if (error === false) {
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <Navbar />
            <div className='flex w-full items-center justify-center bg-[#f5f5f5]'>
                <div className='mx-5 my-20 flex w-full max-w-[450px] rounded-lg bg-white'>
                    <form className='flex w-full flex-col items-start gap-6 px-10 py-8'>
                        <h2 className='text-2xl font-medium'>
                            Sign Up For A New Account
                        </h2>
                        <input 
                            type='text'
                            placeholder='Display Name'
                            className='w-full rounded-lg bg-[#f8f8f8] px-3 py-2 outline-none'
                            onChange={(event) => setDisplayName(event.target.value)}
                        /> 
                        <input 
                            type='text'
                            placeholder='Email'
                            className='w-full rounded-lg bg-[#f8f8f8] px-3 py-2 outline-none'
                            onChange={(event) => setEmail(event.target.value)}
                        /> 
                        <input 
                            type='password'
                            placeholder='Password'
                            className='w-full rounded-lg bg-[#f8f8f8] px-3 py-2 outline-none'
                            onChange={(event) => setPassword(event.target.value)}
                        /> 
                        <Button
                            title="Sign Up"
                            buttonStyles="w-full py-2 bg-[#ee7d6a] rounded-lg text-white font-medium"
                            handleClick={handleSignUp}
                        />
                        {/* <div className='flex w-full items-center justify-center gap-3 text-center'>
                            <div className='w-full border border-[#f8f8f8]'/>
                            <p className='text-gray-300'> 
                                OR 
                            </p>
                            <div className='w-full border border-[#f8f8f8]'/>
                        </div>  
                        <div className='relative flex w-full cursor-pointer items-center rounded-lg bg-[#f4f1f4] px-3 py-2' onClick={handleGoogle}>
                            <img 
                                src={Google}
                                alt="google"
                                className='absolute h-5 w-5 object-contain'
                            />
                            <p className='w-full text-center font-medium text-[#65656C]'>
                                Sign up with Google
                            </p>
                        </div>
                        <div className='relative flex w-full cursor-pointer items-center rounded-lg bg-[#297ff8] px-3 py-2'>
                            <img 
                                src={Facebook}
                                alt="facebook"
                                className='absolute mb-1 h-7 w-5 object-cover'
                            />
                            <p className='w-full text-center font-medium text-white'>
                                Sign up  with Facebook
                            </p>
                        </div>
                        <div className='relative flex w-full cursor-pointer items-center rounded-lg bg-black px-3 py-2'>
                            <img 
                                src={Apple}
                                alt="apple"
                                className='absolute h-6 w-6 object-contain'
                            />
                            <p className='w-full text-center font-medium text-white'>
                                Sign up  with Apple
                            </p>
                        </div> */}
                        <p className='w-full text-center'>
                            Already have an account? <span className='cursor-pointer text-[#ee7d6a]' onClick={() => navigate("/login")}> Login </span>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup