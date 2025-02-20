"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Password from "@/components/ui/password";

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
 
  const handlePassword = (newValue: string) => {
    setFormData({ ...formData, password: newValue })
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(formData.password)) {
      toast({
        description:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", formData);

      let data = response.data;
      toast({ description: data.message });
      // if (data.success) {
      //   router.push(`/update/address`);
      // }

      if (response.status === 201) {
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          // setError(result.error)
          toast({ description: result.error });
        } else {
          router.push("/update/address");
        }
      }
    } catch (response: any) {
      toast({ description: response.response.data.error });
    }
  };

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-8 text-black font-sans font-thin">
          Make the most of your professional life
        </h1>
        <div className="max-w-sm  p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-7 text-center text-black">
            Join ConnectIn
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              required
            />
            <Password value={formData.password} handlePassword={handlePassword}/>
            <p className="text-xs text-center pt-3 text-gray-400 ">
              By clicking Agree & Join or Continue, you agree to the ConnectIn
              User Agreement, Privacy Policy, and Cookie Policy.
            </p>
            <button
              type="submit"
              className="w-full text-md font-bold bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
            >
              Agree & Join
            </button>
          </form>
          <div className="mt-6 border-t pt-4 text-center text-gray-600">
            Already on ConnectIn?{" "}
            <Link href="/signin" className="text-primaryGreen hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
