import React, { useState } from 'react'
import authService, { account } from '../appwrite/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Container, Input, Loader, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import robot from '../assets/Art.svg';
import google from '../assets/google.svg'
// import { account } from '../appwrite/auth.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false);

    const create = async (data) => {
        setError("")
        setLoading(true);
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false);
    }

    const handleGoogleLogin = (e) => {
        setError("")
        setLoading(true);
        // try {
        //     await authService.loginAuth()
        // }
        // catch (error) {
        //     console.log(error)
        //     setError(error.message)
        // }
        // setLoading(false);
        try {
            account.createOAuth2Session(
                "google",
                "http://localhost:5173/",
                "http://localhost:5173/login"
            );
        } catch (e) {
            setError(e.message)
        }
        setLoading(false);
    }
    return (
        <Container>
            <div className={`flex mx-auto w-full h-screen bg-gray-100 rounded-xl overflow-hidden`}>
                {/* Left Container */}
                <div className="flex flex-col items-center justify-center w-1/2 p-10 bg-primary-blue ">
                    <h2 className="mb-5 text-4xl font-bold text-white">Welcome aboard my friend</h2>
                    <p className="mb-10 text-center text-white">
                        Just a couple of clicks and we start!
                    </p>
                    <img src={robot} alt="Signup" className="w-full h-auto" />
                </div>

                {/* Right Container */}
                <div className="flex flex-col items-center justify-center w-1/2 p-10">
                    <div className="flex justify-center">
                        <span className="inline-block w-full ">
                            <Logo width="100px" />
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-center">Sign up to create an account</h2>
                    <p className="mt-2 text-base text-center text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium transition-all duration-200 text-primary hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="mt-8 text-center text-red-600">{error}</p>}
                    {loading ? (
                        <div className="flex justify-center w-full">
                            <Loader />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(create)} className="w-full max-w-md mb-3">
                            <div className='space-y-5'>
                                <Input
                                    label="Full Name: "
                                    placeholder="Enter your full name"
                                    {...register("name", { required: true })}
                                />
                                <Input
                                    label="Email: "
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPattern: (value) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        },
                                    })}
                                />
                                <Input
                                    label="Password: "
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", { required: true })}
                                />
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                            </div>
                        </form>
                    )}
                    {/* <div>
                        <Button onClick={(e) => handleGoogleLogin(e)}
                        >
                            <img src={google} alt='google' className='' />
                        </Button>
                    </div> */}
                </div>
            </div>

        </Container>
    )
}

export default Signup