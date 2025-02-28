
import { useState, useEffect } from "react";
import { books, reviews, currentUser } from "@/data/books";
import { Book, Review } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useBooks() {
  const [allBooks, setAllBooks] = useState<Book[]>(books as unknown as Book[]);
  const [loading, setLoading] = useState(false);

  // Get top rated books (4.7 and above)
  const getTopRatedBooks = () => {
    return allBooks.filter(book => {
      const bookRating = book.rating || 0;
      return bookRating >= 4.7;
    });
  };

  // Get recently added books (sort by addedAt)
  const getRecentlyAddedBooks = () => {
    return [...allBooks].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ).slice(0, 3);
  };

  // Get book by ID
  const getBookById = (id: string | number) => {
    // Handle both string and number IDs for backward compatibility
    const bookId = typeof id === 'string' ? parseInt(id, 10) : id;
    return allBooks.find(book => book.id === bookId);
  };

  // Get reviews for a book
  const getReviewsForBook = (bookId: string | number) => {
    const id = typeof bookId === 'string' ? parseInt(bookId, 10) : bookId;
    return reviews.filter(review => {
      const reviewBookId = review.bookId || review.book_id;
      return reviewBookId === id;
    }) as unknown as Review[];
  };

  // Add a new book (admin only)
  const addBook = (book: Omit<Book, "id" | "created_at">) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBook: Book = {
        ...book,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      
      setAllBooks(prev => [...prev, newBook]);
      setLoading(false);
      toast({
        title: "Book added",
        description: `"${book.title}" has been added to the library.`,
      });
    }, 600);
  };

  // Update a book (admin only)
  const updateBook = (id: number, updates: Partial<Book>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAllBooks(prev => 
        prev.map(book => book.id === id ? { ...book, ...updates } : book)
      );
      setLoading(false);
      toast({
        title: "Book updated",
        description: "The book information has been updated.",
      });
    }, 600);
  };

  // Delete a book (admin only)
  const deleteBook = (id: number) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAllBooks(prev => prev.filter(book => book.id !== id));
      setLoading(false);
      toast({
        title: "Book removed",
        description: "The book has been removed from the library.",
      });
    }, 600);
  };

  // Rent a book
  const rentBook = (bookId: number) => {
    setLoading(true);
    
    const book = allBooks.find(b => b.id === bookId);
    
    if (!book || !(book.is_available ?? true)) {
      toast({
        title: "Cannot rent book",
        description: "This book is not available for rent.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Update book availability
      setAllBooks(prev => 
        prev.map(book => 
          book.id === bookId 
            ? { ...book, is_available: false } 
            : book
        )
      );
      
      // In a real app, we would also update the user's rentedBooks array
      
      setLoading(false);
      toast({
        title: "Book rented",
        description: `You have successfully rented "${book.title}".`,
      });
    }, 600);
  };

  // Submit a review
  const submitReview = (bookId: number, rating: number, comment: string) => {
    setLoading(true);
    
    // In a real app, we would save this to a database
    const newReview: Review = {
      id: Date.now(),
      book_id: bookId,
      user_id: parseInt(currentUser.id, 10),
      rating,
      comment,
      created_at: new Date().toISOString(),
      user_name: currentUser.name,
    };
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would add this review to the reviews array
      // and update the book's average rating
      
      setLoading(false);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    }, 600);
    
    return newReview;
  };

  return {
    allBooks,
    loading,
    getTopRatedBooks,
    getRecentlyAddedBooks,
    getBookById,
    getReviewsForBook,
    addBook,
    updateBook,
    deleteBook,
    rentBook,
    submitReview,
  };
}
