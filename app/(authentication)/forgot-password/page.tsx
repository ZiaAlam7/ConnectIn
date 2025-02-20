"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const ForgotPassword = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/forgot-pass", { email });
      let data = response.data;
      toast({ description: data.message ? data.message : data.error });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] flex flex-col pt-[5rem] items-center ">
        <h1 className="text-4xl mb-8 text-black font-sans font-thin">
          Forgot Password
        </h1>
        <div className="max-w-sm  p-6 bg-white shadow-lg rounded-lg min-w-[25rem]">
          {/* <h2 className="text-3xl font-bold mb-8  text-black">Sign in</h2> */}
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Please Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              required
            />
            <button
              type="submit"
              className="w-full text-md font-bold bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
            >
              Submit
            </button>
          </form>
          <div className="mt-6 border-t pt-4 text-center text-gray-600">
            Back to?{" "}
            <Link href="/signin" className="text-primaryGreen hover:underline">
              Sign In
            </Link>{" "}
            page
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
