"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/dropdown";
import { getSession } from "next-auth/react";
import { countries } from "@/constants/countriesConstants";

const AddressPage = () => {

  // const countries = [
  //   "Afghanistan",
  //   "Albania",
  //   "Algeria",
  //   "Andorra",
  //   "Angola",
  //   "Antigua and Barbuda",
  //   "Argentina",
  //   "Armenia",
  //   "Australia",
  //   "Austria",
  //   "Azerbaijan",
  //   "Bahamas",
  //   "Bahrain",
  //   "Bangladesh",
  //   "Barbados",
  //   "Belarus",
  //   "Belgium",
  //   "Belize",
  //   "Benin",
  //   "Bhutan",
  //   "Bolivia",
  //   "Bosnia and Herzegovina",
  //   "Botswana",
  //   "Brazil",
  //   "Brunei",
  //   "Bulgaria",
  //   "Burkina Faso",
  //   "Burundi",
  //   "Cabo Verde",
  //   "Cambodia",
  //   "Cameroon",
  //   "Canada",
  //   "Central African Republic",
  //   "Chad",
  //   "Chile",
  //   "China",
  //   "Colombia",
  //   "Comoros",
  //   "Congo (Congo-Brazzaville)",
  //   "Costa Rica",
  //   "Croatia",
  //   "Cuba",
  //   "Cyprus",
  //   "Czechia (Czech Republic)",
  //   "Democratic Republic of the Congo",
  //   "Denmark",
  //   "Djibouti",
  //   "Dominica",
  //   "Dominican Republic",
  //   "Ecuador",
  //   "Egypt",
  //   "El Salvador",
  //   "Equatorial Guinea",
  //   "Eritrea",
  //   "Estonia",
  //   "Eswatini (Swaziland)",
  //   "Ethiopia",
  //   "Fiji",
  //   "Finland",
  //   "France",
  //   "Gabon",
  //   "Gambia",
  //   "Georgia",
  //   "Germany",
  //   "Ghana",
  //   "Greece",
  //   "Grenada",
  //   "Guatemala",
  //   "Guinea",
  //   "Guinea-Bissau",
  //   "Guyana",
  //   "Haiti",
  //   "Honduras",
  //   "Hungary",
  //   "Iceland",
  //   "India",
  //   "Indonesia",
  //   "Iran",
  //   "Iraq",
  //   "Ireland",
  //   "Israel",
  //   "Italy",
  //   "Jamaica",
  //   "Japan",
  //   "Jordan",
  //   "Kazakhstan",
  //   "Kenya",
  //   "Kiribati",
  //   "Kuwait",
  //   "Kyrgyzstan",
  //   "Laos",
  //   "Latvia",
  //   "Lebanon",
  //   "Lesotho",
  //   "Liberia",
  //   "Libya",
  //   "Liechtenstein",
  //   "Lithuania",
  //   "Luxembourg",
  //   "Madagascar",
  //   "Malawi",
  //   "Malaysia",
  //   "Maldives",
  //   "Mali",
  //   "Malta",
  //   "Marshall Islands",
  //   "Mauritania",
  //   "Mauritius",
  //   "Mexico",
  //   "Micronesia",
  //   "Moldova",
  //   "Monaco",
  //   "Mongolia",
  //   "Montenegro",
  //   "Morocco",
  //   "Mozambique",
  //   "Myanmar (Burma)",
  //   "Namibia",
  //   "Nauru",
  //   "Nepal",
  //   "Netherlands",
  //   "New Zealand",
  //   "Nicaragua",
  //   "Niger",
  //   "Nigeria",
  //   "North Korea",
  //   "North Macedonia",
  //   "Norway",
  //   "Oman",
  //   "Pakistan",
  //   "Palau",
  //   "Palestine",
  //   "Panama",
  //   "Papua New Guinea",
  //   "Paraguay",
  //   "Peru",
  //   "Philippines",
  //   "Poland",
  //   "Portugal",
  //   "Qatar",
  //   "Romania",
  //   "Russia",
  //   "Rwanda",
  //   "Saint Kitts and Nevis",
  //   "Saint Lucia",
  //   "Saint Vincent and the Grenadines",
  //   "Samoa",
  //   "San Marino",
  //   "Sao Tome and Principe",
  //   "Saudi Arabia",
  //   "Senegal",
  //   "Serbia",
  //   "Seychelles",
  //   "Sierra Leone",
  //   "Singapore",
  //   "Slovakia",
  //   "Slovenia",
  //   "Solomon Islands",
  //   "Somalia",
  //   "South Africa",
  //   "South Korea",
  //   "South Sudan",
  //   "Spain",
  //   "Sri Lanka",
  //   "Sudan",
  //   "Suriname",
  //   "Sweden",
  //   "Switzerland",
  //   "Syria",
  //   "Taiwan",
  //   "Tajikistan",
  //   "Tanzania",
  //   "Thailand",
  //   "Timor-Leste",
  //   "Togo",
  //   "Tonga",
  //   "Trinidad and Tobago",
  //   "Tunisia",
  //   "Turkey",
  //   "Turkmenistan",
  //   "Tuvalu",
  //   "Uganda",
  //   "Ukraine",
  //   "United Arab Emirates",
  //   "United Kingdom",
  //   "United States",
  //   "Uruguay",
  //   "Uzbekistan",
  //   "Vanuatu",
  //   "Vatican City",
  //   "Venezuela",
  //   "Vietnam",
  //   "Yemen",
  //   "Zambia",
  //   "Zimbabwe",
  // ];
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
      <div className="bg-[#F4F2F0] h-[92vh] flex flex-col items-center pt-[5rem]">
        <h1 className="text-4xl mb-8 text-black font-sans font-thin">
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
