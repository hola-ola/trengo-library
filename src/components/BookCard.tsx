
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book } from "@/types";
import StarRating from "./StarRating";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

const BookCard = ({
  book,
  className,
  variant = "default",
}: BookCardProps) => {
  const {
    id,
    title,
    author,
    cover,
    rating,
    isAvailable,
    genre
  } = book;
  
  // Display only primary genre for compact cards
  const primaryGenre = genre[0];
  
  if (variant === "compact") {
    return (
      <Link
        to={`/book/${id}`}
        className={cn(
          "book-card flex items-center space-x-3 p-2 rounded-lg",
          "bg-card hover:bg-card/90",
          className
        )}
      >
        <img
          src={cover}
          alt={title}
          className="h-14 w-10 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{author}</p>
        </div>
      </Link>
    );
  }
  
  if (variant === "featured") {
    return (
      <Link
        to={`/book/${id}`}
        className={cn(
          "book-card relative h-[400px] rounded-2xl overflow-hidden",
          "group transition-all duration-500",
          className
        )}
      >
        <img
          src={cover}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-start mb-2">
              <Badge 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm text-white border-white/20"
              >
                {primaryGenre}
              </Badge>
              <StarRating rating={rating} size="sm" disabled />
            </div>
            <h2 className="text-2xl font-semibold mb-1">{title}</h2>
            <p className="text-white/80">{author}</p>
            
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
              <span 
                className={cn(
                  "text-sm px-2 py-1 rounded-full",
                  isAvailable 
                    ? "bg-green-500/20 text-green-300" 
                    : "bg-red-500/20 text-red-300"
                )}
              >
                {isAvailable ? "Available" : "Rented"}
              </span>
              <span className="text-white/60 text-sm">
                View details
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <Link
      to={`/book/${id}`}
      className={cn(
        "book-card flex flex-col rounded-xl overflow-hidden bg-card",
        "border border-border/40 hover:border-border/80",
        className
      )}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant="outline" 
            className="bg-white/70 backdrop-blur-sm text-foreground border-white/20"
          >
            {primaryGenre}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-base mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{author}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <StarRating rating={rating} size="sm" disabled />
          <span 
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              isAvailable 
                ? "bg-green-500/10 text-green-700" 
                : "bg-red-500/10 text-red-700"
            )}
          >
            {isAvailable ? "Available" : "Rented"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
