
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { currentUser, books, reviews } from "@/data/books";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import BookCard from "@/components/BookCard";
import ReviewCard from "@/components/ReviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Book, Star, Settings, Library } from "lucide-react";

const Profile = () => {
  // Fetch user's rented books
  const userRentedBooks = books.filter(book => 
    currentUser.rentedBooks.includes(book.id)
  );
  
  // Fetch user's reviews
  const userReviews = reviews.filter(review => 
    currentUser.reviews.includes(review.id)
  );
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-12 animate-slide-up">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="text-2xl">{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
              <p className="text-muted-foreground">{currentUser.email}</p>
              
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-primary mr-2" />
                  <span>{userRentedBooks.length} Rented Books</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span>{userReviews.length} Reviews</span>
                </div>
                {currentUser.isAdmin && (
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-primary mr-2" />
                    <span>Admin Access</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              {currentUser.isAdmin && (
                <Link to="/admin">
                  <CTAButton variant="secondary">
                    Go to Admin Dashboard
                  </CTAButton>
                </Link>
              )}
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="rented" className="animate-fade-in">
            <TabsList className="mb-8">
              <TabsTrigger value="rented" className="px-6">
                <Book className="h-4 w-4 mr-2" />
                Rented Books
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-6">
                <Star className="h-4 w-4 mr-2" />
                My Reviews
              </TabsTrigger>
              <TabsTrigger value="settings" className="px-6">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="rented" className="pt-4">
              {userRentedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {userRentedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-secondary/30 rounded-xl">
                  <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No books rented yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Explore our library and find your next great read.
                  </p>
                  <Link to="/">
                    <CTAButton variant="primary">Browse Library</CTAButton>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              {userReviews.length > 0 ? (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <div className="hidden sm:block w-16">
                        <Link to={`/book/${review.bookId}`}>
                          <img 
                            src={books.find(b => b.id === review.bookId)?.cover} 
                            alt="Book cover" 
                            className="w-full rounded-md shadow-sm"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/book/${review.bookId}`}
                          className="text-primary hover:underline block mb-2"
                        >
                          {books.find(b => b.id === review.bookId)?.title}
                        </Link>
                        <ReviewCard review={review} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-secondary/30 rounded-xl">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Share your thoughts on the books you've read.
                  </p>
                  <Link to="/submit-review">
                    <CTAButton variant="primary">Write a Review</CTAButton>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="pt-4">
              <div className="bg-card border border-border/50 rounded-xl p-6 max-w-2xl">
                <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Display Name
                    </label>
                    <Input defaultValue={currentUser.name} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input defaultValue={currentUser.email} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                      </Avatar>
                      <CTAButton variant="secondary" size="sm">
                        Change
                      </CTAButton>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <CTAButton variant="primary">
                      Save Changes
                    </CTAButton>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
