
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import CTAButton from "@/components/CTAButton";
import { ArrowRight, BookOpen, Star, Clock } from "lucide-react";

const Index = () => {
  const { getTopRatedBooks, getRecentlyAddedBooks } = useBooks();
  const topRatedBooks = getTopRatedBooks();
  const recentBooks = getRecentlyAddedBooks();
  
  // For the featured book carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredBooks = topRatedBooks.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center animate-slide-down">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
              Discover your next great read
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of books and find stories that will 
              transport you to new worlds.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton variant="primary" size="lg">
                Browse Library
              </CTAButton>
              <CTAButton variant="secondary" size="lg">
                How It Works
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books */}
      <section className="mt-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-500" />
              <h2 className="text-2xl font-semibold">Top Rated Books</h2>
            </div>
            <Link 
              to="/"
              className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {featuredBooks.map((book, index) => (
              <BookCard 
                key={book.id} 
                book={book} 
                variant="featured"
                className={`transition-opacity duration-500 delay-${index * 200}`} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call-to-Action Section */}
      <section className="mt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bg-secondary rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 flex flex-col justify-center animate-slide-up">
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Library Services</span>
              </div>
              
              <h2 className="text-3xl font-semibold mb-4">
                Ready to dive into a new story?
              </h2>
              <p className="text-muted-foreground mb-8">
                Choose from hundreds of titles across various genres and 
                rent them with just a few clicks. Your next adventure awaits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton 
                  variant="primary"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Rent a Book
                </CTAButton>
                <Link to="/submit-review">
                  <CTAButton variant="secondary">
                    Submit a Review
                  </CTAButton>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block relative h-full min-h-[320px]">
              <img 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1000&auto=format&fit=crop" 
                alt="Library books" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Books */}
      <section className="mt-24 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Recently Added</h2>
            </div>
            <Link 
              to="/"
              className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {recentBooks.map((book, index) => (
              <BookCard 
                key={book.id} 
                book={book} 
                className={`transition-opacity duration-500 delay-${index * 100}`} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
