
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Review } from "@/types";
import StarRating from "./StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const { username, rating, comment, createdAt } = review;
  
  // Format the date as relative time (e.g., "2 months ago")
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div 
      className={cn(
        "p-4 rounded-xl bg-card border border-border/50",
        "transition-all duration-300 hover:border-border/80",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{username}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={rating} size="sm" disabled />
                <span className="text-xs text-muted-foreground">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          
          <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
