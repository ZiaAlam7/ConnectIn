"use client";

import { useUser } from "@/context/UserContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  // if (!user) return <LoadingSpinner />;

  return <>{children}</>;
}

