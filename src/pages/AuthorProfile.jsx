import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  BookOpen,
  Globe,
  Loader2,
  Pencil,
  Save,
  X,
  Upload,
  Trash2,
  Plus
} from "lucide-react";

const Twitter = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const Instagram = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const Linkedin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function AuthorProfile() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';
  const location = useLocation();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const authorId = params.get("id");

        if (authorId) {
          const { data, error } = await supabase
            .from('featured_authors')
            .select('*')
            .eq('id', authorId)
            .single();

          if (!error && data) {
            setAuthor(data);
            setEditForm(data);
          }
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const handleImageUpload = async (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const fileName = `authors/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);
      setEditForm(f => ({ ...f, [field]: publicUrl }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { id, ...data } = editForm;
      const { error } = await supabase
        .from('featured_authors')
        .update(data)
        .eq('id', author.id);

      if (error) throw error;
      setAuthor(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAuthor = async () => {
    if (!confirm("Are you sure you want to delete this author? This cannot be undone.")) return;
    try {
      const { error } = await supabase
        .from('featured_authors')
        .delete()
        .eq('id', author.id);

      if (error) throw error;
      navigate(createPageUrl("Authors"));
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete author");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Author Not Found</h2>
        <p className="text-gray-600">The requested author could not be located.</p>
        <Link to={createPageUrl("Authors")}>
          <Button variant="link" className="text-red-600">Return to Featured Authors</Button>
        </Link>
      </div>
    );
  }

  const socialLinks = author.social_media_links || {};

  return (
    <div className="bg-gradient-to-br from-cream-50 to-white min-h-screen">
      {/* Back Button & Admin Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex justify-between items-center">
        <Link to={createPageUrl("Authors")} className="inline-flex items-center text-red-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Featured Authors
        </Link>

        {isAdmin && !isEditing && (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Author
            </Button>
            <Button onClick={handleDeleteAuthor} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}

        {isAdmin && isEditing && (
          <div className="flex gap-2">
            <Button onClick={() => { setIsEditing(false); setEditForm(author); }} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Images */}
            <div className="space-y-6">
              {/* Profile Image */}
              <Card className="overflow-hidden shadow-lg border-red-100">
                {isEditing ? (
                  <div className="p-4">
                    <Label className="mb-2 block">Profile Image</Label>
                    {editForm.profile_image && (
                      <img src={editForm.profile_image} alt={editForm.name} className="w-full aspect-square object-cover rounded mb-4" />
                    )}
                    <div className="flex gap-2">
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload('profile_image', e)} className="hidden" id="profile-upload" />
                      <label htmlFor="profile-upload" className="flex-1">
                        <Button type="button" variant="outline" className="w-full" disabled={uploadingField === 'profile_image'} asChild>
                          <span>
                            {uploadingField === 'profile_image' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                            {uploadingField === 'profile_image' ? "Uploading..." : "Upload Image"}
                          </span>
                        </Button>
                      </label>
                      {editForm.profile_image && (
                        <Button variant="ghost" size="icon" onClick={() => setEditForm(f => ({ ...f, profile_image: "" }))}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  author.profile_image && (
                    <img src={author.profile_image} alt={author.name} className="w-full aspect-square object-cover" />
                  )
                )}
              </Card>

              {/* Book Cover Image */}
              <Card className="overflow-hidden shadow-lg border-red-100">
                <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50">
                  <CardTitle className="text-center">Forthcoming Publication</CardTitle>
                </CardHeader>
                {isEditing ? (
                  <div className="p-4">
                    {editForm.book_cover_image && (
                      <img src={editForm.book_cover_image} alt="Forthcoming publication" className="w-full aspect-[3/4] object-cover rounded mb-4" />
                    )}
                    <div className="flex gap-2">
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload('book_cover_image', e)} className="hidden" id="book-cover-upload" />
                      <label htmlFor="book-cover-upload" className="flex-1">
                        <Button type="button" variant="outline" className="w-full" disabled={uploadingField === 'book_cover_image'} asChild>
                          <span>
                            {uploadingField === 'book_cover_image' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                            {uploadingField === 'book_cover_image' ? "Uploading..." : "Upload Book Cover"}
                          </span>
                        </Button>
                      </label>
                      {editForm.book_cover_image && (
                        <Button variant="ghost" size="icon" onClick={() => setEditForm(f => ({ ...f, book_cover_image: "" }))}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  author.book_cover_image && (
                    <img src={author.book_cover_image} alt="Forthcoming publication" className="w-full aspect-[3/4] object-cover" />
                  )
                )}
              </Card>

              {/* Spanish Book Cover */}
              {(isEditing || author.spanish_book_cover_image) && (
                <Card className="overflow-hidden shadow-lg border-red-100">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50">
                    <CardTitle className="text-center">Spanish Edition</CardTitle>
                  </CardHeader>
                  {isEditing ? (
                    <div className="p-4">
                      {editForm.spanish_book_cover_image && (
                        <img src={editForm.spanish_book_cover_image} alt="Spanish edition" className="w-full aspect-[3/4] object-cover rounded mb-4" />
                      )}
                      <div className="flex gap-2">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('spanish_book_cover_image', e)} className="hidden" id="spanish-book-cover-upload" />
                        <label htmlFor="spanish-book-cover-upload" className="flex-1">
                          <Button type="button" variant="outline" className="w-full" disabled={uploadingField === 'spanish_book_cover_image'} asChild>
                            <span>
                              {uploadingField === 'spanish_book_cover_image' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                              {uploadingField === 'spanish_book_cover_image' ? "Uploading..." : "Upload Spanish Cover"}
                            </span>
                          </Button>
                        </label>
                        {editForm.spanish_book_cover_image && (
                          <Button variant="ghost" size="icon" onClick={() => setEditForm(f => ({ ...f, spanish_book_cover_image: "" }))}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    author.spanish_book_cover_image && (
                      <img src={author.spanish_book_cover_image} alt="Spanish edition" className="w-full aspect-[3/4] object-cover" />
                    )
                  )}
                </Card>
              )}
            </div>

            {/* Right Column - Author Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Name and Country */}
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Author Name</Label>
                      <Input
                        value={editForm.name || ""}
                        onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                        className="text-3xl font-bold"
                        placeholder="Author's full name"
                      />
                    </div>
                    <div>
                      <Label>Country / Location Label</Label>
                      <Input
                        value={editForm.country || ""}
                        onChange={(e) => setEditForm(f => ({ ...f, country: e.target.value }))}
                        placeholder="e.g., International, USA, UK"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">{author.name}</h1>
                    {author.country && (
                      <Badge className="bg-red-100 text-red-700 text-lg px-4 py-2">
                        <Globe className="w-5 h-5 mr-2" />
                        {author.country}
                      </Badge>
                    )}
                  </>
                )}
              </div>

              {/* Biography */}
              <Card className="shadow-lg border-red-100">
                <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
                  <CardTitle className="text-2xl">Biography</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isEditing ? (
                    <Textarea
                      value={editForm.biography || ""}
                      onChange={(e) => setEditForm(f => ({ ...f, biography: e.target.value }))}
                      rows={8}
                      placeholder="Write the author's biography..."
                      className="text-lg"
                    />
                  ) : (
                    author.biography ? (
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{author.biography}</p>
                    ) : (
                      <p className="text-gray-400 italic">No biography added yet.</p>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Background */}
              <Card className="shadow-lg border-red-100">
                <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
                  <CardTitle className="text-2xl">Background</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isEditing ? (
                    <Textarea
                      value={editForm.background || ""}
                      onChange={(e) => setEditForm(f => ({ ...f, background: e.target.value }))}
                      rows={4}
                      placeholder="Brief background about the author..."
                      className="text-lg"
                    />
                  ) : (
                    author.background ? (
                      <p className="text-gray-700 leading-relaxed text-lg">{author.background}</p>
                    ) : (
                      <p className="text-gray-400 italic">No background added yet.</p>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="shadow-lg border-red-100">
                <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
                  <CardTitle className="text-2xl">Connect</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Twitter URL</Label>
                        <Input
                          value={editForm.social_media_links?.twitter || ""}
                          onChange={(e) => setEditForm(f => ({ ...f, social_media_links: { ...f.social_media_links, twitter: e.target.value } }))}
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                      <div>
                        <Label>Instagram URL</Label>
                        <Input
                          value={editForm.social_media_links?.instagram || ""}
                          onChange={(e) => setEditForm(f => ({ ...f, social_media_links: { ...f.social_media_links, instagram: e.target.value } }))}
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <Label>LinkedIn URL</Label>
                        <Input
                          value={editForm.social_media_links?.linkedin || ""}
                          onChange={(e) => setEditForm(f => ({ ...f, social_media_links: { ...f.social_media_links, linkedin: e.target.value } }))}
                          placeholder="https://linkedin.com/..."
                        />
                      </div>
                      <div>
                        <Label>Website URL</Label>
                        <Input
                          value={editForm.social_media_links?.website || ""}
                          onChange={(e) => setEditForm(f => ({ ...f, social_media_links: { ...f.social_media_links, website: e.target.value } }))}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  ) : (
                    (socialLinks.twitter || socialLinks.instagram || socialLinks.linkedin || socialLinks.website) ? (
                      <div className="flex flex-wrap gap-4">
                        {socialLinks.twitter && (
                          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                              <Twitter className="w-4 h-4 mr-2" /> Twitter
                            </Button>
                          </a>
                        )}
                        {socialLinks.instagram && (
                          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                              <Instagram className="w-4 h-4 mr-2" /> Instagram
                            </Button>
                          </a>
                        )}
                        {socialLinks.linkedin && (
                          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                              <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                            </Button>
                          </a>
                        )}
                        {socialLinks.website && (
                          <a href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                              <Globe className="w-4 h-4 mr-2" /> Website
                            </Button>
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No social links added yet.</p>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Spanish Book Description */}
              {(isEditing || author.spanish_book_description) && (
                <Card className="shadow-lg border-red-100">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
                    <CardTitle className="text-2xl">Spanish Edition Description</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isEditing ? (
                      <Textarea
                        value={editForm.spanish_book_description || ""}
                        onChange={(e) => setEditForm(f => ({ ...f, spanish_book_description: e.target.value }))}
                        rows={6}
                        placeholder="Descripcion en espanol del libro..."
                        className="text-lg"
                      />
                    ) : (
                      author.spanish_book_description ? (
                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{author.spanish_book_description}</p>
                      ) : (
                        <p className="text-gray-400 italic">No Spanish description added yet.</p>
                      )
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Published Works */}
              {author.books && author.books.length > 0 && (
                <Card className="shadow-lg border-red-100">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-red-600" />
                      Published Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {author.books.map((book, index) => (
                        <div key={index} className="border-l-4 border-red-600 pl-4">
                          <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
                          {book.genre && <Badge className="mt-2 bg-red-100 text-red-700">{book.genre}</Badge>}
                          {book.publication_year && <p className="text-sm text-gray-500 mt-1">Published: {book.publication_year}</p>}
                          {book.description && <p className="text-gray-700 mt-3 leading-relaxed">{book.description}</p>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
