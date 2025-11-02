"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/dropdown";
import { getSession } from "next-auth/react";
import { countries } from "@/constants/countriesConstants";

const AddressPage = () => {

  const { toast } = useToast();
  const router = useRouter();

  const [address, setAddress] = useState({
    country: "",
    city: "",
  });
  const [session, setSession] = useState<any>(null);
  const [name, setName] = useState("{name}")

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
      if (session?.user?.first_name) {
        setName(session.user.first_name);
      }
      if (session?.user?.name) {
        setName(session.user.name);
      }
    });
  }, []);


  const isFormComplete = Object.values(address).every(
    (value) => value.trim() !== ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      toast({
        description: "Please fill all fields before continuing.",
      });
      return;
    }

    const savedUserDetail = localStorage.getItem("userDetail");
    let existingData = savedUserDetail ? JSON.parse(savedUserDetail) : {};
    localStorage.setItem(
      "userDetail",
      JSON.stringify({ ...existingData, address })
    );
    router.push(`/update/education`);
  };

  const handleSkip = () => {
    const storedUserDetail = localStorage.getItem("userDetail");

    if (storedUserDetail) {
      const removeUserDetail = JSON.parse(storedUserDetail);
      removeUserDetail.address = {};
      localStorage.setItem("userDetail", JSON.stringify(removeUserDetail));
      router.push(`/update/education`);
    }
    else{
      router.push(`/update/education`);
    }
  };

  return (
    <>
      <div className="bg-[#F4F2F0] h-[92vh] max-h-auto flex flex-col items-center pt-[5rem]">
        <h1 className="sm:text-4xl text-2xl mb-8 text-black font-sans font-thin text-center">
          Welcome, {name}! What's your location?
        </h1>
        <p>See people, news and jobs in your area</p>
        <div className="w-[80%] md:w-[40%]  p-6">
          <form onSubmit={handleSubmit}>
            <div>
              <Dropdown
                options={countries}
                label={"Country"}
                local={address.country}
                onSelect={(selected) =>
                  setAddress({ ...address, country: selected })
                }
              />
            </div>
            <div className="mt-4">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="w-[5rem] font-bold mt-[2rem] py-2 rounded-md hover:bg-gray-300 transition"
                onClick={handleSkip}
              >
                Skip
              </button>
              <button
                type="submit"
                className="w-full text-lg font-bold mt-2 bg-primaryGreen text-white py-3 rounded-full hover:bg-primaryDark transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
