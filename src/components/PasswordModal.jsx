import { Button } from '../components'

const PasswordModal = ({detailsDispatch, handleUpdateUserInfo}) => {
    return (
        <div className='absolute left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25'>
            <div className='mx-5 flex w-full max-w-[450px] flex-col justify-between gap-4 rounded-lg bg-white p-5'>
                <div className='flex flex-col gap-2'>
                    <p className='ml-1'>
                        Please enter your password:
                    </p>
                    <input
                        type="password"
                        placeholder="Password"
                        className='rounded-lg bg-[#f8f8f8] px-4 py-2 outline-none'
                        onChange={(event) => detailsDispatch({type: "UPDATE_CURRENT_PASSWORD", payload: {currentPassword: event.target.value}}) }
                    />
                </div>

                <Button
                    title="Submit"
                    buttonStyles="w-full py-2 bg-[#ee7d6a] rounded-lg text-white font-medium"
                    handleClick={handleUpdateUserInfo}
                />
            </div>
        </div>
    )
}

export default PasswordModal