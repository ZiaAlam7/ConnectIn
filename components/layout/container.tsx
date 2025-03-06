import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("w-full max-w-[75%] mx-auto px-4 sm:px-6", className)}>{children}</div>
}

