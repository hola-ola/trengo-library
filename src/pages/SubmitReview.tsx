
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import Header from "@/components/Header";
import StarRating from "@/components/StarRating";
import CTAButton from "@/components/CTAButton";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SubmitReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getBookById, submitReview, loading } = useBooks();
  
  // Get bookId from location state if available
  const bookIdFromState = location.state?.bookId;
  
  const [bookId, setBookId] = useState<string | number>(bookIdFromState || "");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const book = bookId ? getBookById(bookId) : null;
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookId || rating === 0 || !comment.trim()) {
      // Show validation errors
      return;
    }
    
    // Convert bookId to number if it's a string
    const numericBookId = typeof bookId === 'string' ? parseInt(bookId, 10) : bookId;
    
    // Submit the review
    submitReview(numericBookId, rating, comment);
    
    // Navigate back to the book page after a brief delay
    setTimeout(() => {
      navigate(`/book/${bookId}`);
    }, 800);
  };
  
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="pt-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-slide-down">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Submit Your Review
            </h1>
            <p className="text-muted-foreground">
              Share your thoughts about the book and help other readers make informed decisions.
            </p>
          </div>
          
          <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6 md:p-8 animate-scale-in">
            <form onSubmit={handleSubmit}>
              {/* Book Selection (show only if no book is pre-selected) */}
              {!bookIdFromState && (
                <div className="mb-8">
                  <label htmlFor="bookId" className="block text-sm font-medium mb-2">
                    Select a Book
                  </label>
                  <select
                    id="bookId"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="">-- Select a book --</option>
                    {/* This would be dynamically populated from available books */}
                    <option value="1">The Design of Everyday Things</option>
                    <option value="2">Steve Jobs</option>
                    <option value="3">Thinking, Fast and Slow</option>
                    <option value="4">Dune</option>
                    <option value="5">The Lean Startup</option>
                    <option value="6">Sapiens: A Brief History of Humankind</option>
                  </select>
                </div>
              )}
              
              {/* Selected Book Display */}
              {book && (
                <div className="mb-8 p-4 bg-secondary/50 rounded-lg animate-fade-in">
                  <BookCard book={book} variant="compact" />
                </div>
              )}
              
              {/* Rating */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex items-center">
                  <StarRating
                    rating={rating}
                    onChange={setRating}
                    size="lg"
                  />
                  <span className="ml-4 text-muted-foreground">
                    {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
                  </span>
                </div>
              </div>
              
              {/* Review Comment */}
              <div className="mb-8">
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  className="min-h-[150px] resize-none"
                  required
                />
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <CTAButton
                  type="submit"
                  variant="primary"
                  disabled={loading || !bookId || rating === 0 || !comment.trim()}
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </CTAButton>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitReview;
