'use client'
import Link from "next/link";
import { useState } from "react";
import logo from '../../public/Connectin_logo.png'
import React from 'react';
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"
import axios from 'axios';



const SignupForm = () => {

    const { toast } = useToast()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!passwordRegex.test(formData.password)){
            toast({
                description: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
              })
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast({
                description: "Password do not match"
              })
            return;
        }
        
        try {
            const response = await axios.post('api/auth/register', {
                email: formData.email,
                password: formData.password
            });

            let message = response.data.message;
            toast({description: message})
            

        } catch (response: any) {
            toast({description: response.response.data.error})
        }

        console.log("Form submitted", formData);
    };

    return (
        <>
        <div className="h-[8vh] bg-[#F4F2F0] px-[5rem] py-2">
            <Image src={logo} alt="logo" width={180}/>
        </div>
        <div className="bg-[#F4F2F0] h-[92vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-8 text-black font-sans font-thin">Make the most of your professional life</h1>
            <div className="max-w-sm  p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-7 text-center text-black">Join ConnectIn</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full text-gray-600  p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border text-gray-600  rounded-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                        required
                    />
                    <p className="text-xs text-center pt-3 text-gray-400 ">By clicking Agree & Join or Continue, you agree to the ConnectIn User Agreement, Privacy Policy, and Cookie Policy.</p>
                    <button
                        type="submit"
                        className="w-full text-md font-bold bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
                    >
                        Agree & Join
                    </button>
                </form>
                <div className="mt-6 border-t pt-4 text-center text-gray-600">
                    Already on ConnectIn? <Link href="/login" className="text-primaryGreen hover:underline">Sign in</Link>
                </div>
            </div>
        </div>
      
        </>
    );
};

export default SignupForm;
