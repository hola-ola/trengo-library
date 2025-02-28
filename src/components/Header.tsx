
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book, LibraryBig, User, Settings } from "lucide-react";
import { currentUser } from "@/data/books";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <LibraryBig 
            className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="text-xl font-semibold text-foreground">ReadingNook</span>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/profile" active={location.pathname === "/profile"}>
            My Books
          </NavLink>
          {currentUser.isAdmin && (
            <NavLink to="/admin" active={location.pathname === "/admin"}>
              Admin
            </NavLink>
          )}
        </nav>
        
        {/* User menu */}
        <div className="flex items-center space-x-4">
          <Link
            to="/profile"
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:inline-block">
              {currentUser.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative text-base font-medium transition-colors duration-200",
        active 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground",
        "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
        active 
          ? "after:w-full" 
          : "after:w-0 hover:after:w-full"
      )}
    >
      {children}
    </Link>
  );
};

export default Header;
