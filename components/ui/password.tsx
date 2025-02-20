import React, { useState } from "react";

interface PasswordInputProps {
  value: string;
  handlePassword: (value: string) => void;
}

const Password: React.FC<PasswordInputProps> = ({ value, handlePassword }) => {
  const [hide, setHide] = useState<boolean>(true);

  return (
    <div className="bg-white flex items-center gap-1 border p-2 rounded-md focus:outline-none group focus-within:ring-1 focus-within:ring-primaryGreen">
      <input
        type={hide ? "password" : "text"}
        name="password"
        placeholder="Password"
        value={value}
        onChange={(e) => {
          handlePassword(e.target.value);
        }}
        className="w-full text-gray-600  focus:outline-none"
        required
      />
      <div className="w-auto cursor-pointer" onClick={() => setHide(!hide)}>
        {hide ? "Show" : "Hide"}
      </div>
    </div>
  );
};

export default Password;
