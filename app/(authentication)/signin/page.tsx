"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Password from "@/components/ui/password";
import Image from "next/image";
import google_logo from "@/public/google_logo.png";

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlePassword = (newValue: string) => {
    setFormData({ ...formData, password: newValue });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/home",
      });
    } catch (error: any) {
      toast({ description: error });
    }
  };

  const handleGoogleSignin = () => {
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] flex flex-col pt-[5rem] items-center">
        <h1 className="text-4xl mb-8 text-black font-sans font-thin">
          Welcome Back
        </h1>
        <div className="max-w-sm  p-6 bg-white shadow-lg rounded-lg min-w-[25rem]">
          <h2 className="text-3xl font-bold mb-8  text-black">Sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              required
            />
            <Password
              value={formData.password}
              handlePassword={handlePassword}
            />
            <div>
              <Link
                href="/forgot-password"
                className="text-primaryGreen hover:underline font-[600]"
              >
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-md font-bold bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
            >
              Sign in
            </button>
          </form>
          <div className="text-center my-4">or</div>
          <div className=" flex justify-center">
            <Image
              src={google_logo}
              alt="google-logo"
              width={50}
              className="border border-gray-300"
            />
            <button
              onClick={handleGoogleSignin}
              className="bg-blue-600  text-white px-2 "
            >
              Sign in with google
            </button>
          </div>
          <div className="mt-6 border-t pt-4 text-center text-gray-600">
            New to ConnectIn?{" "}
            <Link href="/signup" className="text-primaryGreen hover:underline">
              Sign Up
            </Link>{" "}
            now
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
