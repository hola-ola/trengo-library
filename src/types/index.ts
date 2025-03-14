
// Book type matching the Supabase Book table
export type Book = {
  id: number;
  title: string | null;
  author: string | null;
  cover_image: string | null;
  description: string | null;
  rating?: number; // Calculated from reviews
  published_year: number | null;
  isbn: string | null;
  pages: number | null;
  genre: string | null;
  created_at: string;
  is_available?: boolean; // Derived from checkout status
  
  // Compatibility properties for existing components
  cover?: string; // Alias for cover_image
  isAvailable?: boolean; // Alias for is_available
  yearPublished?: number; // Alias for published_year
  addedAt?: string; // Alias for created_at
};

// Review type matching the Supabase Review table
export type Review = {
  id: number;
  book_id: number | null;
  user_id: number | null;
  rating: number | null;
  comment: string | null;
  created_at: string;
  // Additional fields that might be joined from profiles
  user_name?: string;
  user_avatar?: string;
  
  // Compatibility properties for existing components
  bookId?: number; // Alias for book_id
  userId?: number; // Alias for user_id
  username?: string; // Alias for user_name
  createdAt?: string; // Alias for created_at
};

// User type matching the Supabase Profile table (not the auth.users table)
export type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: 'admin' | 'user';
  created_at: string;
};

// For backward compatibility
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rentedBooks: string[];
  reviews: string[];
  isAdmin: boolean;
};

// Checkout type matching the Supabase Checkout table
export type Checkout = {
  id: number;
  user_id: number | null;
  book_id: number | null;
  status: 'active' | 'completed';
  created_at: string;
  returned_at: string | null;
  // Additional fields that might be joined
  book_title?: string;
  book_author?: string;
  book_cover?: string;
};
