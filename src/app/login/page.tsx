"use client"

import { ArrowLeft, Eye, EyeOff, Leaf, Link, Loader2, Lock, LogIn, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import {motion} from 'motion/react';

import Image from 'next/image';

import googleImage from "@/assets/google.svg";

import axios from 'axios';
import { s } from 'motion/react-client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { set } from 'mongoose';
import { log } from 'console';


const Login = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const router = useRouter();

  const handleLogin=async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true); // ✅ Set loading to true when starting login
    try {
        await signIn('credentials',{
            email,password
        })
        setLoading(false); // ✅ Set loading to false after login attempt
    } catch (error) {
        console.error("Login failed:", error);
        setLoading(false); // ✅ Set loading to false if there's an error
    }
    
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>

       <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-green-700 mb-2"
          >
            Welcome Back
       </motion.h1>
          <p className="text-gray-600 mb-8 flex items-center">Login to SnapCart <Leaf className='w-5 h-5 text-green-600'/></p>

          <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-5 w-full max-w-sm"
          >
           

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
               onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
                />
              )}
            </div>

            {/* ✅ Register Button with Spinner */}
            {(() => {
              const isFormValid =

               email.trim() !== "" &&
               password.trim() !== "";

              return (
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${
                    isFormValid && !loading
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              );
            })()}

            {/* Divider */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
              <span className="flex-1 h-px bg-gray-200"></span>
              or
              <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200"
              // onClick={handleGoogleLogin}
            >
              <Image src={googleImage} alt="Google logo" className="w-5 h-5" />
              Continue with Google
            </button>

          </motion.form>

           {/* Sign In Link */}
          <p className="text-gray-600 cursor-pointer mt-6 text-sm flex items-center gap-1"
          onClick={()=>router.push('/register')}
          >
            Want to Create an account?

              <LogIn className="w-4 h-4" /> 
              <span className='text-green-600'>Sign Up</span>


          </p>

      
    </div>
  )
}

export default Login