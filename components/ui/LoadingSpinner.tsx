// components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center flex-col bg-white z-50">
    <div className="pb-10"><img src="/ConnectIn icon.jpg" alt="ConnectIn Logo" className="h-8 w-8 rounded" /></div>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--mainGreen)] " />
  </div>
);

export default LoadingSpinner;
