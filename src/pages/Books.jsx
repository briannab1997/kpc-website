import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Calendar,
  ArrowRight,
  Loader2,
  ExternalLink,
  Pencil,
  Trash2,
  Plus,
  Save,
  Upload,
  X,
  Search,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultPublishedBooks = [
  {
    id: "default-1",
    title: "Yearning to BLOSSOM",
    year: "2025",
    genre: "Poetry",
    description: "A luminous collection of poetry that takes readers into the heart of grief, abandonment, and spiritual renewal.",
    cover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/c2eb449d4_Screenshot2025-09-19at84159PM.png",
    purchase_url: "https://www.amazon.com/yearning-BLOSSOM-Esther-Kentish-ebook/dp/B0F5NK29GF",
    ebook_url: "https://www.amazon.com/yearning-BLOSSOM-Esther-Kentish-ebook/dp/B0F5NK29GF",
    is_ebook_only: true
  },
  {
    id: "default-2",
    title: "On Love: Transmuting Embodied Experience into Neuroaesthetics Poetry",
    year: "2025",
    genre: "Poetry/Science",
    description: "A daring exploration of love through the lens of neuroaesthetics and embodied experience.",
    cover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/ed41b8e68_Screenshot2025-09-19at10803PM.png",
    purchase_url: "https://www.amazon.com/Love-Transmuting-Embodied-Experience-Neuroaesthetics-ebook/dp/B0F5MTGRSN",
    ebook_url: "https://www.amazon.com/Love-Transmuting-Embodied-Experience-Neuroaesthetics-ebook/dp/B0F5MTGRSN",
    is_ebook_only: true
  }
];

const genreColors = {
  "Poetry": "bg-purple-100 text-purple-700",
  "Memoir/Devotional": "bg-blue-100 text-blue-700",
  "Spiritual Memoir": "bg-indigo-100 text-indigo-700",
  "Self-Help/Memoir": "bg-green-100 text-green-700",
  "Poetry/Essays": "bg-pink-100 text-pink-700",
  "Business/Leadership": "bg-yellow-100 text-yellow-700",
  "Poetry/Science": "bg-cyan-100 text-cyan-700",
  "Academic": "bg-gray-100 text-gray-700",
  "default": "bg-gray-100 text-gray-700"
};

