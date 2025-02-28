
import { Book, Review, User, UserProfile } from "@/types";

export const books: Book[] = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Donald A. Norman",
    cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", // For backward compatibility
    description: "A powerful primer on how—and why—some products satisfy customers while others only frustrate them. This book is all about the design of everyday things, from doorknobs to computers. Norman advocates for user-centered design that serves people rather than requiring them to adapt to technology.",
    rating: 4.8,
    published_year: 2013,
    yearPublished: 2013, // For backward compatibility
    isbn: "978-0465050659",
    pages: 368,
    is_available: true,
    isAvailable: true, // For backward compatibility
    created_at: "2023-08-12T14:22:00Z",
    addedAt: "2023-08-12T14:22:00Z", // For backward compatibility
    genre: "Design, Psychology, Non-fiction"
  },
  {
    id: 2,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    cover_image: "https://images.unsplash.com/photo-1541323181503-6c9d89170a66?q=80&w=800&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1541323181503-6c9d89170a66?q=80&w=800&auto=format&fit=crop", // For backward compatibility
    description: "The exclusive biography of Steve Jobs. Based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur.",
    rating: 4.6,
    published_year: 2011,
    yearPublished: 2011, // For backward compatibility
    isbn: "978-1451648539",
    pages: 656,
    is_available: false,
    isAvailable: false, // For backward compatibility
    created_at: "2023-09-01T09:45:00Z",
    addedAt: "2023-09-01T09:45:00Z", // For backward compatibility
    genre: "Biography, Technology, Business"
  },
  {
    id: 3,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover_image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop", // For backward compatibility
    description: "In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    rating: 4.7,
    published_year: 2011,
    yearPublished: 2011, // For backward compatibility
    isbn: "978-0374533557",
    pages: 499,
    is_available: true,
    isAvailable: true, // For backward compatibility
    created_at: "2023-10-05T11:30:00Z",
    addedAt: "2023-10-05T11:30:00Z", // For backward compatibility
    genre: "Psychology, Economics, Science"
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    cover_image: "https://images.unsplash.com/photo-1531709591319-2581bcdc45c9?q=80&w=800&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1531709591319-2581bcdc45c9?q=80&w=800&auto=format&fit=crop", // For backward compatibility
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
    rating: 4.9,
    published_year: 1965,
    yearPublished: 1965, // For backward compatibility
    isbn: "978-0441172719",
    pages: 896,
    is_available: true,
    isAvailable: true, // For backward compatibility
    created_at: "2023-07-22T16:15:00Z",
    addedAt: "2023-07-22T16:15:00Z", // For backward compatibility
    genre: "Science Fiction, Fantasy, Classic"
  },
  {
    id: 5,
    title: "The Lean Startup",
    author: "Eric Ries",
    cover_image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", // For backward compatibility
    description: "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched.",
    rating: 4.5,
    published_year: 2011,
    yearPublished: 2011, // For backward compatibility
    isbn: "978-0307887894",
    pages: 336,
    is_available: true,
    isAvailable: true, // For backward compatibility
    created_at: "2023-11-10T13:00:00Z",
    addedAt: "2023-11-10T13:00:00Z", // For backward compatibility
    genre: "Business, Entrepreneurship, Technology"
  },
  {
    id: 6,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover_image: "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?q=80&w=800&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?q=80&w=800&auto=format&fit=crop", // For backward compatibility
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human.'",
    rating: 4.7,
    published_year: 2014,
    yearPublished: 2014, // For backward compatibility
    isbn: "978-0062316097",
    pages: 512,
    is_available: false,
    isAvailable: false, // For backward compatibility
    created_at: "2023-06-30T10:20:00Z",
    addedAt: "2023-06-30T10:20:00Z", // For backward compatibility
    genre: "History, Anthropology, Science"
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    book_id: 1,
    bookId: 1, // For backward compatibility
    user_id: 1,
    userId: 1, // For backward compatibility
    user_name: "Alex Thompson",
    username: "Alex Thompson", // For backward compatibility
    rating: 5,
    comment: "This book changed how I look at product design. Incredibly insightful and still relevant today.",
    created_at: "2023-09-15T14:30:00Z",
    createdAt: "2023-09-15T14:30:00Z" // For backward compatibility
  },
  {
    id: 2,
    book_id: 1,
    bookId: 1, // For backward compatibility
    user_id: 2,
    userId: 2, // For backward compatibility
    user_name: "Jamie Chen",
    username: "Jamie Chen", // For backward compatibility
    rating: 4,
    comment: "Great principles that apply across many fields. Would recommend to anyone in design or product development.",
    created_at: "2023-10-20T09:15:00Z",
    createdAt: "2023-10-20T09:15:00Z" // For backward compatibility
  },
  {
    id: 3,
    book_id: 2,
    bookId: 2, // For backward compatibility
    user_id: 3,
    userId: 3, // For backward compatibility
    user_name: "Sam Wilson",
    username: "Sam Wilson", // For backward compatibility
    rating: 5,
    comment: "Fascinating look into the mind of one of the most influential innovators of our time. Couldn't put it down.",
    created_at: "2023-09-05T16:45:00Z",
    createdAt: "2023-09-05T16:45:00Z" // For backward compatibility
  },
  {
    id: 4,
    book_id: 3,
    bookId: 3, // For backward compatibility
    user_id: 1,
    userId: 1, // For backward compatibility
    user_name: "Alex Thompson",
    username: "Alex Thompson", // For backward compatibility
    rating: 4,
    comment: "Dense but rewarding. Kahneman explains complex cognitive concepts in an accessible way.",
    created_at: "2023-11-01T11:20:00Z",
    createdAt: "2023-11-01T11:20:00Z" // For backward compatibility
  },
  {
    id: 5,
    book_id: 4,
    bookId: 4, // For backward compatibility
    user_id: 4,
    userId: 4, // For backward compatibility
    user_name: "Jordan Lee",
    username: "Jordan Lee", // For backward compatibility
    rating: 5,
    comment: "A masterpiece of science fiction. The world-building is unparalleled.",
    created_at: "2023-08-12T13:10:00Z",
    createdAt: "2023-08-12T13:10:00Z" // For backward compatibility
  }
];

export const users: User[] = [
  {
    id: "u1",
    name: "Alex Thompson",
    email: "alex@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rentedBooks: ["2"],
    reviews: ["r1", "r4"],
    isAdmin: true
  },
  {
    id: "u2",
    name: "Jamie Chen",
    email: "jamie@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rentedBooks: ["6"],
    reviews: ["r2"],
    isAdmin: false
  },
  {
    id: "u3",
    name: "Sam Wilson",
    email: "sam@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rentedBooks: [],
    reviews: ["r3"],
    isAdmin: false
  },
  {
    id: "u4",
    name: "Jordan Lee",
    email: "jordan@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rentedBooks: [],
    reviews: ["r5"],
    isAdmin: false
  }
];

// For demo purposes, we'll simulate a current user
export const currentUser = users[0]; // Admin user
