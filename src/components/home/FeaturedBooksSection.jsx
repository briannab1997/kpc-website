import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, ExternalLink, Star, Loader2, Check } from "lucide-react";

export default function FeaturedBooksSection({ isAdmin, isEditMode }) {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSelectDialog, setShowSelectDialog] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data: books } = await supabase
        .from('published_books')
        .select('*')
        .neq('is_active', false)
        .neq('is_upcoming', true)
        .order('display_order');
      const all = books || [];
      setAllBooks(all);
      setFeaturedBooks(all.filter(b => b.is_featured));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeatured = async (bookId, currentState) => {
    setUpdating(true);
    try {
      await supabase.from('published_books').update({ is_featured: !currentState }).eq('id', bookId);
      await fetchBooks();
    } catch {
      alert("Failed to update");
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) return <div className="text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-red-600" /></div>;

  if (!isAdmin && featuredBooks.length === 0) return null;

  return (
    <div>
      {isEditMode && (
        <div className="text-center mb-8">
          <Button onClick={() => setShowSelectDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Star className="w-4 h-4 mr-2" />Manage Featured Books
          </Button>
        </div>
      )}

      {featuredBooks.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.slice(0, 4).map((book) => (
            <Card key={book.id} className="hover:shadow-xl transition-shadow border-red-100 flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <Star className="absolute top-2 right-2 w-6 h-6 text-yellow-500 fill-yellow-500 z-10" />
                {book.cover && <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />}
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                {book.author_name && <p className="text-sm text-gray-500 mb-2">by {book.author_name}</p>}
                {book.genre && <Badge className="bg-red-100 text-red-700 text-xs">{book.genre}</Badge>}
              </CardContent>
              {book.purchase_url && (
                <CardFooter className="p-4 pt-0">
                  <a href={book.purchase_url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                      <ExternalLink className="w-3 h-3 mr-1" />Get Book
                    </Button>
                  </a>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No featured books selected yet.</p>
          {isEditMode && <p className="text-sm mt-2">Click "Manage Featured Books" to select books to feature.</p>}
        </div>
      )}

      <div className="text-center mt-8">
        <Link to={createPageUrl("Books")}>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            View All Books
          </Button>
        </Link>
      </div>

      <Dialog open={showSelectDialog} onOpenChange={setShowSelectDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Featured Books (Maximum 4)</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {allBooks.map((book) => (
              <div key={book.id} className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                <Switch
                  checked={book.is_featured || false}
                  onCheckedChange={() => toggleFeatured(book.id, book.is_featured)}
                  disabled={updating || (!book.is_featured && featuredBooks.length >= 4)}
                />
                {book.cover && <img src={book.cover} className="w-12 h-16 object-cover rounded" alt={book.title} />}
                <div className="flex-1">
                  <p className="font-semibold text-sm">{book.title}</p>
                  {book.author_name && <p className="text-xs text-gray-500">{book.author_name}</p>}
                </div>
                {book.is_featured && <Check className="w-5 h-5 text-green-600" />}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
