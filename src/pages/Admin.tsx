
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import StarRating from "@/components/StarRating";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Book,
  BookUp,
  Settings,
} from "lucide-react";
import { Book as BookType } from "@/types";

const Admin = () => {
  const { allBooks, loading, addBook, updateBook, deleteBook } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // New book form state
  const [newBook, setNewBook] = useState<Partial<BookType>>({
    title: "",
    author: "",
    cover: "",
    description: "",
    rating: 0,
    yearPublished: new Date().getFullYear(),
    isbn: "",
    pages: 0,
    isAvailable: true,
    genre: [],
  });
  
  // Edit book form state
  const [editBook, setEditBook] = useState<Partial<BookType>>({});
  
  // Filter books based on search term
  const filteredBooks = allBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );
  
  // Handle edit book dialog open
  const handleEditBook = (book: BookType) => {
    setSelectedBook(book);
    setEditBook({ ...book });
  };
  
  // Handle delete book dialog open
  const handleDeleteBook = (book: BookType) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle add book submit
  const handleAddBookSubmit = () => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.cover ||
      !newBook.description ||
      !newBook.isbn
    ) {
      // Show validation errors
      return;
    }
    
    addBook(newBook as Omit<BookType, "id" | "addedAt">);
    
    // Reset form
    setNewBook({
      title: "",
      author: "",
      cover: "",
      description: "",
      rating: 0,
      yearPublished: new Date().getFullYear(),
      isbn: "",
      pages: 0,
      isAvailable: true,
      genre: [],
    });
  };
  
  // Handle edit book submit
  const handleEditBookSubmit = () => {
    if (!selectedBook || !editBook.title) return;
    
    updateBook(selectedBook.id, editBook);
    setSelectedBook(null);
  };
  
  // Handle delete book confirm
  const handleDeleteBookConfirm = () => {
    if (!selectedBook) return;
    
    deleteBook(selectedBook.id);
    setIsDeleteDialogOpen(false);
    setSelectedBook(null);
  };
  
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12 animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Settings className="h-6 w-6" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage the library catalog and monitor book inventory
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <CTAButton variant="primary" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Book
                </CTAButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>
                    Enter the details of the book you want to add to the library.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input 
                        id="title" 
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        placeholder="Book title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="author" className="text-sm font-medium">
                        Author
                      </label>
                      <Input 
                        id="author" 
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="cover" className="text-sm font-medium">
                      Cover Image URL
                    </label>
                    <Input 
                      id="cover" 
                      value={newBook.cover}
                      onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
                      placeholder="https://example.com/book-cover.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea 
                      id="description" 
                      value={newBook.description}
                      onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                      placeholder="Book description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="isbn" className="text-sm font-medium">
                        ISBN
                      </label>
                      <Input 
                        id="isbn" 
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        placeholder="ISBN number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="year" className="text-sm font-medium">
                        Published Year
                      </label>
                      <Input 
                        id="year" 
                        type="number"
                        value={newBook.yearPublished}
                        onChange={(e) => setNewBook({ ...newBook, yearPublished: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="pages" className="text-sm font-medium">
                        Pages
                      </label>
                      <Input 
                        id="pages" 
                        type="number"
                        value={newBook.pages || ""}
                        onChange={(e) => setNewBook({ ...newBook, pages: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="genre" className="text-sm font-medium">
                        Genre (comma separated)
                      </label>
                      <Input 
                        id="genre" 
                        value={newBook.genre?.join(", ")}
                        onChange={(e) => setNewBook({ 
                          ...newBook, 
                          genre: e.target.value.split(",").map(g => g.trim()).filter(Boolean)
                        })}
                        placeholder="Fiction, Fantasy, etc."
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="available" 
                      checked={newBook.isAvailable}
                      onCheckedChange={(checked) => setNewBook({ ...newBook, isAvailable: checked })}
                    />
                    <label htmlFor="available" className="text-sm font-medium">
                      Available for rent
                    </label>
                  </div>
                </div>
                
                <DialogFooter>
                  <CTAButton 
                    variant="primary" 
                    onClick={handleAddBookSubmit}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Book"}
                  </CTAButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Books Table */}
          <div className="rounded-xl border border-border/50 animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="hidden md:table-cell">ISBN</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead className="hidden md:table-cell w-[100px]">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="h-10 w-7 object-cover rounded-sm"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell className="hidden md:table-cell">{book.isbn}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <StarRating rating={book.rating} size="sm" disabled />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span 
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            book.isAvailable 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {book.isAvailable ? "Available" : "Rented"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link to={`/book/${book.id}`} className="inline-block">
                          <CTAButton 
                            variant="secondary"
                            size="sm"
                            className="px-2 py-1"
                          >
                            <BookUp className="h-4 w-4" />
                          </CTAButton>
                        </Link>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <CTAButton 
                              variant="secondary"
                              size="sm"
                              className="px-2 py-1"
                              onClick={() => handleEditBook(book)}
                            >
                              <Edit className="h-4 w-4" />
                            </CTAButton>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Book</DialogTitle>
                              <DialogDescription>
                                Update the details of "{book.title}".
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedBook && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label htmlFor="edit-title" className="text-sm font-medium">
                                      Title
                                    </label>
                                    <Input 
                                      id="edit-title" 
                                      value={editBook.title}
                                      onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label htmlFor="edit-author" className="text-sm font-medium">
                                      Author
                                    </label>
                                    <Input 
                                      id="edit-author" 
                                      value={editBook.author}
                                      onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label htmlFor="edit-cover" className="text-sm font-medium">
                                    Cover Image URL
                                  </label>
                                  <Input 
                                    id="edit-cover" 
                                    value={editBook.cover}
                                    onChange={(e) => setEditBook({ ...editBook, cover: e.target.value })}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label htmlFor="edit-description" className="text-sm font-medium">
                                    Description
                                  </label>
                                  <Textarea 
                                    id="edit-description" 
                                    value={editBook.description}
                                    onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                                    rows={3}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label htmlFor="edit-isbn" className="text-sm font-medium">
                                      ISBN
                                    </label>
                                    <Input 
                                      id="edit-isbn" 
                                      value={editBook.isbn}
                                      onChange={(e) => setEditBook({ ...editBook, isbn: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label htmlFor="edit-year" className="text-sm font-medium">
                                      Published Year
                                    </label>
                                    <Input 
                                      id="edit-year" 
                                      type="number"
                                      value={editBook.yearPublished}
                                      onChange={(e) => setEditBook({ 
                                        ...editBook, 
                                        yearPublished: parseInt(e.target.value) 
                                      })}
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label htmlFor="edit-pages" className="text-sm font-medium">
                                      Pages
                                    </label>
                                    <Input 
                                      id="edit-pages" 
                                      type="number"
                                      value={editBook.pages}
                                      onChange={(e) => setEditBook({ 
                                        ...editBook, 
                                        pages: parseInt(e.target.value) 
                                      })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label htmlFor="edit-genre" className="text-sm font-medium">
                                      Genre (comma separated)
                                    </label>
                                    <Input 
                                      id="edit-genre" 
                                      value={editBook.genre?.join(", ")}
                                      onChange={(e) => setEditBook({ 
                                        ...editBook, 
                                        genre: e.target.value.split(",").map(g => g.trim()).filter(Boolean)
                                      })}
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id="edit-available" 
                                    checked={editBook.isAvailable}
                                    onCheckedChange={(checked) => setEditBook({ 
                                      ...editBook, 
                                      isAvailable: checked 
                                    })}
                                  />
                                  <label htmlFor="edit-available" className="text-sm font-medium">
                                    Available for rent
                                  </label>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter>
                              <CTAButton 
                                variant="primary" 
                                onClick={handleEditBookSubmit}
                                disabled={loading}
                              >
                                {loading ? "Saving..." : "Save Changes"}
                              </CTAButton>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <CTAButton 
                          variant="secondary"
                          size="sm"
                          className="px-2 py-1 hover:bg-red-100 hover:text-red-700"
                          onClick={() => handleDeleteBook(book)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </CTAButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Book className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p>No books found matching your search.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedBook?.title}" from the library.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBookConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
