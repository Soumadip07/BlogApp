import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Container, Input, Loader, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import robot from '../assets/Art.svg';
import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg';
import git from '../assets/github.svg';
import { account } from '../appwrite/auth'
import ErrorBoundary from './ErrorHandler'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("")
        setLoading(true);
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
            const result = await account.getPrefs();
            console.log("Result ===>", result)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }
    const handleGoogleLogin = (e) => {
        e.preventDefault();
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
    const facebookAuth = (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);
        try {
            account.createOAuth2Session(
                "facebook",
                "http://localhost:5173",
                "http://localhost:5173/login"
            );
        } catch (e) {
            setError(e.message)
        }
        setLoading(false);
    };
    const GitAuth = (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);
        try {
            account.createOAuth2Session(
                "github",
                "http://localhost:5173",
                "http://localhost:5173/login"
            );
        } catch (e) {
            setError(e.message)
        }
        setLoading(false);
    };

    return (
        <ErrorBoundary>
            <Container>
                <div className={`flex mx-auto w-full h-screen bg-gray-100 rounded-xl overflow-hidden mb-4`}>
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
                        <h2 className="text-2xl font-bold leading-tight text-center">Sign in to your account</h2>
                        <p className="mt-2 text-base text-center text-black/60">
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-medium transition-all duration-200 text-primary hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
                        {loading ? (
                            <div className="flex justify-center w-full">
                                <Loader />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(login)} className='mt-8 mb-4'>
                                <div className='space-y-5'>
                                    <Input
                                        label="Email: "
                                        placeholder="Enter your email"
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                            validate: {
                                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Email address must be a valid address",
                                            }
                                        })}
                                    />
                                    <Input
                                        label="Password: "
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >Sign in</Button>
                                </div>
                            </form>
                        )}
                        <div className='gap-3 d-flex'>
                            <Button
                                onClick={(e) => handleGoogleLogin(e)}
                                className="flex items-center justify-center w-full text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out bg-white rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <img src={google} alt="google" className="" />
                            </Button>
                            <Button
                                onClick={(e) => facebookAuth(e)}
                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <img src={facebook} alt="google" className="" />
                            </Button>
                            <Button
                                onClick={(e) => GitAuth(e)}
                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <img src={git} alt="google" className="" />
                            </Button>
                        </div>

                    </div>
                </div>
            </Container >
        </ErrorBoundary>
    )
}

export default Login