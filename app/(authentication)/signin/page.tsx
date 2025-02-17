"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      // setError(result.error)
      toast({ description: result.error });
    } else {
      router.push("/home");
    }

  };

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] flex flex-col pt-[5rem] items-center">
        <h1 className="text-4xl mb-8 text-black font-sans font-thin">
          Welcome Back
        </h1>
        <div className="max-w-sm  p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-8  text-black">Sign in</h2>
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
            {/* <p className="text-xs text-center pt-3 text-gray-400 ">By clicking Agree & Join or Continue, you agree to the ConnectIn User Agreement, Privacy Policy, and Cookie Policy.</p> */}
            <button
              type="submit"
              className="w-full text-md font-bold bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
            >
              Sign in
            </button>
          </form>
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
