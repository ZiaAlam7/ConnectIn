"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import axios from "axios";
import Password from "@/components/ui/password";

const ForgotPassword = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [password, setPassword] = useState('');
 
  const handlePassword = (newValue: string) => {
    setPassword(newValue)
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      toast({
        description:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    // try {
    //   const response = await axios.post("/api/auth/register", formData);

    //   let data = response.data;
    //   toast({ description: data.message });
    //   if (data.success) {
    //     router.push(`/update/address`);
    //   }

    //   if (response.status === 201) {
    //     const result = await signIn("credentials", {
    //       redirect: false,
    //       email: formData.email,
    //       password: formData.password,
    //     });

    //     if (result?.error) {
    //       // setError(result.error)
    //       toast({ description: result.error });
    //     } else {
    //       router.push("/update/address");
    //     }
    //   }
    // } catch (response: any) {
    //   toast({ description: response.response.data.error });
    // }
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
            <label>Password</label>
            <Password value={password} handlePassword={handlePassword}/>
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
