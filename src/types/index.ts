
export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  yearPublished: number;
  isbn: string;
  pages: number;
  isAvailable: boolean;
  addedAt: string;
  genre: string[];
};

export type Review = {
  id: string;
  bookId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rentedBooks: string[];
  reviews: string[];
  isAdmin: boolean;
};
