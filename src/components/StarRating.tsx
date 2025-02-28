
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
  disabled?: boolean;
  className?: string;
}

const StarRating = ({
  rating = 0,
  maxRating = 5,
  size = "md",
  onChange,
  disabled = false,
  className,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const starSize = sizeMap[size];
  
  return (
    <div 
      className={cn(
        "flex items-center space-x-1",
        disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
        className
      )}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isActive = 
          (!disabled && hoverRating >= starValue) || 
          (hoverRating === 0 && rating >= starValue);
        
        return (
          <div
            key={`star-${index}`}
            onMouseEnter={() => !disabled && setHoverRating(starValue)}
            onMouseLeave={() => !disabled && setHoverRating(0)}
            onClick={() => !disabled && onChange?.(starValue)}
            className={cn(
              "transition-all duration-200",
              !disabled && "hover:scale-110"
            )}
          >
            <Star
              size={starSize}
              fill={isActive ? "currentColor" : "transparent"}
              className={cn(
                "transition-colors duration-200",
                isActive ? "text-amber-400" : "text-gray-300"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