export default function Books() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [isEditMode, setIsEditMode] = useState(false);
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [upcomingBooks, setUpcomingBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("display_order");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);

  const fetchBooks = async () => {
    const { data: books, error } = await supabase
      .from('published_books')
      .select('*')
      .order('display_order');

    if (error || !books) {
      setPublishedBooks(defaultPublishedBooks);
      setUpcomingBooks([]);
      setAllBooks([]);
    } else {
      setAllBooks(books);
      const published = books.filter(b => !b.is_upcoming && b.is_active !== false);
      const upcoming = books.filter(b => b.is_upcoming && b.is_active !== false);
      setPublishedBooks(published.length > 0 ? published : defaultPublishedBooks);
      setUpcomingBooks(upcoming);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchBooks();
      setIsLoading(false);
    };
    load();
  }, []);

  const handleImageUpload = async (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const fileName = `books/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);
      setBookForm(f => ({ ...f, [field]: publicUrl }));
    } catch {
      alert("Upload failed");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSaveBook = async () => {
    if (!bookForm.title) {
      alert("Title is required");
      return;
    }
    setIsSaving(true);
    try {
      const { id, ...data } = bookForm;
      if (id && !id.startsWith('default')) {
        const { error } = await supabase.from('published_books').update(data).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('published_books').insert(data);
        if (error) throw error;
      }
      await fetchBooks();
      setShowBookDialog(false);
      setEditingBook(null);
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBook = async (book) => {
    if (!confirm(`Delete "${book.title}"?`)) return;
    if (book.id?.startsWith('default')) {
      alert("Cannot delete default books. Add your own books to manage them.");
      return;
    }
    try {
      const { error } = await supabase.from('published_books').delete().eq('id', book.id);
      if (error) throw error;
      await fetchBooks();
    } catch {
      alert("Failed to delete");
    }
  };

  const openEditDialog = (book = null, isUpcoming = false) => {
    setEditingBook(book);
    setBookForm(book ? { ...book } : {
      title: "",
      year: new Date().getFullYear().toString(),
      genre: "",
      description: "",
      cover: "",
      purchase_url: "",
      ebook_url: "",
      is_ebook_only: false,
      is_upcoming: isUpcoming,
      price: isUpcoming ? "$35" : "",
      display_order: isUpcoming ? upcomingBooks.length : publishedBooks.length
    });
    setShowBookDialog(true);
  };

  const availableGenres = [...new Set(allBooks.map(b => b.genre).filter(Boolean))];
  const availableYears = [...new Set(allBooks.map(b => b.year).filter(Boolean))].sort((a, b) => b - a);
  const availableCountries = [...new Set(allBooks.map(b => b.author_name).filter(Boolean))].sort();

  const filterBooks = (books) => {
    return books.filter(book => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        book.title?.toLowerCase().includes(query) ||
        book.author_name?.toLowerCase().includes(query) ||
        book.genre?.toLowerCase().includes(query);

      const matchesGenre = genreFilter === "all" || book.genre === genreFilter;
      const matchesYear = yearFilter === "all" || book.year === yearFilter;
      const matchesCountry = countryFilter === "all" || book.author_name === countryFilter;
      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "available" && !book.is_upcoming) ||
        (statusFilter === "upcoming" && book.is_upcoming);

      let matchesPrice = true;
      if (priceFilter === "free") matchesPrice = !book.price || book.price === "Free" || book.price === "$0";
      else if (priceFilter === "under20") {
        const price = parseFloat(book.price?.replace(/[^0-9.]/g, '') || "0");
        matchesPrice = price > 0 && price < 20;
      } else if (priceFilter === "20-40") {
        const price = parseFloat(book.price?.replace(/[^0-9.]/g, '') || "0");
        matchesPrice = price >= 20 && price <= 40;
      } else if (priceFilter === "over40") {
        const price = parseFloat(book.price?.replace(/[^0-9.]/g, '') || "0");
        matchesPrice = price > 40;
      }

      return matchesSearch && matchesGenre && matchesYear && matchesCountry && matchesStatus && matchesPrice;
    });
  };

  const sortBooks = (books) => {
    const sorted = [...books];
    if (sortBy === "title") sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    else if (sortBy === "year") sorted.sort((a, b) => (b.year || "0").localeCompare(a.year || "0"));
    else if (sortBy === "author") sorted.sort((a, b) => (a.author_name || "").localeCompare(b.author_name || ""));
    return sorted;
  };

  const filteredPublishedBooks = sortBooks(filterBooks(publishedBooks));
  const filteredUpcomingBooks = sortBooks(filterBooks(upcomingBooks));

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentPublishedBooks = filteredPublishedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPublishedPages = Math.ceil(filteredPublishedBooks.length / booksPerPage);
  const currentUpcomingBooks = filteredUpcomingBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalUpcomingPages = Math.ceil(filteredUpcomingBooks.length / booksPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, genreFilter, yearFilter, priceFilter, countryFilter, statusFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Admin Toolbar */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-2xl rounded-lg p-3 border border-gray-200">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">Admin</span>
          <Button
            size="sm"
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
            className={isEditMode ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {isEditMode ? "Preview" : "Edit Mode"}
          </Button>
          {isEditMode && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => openEditDialog(null, false)}>
              <Plus className="w-4 h-4 mr-1" />Add Book
            </Button>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Literary Collection</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Explore the published works and exciting upcoming releases from the authors of Kentish Publishing Company.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-red-200 focus:border-red-400 focus:ring-red-400"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">Filters:</span>
                </div>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Genre" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {availableGenres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {availableYears.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Author" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Authors</SelectItem>
                    {availableCountries.map(author => <SelectItem key={author} value={author}>{author}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Price" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="under20">Under $20</SelectItem>
                    <SelectItem value="20-40">$20-$40</SelectItem>
                    <SelectItem value="over40">Over $40</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="text-sm font-semibold text-gray-700">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="display_order">Default Order</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="year">Publication Year</SelectItem>
                    <SelectItem value="author">Author Name</SelectItem>
                  </SelectContent>
                </Select>

                {(genreFilter !== "all" || yearFilter !== "all" || priceFilter !== "all" || countryFilter !== "all" || statusFilter !== "all" || sortBy !== "display_order") && (
                  <Button variant="ghost" size="sm" onClick={() => {
                    setGenreFilter("all");
                    setYearFilter("all");
                    setPriceFilter("all");
                    setCountryFilter("all");
                    setStatusFilter("all");
                    setSortBy("display_order");
                  }}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Published Works */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Published Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of transformative works spanning poetry, memoir, spiritual guidance, and academic reflection.
            </p>
          </div>

          {currentPublishedBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">No books found matching your criteria</p>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-2 gap-8">
                {currentPublishedBooks.map((book) => (
                  <Card key={book.id} className="hover:shadow-xl transition-shadow duration-300 border-red-100 overflow-hidden relative group">
                    {isEditMode && (
                      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => openEditDialog(book, false)}>
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteBook(book)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={genreColors[book.genre] || genreColors.default}>{book.genre}</Badge>
                        <Badge variant="outline" className="text-red-600 border-red-200">{book.year}</Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{book.title}</CardTitle>
                      {book.author_name && <p className="text-sm text-gray-500 mt-1">by {book.author_name}</p>}
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {(book.print_cover || book.ebook_cover || book.cover) && (
                        <div className="border-t pt-6 space-y-8">
                          {book.print_cover && (
                            <div className="text-center">
                              <h4 className="text-sm font-semibold text-gray-700 mb-4">Print Edition</h4>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <img src={book.print_cover} alt={`${book.title} - Print Edition`} className="max-h-[500px] w-auto object-contain rounded-lg shadow-xl mx-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                                  <img src={book.print_cover} alt={`${book.title} - Print Edition`} className="w-full h-full object-contain" />
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                          {book.ebook_cover && (
                            <div className="text-center">
                              <h4 className="text-sm font-semibold text-gray-700 mb-4">E-book Edition</h4>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <img src={book.ebook_cover} alt={`${book.title} - E-book Edition`} className="max-h-[500px] w-auto object-contain rounded-lg shadow-xl mx-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                                  <img src={book.ebook_cover} alt={`${book.title} - E-book Edition`} className="w-full h-full object-contain" />
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                          {!book.print_cover && !book.ebook_cover && book.cover && (
                            <div className="text-center">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <img src={book.cover} alt={book.title} className="max-h-[500px] w-auto object-contain rounded-lg shadow-xl mx-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                                  <img src={book.cover} alt={book.title} className="w-full h-full object-contain" />
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>
                      )}
                      {book.description && (
                        <p className="text-gray-600 text-sm leading-relaxed border-t pt-4">{book.description}</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="w-full space-y-3">
                        {book.purchase_url && (
                          <a href={book.purchase_url} target="_blank" rel="noopener noreferrer" className="w-full block">
                            <Button className="w-full ribbon-button text-white">
                              {book.is_ebook_only ? "Purchase E-book" : "Purchase Book"}
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </a>
                        )}
                        {book.ebook_url && !book.is_ebook_only && (
                          <a href={book.ebook_url} target="_blank" rel="noopener noreferrer" className="w-full block">
                            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                              Purchase E-book <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {totalPublishedPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                  <div className="flex gap-2">
                    {[...Array(totalPublishedPages)].map((_, i) => (
                      <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "bg-red-600 hover:bg-red-700" : ""}>
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPublishedPages, p + 1))} disabled={currentPage === totalPublishedPages}>Next</Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Upcoming Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Works</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-red-600" />
              <Badge className="bg-red-100 text-red-700 text-lg px-4 py-2">Coming Soon</Badge>
            </div>
            {isEditMode && (
              <Button className="bg-green-600 hover:bg-green-700 mt-4" onClick={() => openEditDialog(null, true)}>
                <Plus className="w-4 h-4 mr-2" />Add Upcoming Book
              </Button>
            )}
          </div>

          {currentUpcomingBooks.length === 0 && filteredUpcomingBooks.length === 0 && upcomingBooks.length > 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">No upcoming books found matching your criteria</p>
            </div>
          ) : currentUpcomingBooks.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUpcomingBooks.map((book) => (
                  <Card key={book.id} className="hover:shadow-lg transition-shadow duration-300 border-red-100 h-full overflow-hidden flex flex-col relative group">
                    {isEditMode && (
                      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => openEditDialog(book, true)}>
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteBook(book)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 flex items-center justify-center">
                      {book.cover ? (
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <Badge className={genreColors[book.genre] || genreColors.default}>{book.genre}</Badge>
                        {book.price && <Badge variant="outline" className="text-red-600 border-red-200 font-semibold">{book.price}</Badge>}
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 leading-tight">{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm leading-relaxed">{book.description}</p>
                    </CardContent>
                    {book.purchase_url && (
                      <CardFooter className="pt-4">
                        <a href={book.purchase_url} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button className="w-full ribbon-button text-white">
                            Pre-order <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>

              {totalUpcomingPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                  <div className="flex gap-2">
                    {[...Array(totalUpcomingPages)].map((_, i) => (
                      <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "bg-red-600 hover:bg-red-700" : ""}>
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(totalUpcomingPages, p + 1))} disabled={currentPage === totalUpcomingPages}>Next</Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No upcoming books listed yet.</p>
              {isEditMode && <p className="text-sm mt-2">Click "Add Upcoming Book" to add one.</p>}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Inspired to Share Your Story?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community of authors committed to meaningful, transformative literature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Submission")}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                Submit Your Manuscript <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("About")}>
              <Button variant="outline" size="lg" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Learn About Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Book Edit Dialog */}
      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input value={bookForm.title || ""} onChange={(e) => setBookForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Year</Label>
                <Input value={bookForm.year || ""} onChange={(e) => setBookForm(f => ({ ...f, year: e.target.value }))} />
              </div>
              <div>
                <Label>Genre</Label>
                <Input value={bookForm.genre || ""} onChange={(e) => setBookForm(f => ({ ...f, genre: e.target.value }))} placeholder="e.g., Poetry, Memoir" />
              </div>
            </div>
            <div>
              <Label>Author Name</Label>
              <Input value={bookForm.author_name || ""} onChange={(e) => setBookForm(f => ({ ...f, author_name: e.target.value }))} placeholder="e.g., Esther Ruth Kentish" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={bookForm.description || ""} onChange={(e) => setBookForm(f => ({ ...f, description: e.target.value }))} rows={4} />
            </div>

            <div>
              <Label>Primary Cover (Thumbnail)</Label>
              <div className="flex items-center gap-4 mt-2">
                {bookForm.cover && <img src={bookForm.cover} className="w-20 h-28 object-contain rounded border" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload('cover', e)} className="hidden" id="book-cover-upload" />
                <label htmlFor="book-cover-upload">
                  <Button type="button" variant="outline" disabled={uploadingField === 'cover'} asChild>
                    <span>
                      {uploadingField === 'cover' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {uploadingField === 'cover' ? "Uploading..." : "Upload"}
                    </span>
                  </Button>
                </label>
                {bookForm.cover && <Button variant="ghost" size="sm" onClick={() => setBookForm(f => ({ ...f, cover: "" }))}><X className="w-4 h-4" /></Button>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Print Book Cover</Label>
                <div className="flex flex-col items-center gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
                  {bookForm.print_cover && <img src={bookForm.print_cover} className="w-full max-w-[120px] object-contain rounded" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('print_cover', e)} className="hidden" id="print-cover-upload" />
                  <label htmlFor="print-cover-upload" className="w-full">
                    <Button type="button" variant="outline" size="sm" disabled={uploadingField === 'print_cover'} className="w-full" asChild>
                      <span>
                        {uploadingField === 'print_cover' ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Upload className="w-3 h-3 mr-1" />}
                        {uploadingField === 'print_cover' ? "..." : "Print Cover"}
                      </span>
                    </Button>
                  </label>
                  {bookForm.print_cover && <Button variant="ghost" size="sm" onClick={() => setBookForm(f => ({ ...f, print_cover: "" }))} className="text-red-500 h-6"><Trash2 className="w-3 h-3" /></Button>}
                </div>
              </div>
              <div>
                <Label>E-book Cover</Label>
                <div className="flex flex-col items-center gap-2 mt-2 p-3 border rounded-lg bg-gray-50">
                  {bookForm.ebook_cover && <img src={bookForm.ebook_cover} className="w-full max-w-[120px] object-contain rounded" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('ebook_cover', e)} className="hidden" id="ebook-cover-upload" />
                  <label htmlFor="ebook-cover-upload" className="w-full">
                    <Button type="button" variant="outline" size="sm" disabled={uploadingField === 'ebook_cover'} className="w-full" asChild>
                      <span>
                        {uploadingField === 'ebook_cover' ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Upload className="w-3 h-3 mr-1" />}
                        {uploadingField === 'ebook_cover' ? "..." : "E-book Cover"}
                      </span>
                    </Button>
                  </label>
                  {bookForm.ebook_cover && <Button variant="ghost" size="sm" onClick={() => setBookForm(f => ({ ...f, ebook_cover: "" }))} className="text-red-500 h-6"><Trash2 className="w-3 h-3" /></Button>}
                </div>
              </div>
            </div>

            <div>
              <Label>Purchase URL</Label>
              <Input value={bookForm.purchase_url || ""} onChange={(e) => setBookForm(f => ({ ...f, purchase_url: e.target.value }))} placeholder="https://amazon.com/..." />
            </div>
            <div>
              <Label>E-book URL (optional)</Label>
              <Input value={bookForm.ebook_url || ""} onChange={(e) => setBookForm(f => ({ ...f, ebook_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (for upcoming)</Label>
                <Input value={bookForm.price || ""} onChange={(e) => setBookForm(f => ({ ...f, price: e.target.value }))} placeholder="$35" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" value={bookForm.display_order || 0} onChange={(e) => setBookForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={bookForm.is_upcoming || false} onCheckedChange={(v) => setBookForm(f => ({ ...f, is_upcoming: v }))} />
                <Label>Upcoming (not published yet)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={bookForm.is_ebook_only || false} onCheckedChange={(v) => setBookForm(f => ({ ...f, is_ebook_only: v }))} />
                <Label>E-book Only</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowBookDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveBook} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />Save Book
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
