
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import Header from "@/components/Header";
import StarRating from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import CTAButton from "@/components/CTAButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, CalendarDays, Hash } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, getReviewsForBook, rentBook, loading } = useBooks();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const book = getBookById(id as string);
  const reviews = getReviewsForBook(id as string);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleRentBook = () => {
    if (book?.isAvailable) {
      setIsAnimating(true);
      rentBook(book.id);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="text-center mt-24">
          <h2 className="text-2xl font-semibold mb-4">Book not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Book Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 animate-slide-up">
            {/* Book Cover */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-border/50 shadow-md">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-6 space-y-4">
                <CTAButton 
                  variant="primary" 
                  className="w-full"
                  onClick={handleRentBook}
                  disabled={!book.isAvailable || loading}
                >
                  {book.isAvailable 
                    ? loading 
                      ? "Processing..." 
                      : "Rent this Book"
                    : "Currently Unavailable"
                  }
                </CTAButton>
                
                <Link to="/submit-review" state={{ bookId: book.id }}>
                  <CTAButton 
                    variant="secondary" 
                    className="w-full"
                  >
                    Submit a Review
                  </CTAButton>
                </Link>
              </div>
            </div>
            
            {/* Book Info */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="flex flex-wrap gap-2 mb-4">
                {book.genre.map((genre, index) => (
                  <Badge key={index} className="bg-secondary text-foreground">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-6">
                <StarRating rating={book.rating} size="lg" disabled />
                <span className="ml-2 text-muted-foreground">
                  {book.rating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">{book.description}</p>
                
                <Separator />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm flex items-center">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      Published
                    </span>
                    <span className="font-medium">{book.yearPublished}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm flex items-center">
                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                      Pages
                    </span>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm flex items-center">
                      <Hash className="h-3.5 w-3.5 mr-1" />
                      ISBN
                    </span>
                    <span className="font-medium">{book.isbn}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Status
                    </span>
                    <span className={`font-medium ${book.isAvailable ? "text-green-600" : "text-red-600"}`}>
                      {book.isAvailable ? "Available" : "Rented"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-16 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Reader Reviews</h2>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-secondary/50 rounded-xl">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review this book!
                </p>
                <Link to="/submit-review" state={{ bookId: book.id }} className="mt-4 inline-block">
                  <CTAButton variant="primary">Write a Review</CTAButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
