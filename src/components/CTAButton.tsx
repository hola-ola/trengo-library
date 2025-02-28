
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  className?: string;
}

const CTAButton = ({
  variant = "primary",
  size = "default",
  children,
  className,
  ...props
}: CTAButtonProps) => {
  return (
    <Button
      className={cn(
        "cta-button font-medium transition-all duration-300",
        variant === "primary" 
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-secondary text-foreground hover:bg-secondary/80",
        size === "sm" ? "text-sm px-4 py-1" : 
        size === "lg" ? "text-base px-8 py-6" : "text-sm px-6 py-5",
        "rounded-xl shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CTAButton;
