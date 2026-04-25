import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  BookOpen,
  Heart,
  Users,
  Award,
  ArrowRight,
  Cross,
  Lightbulb,
  Shield,
  Star,
  Pencil,
  Trash2,
  Plus,
  Save,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FeaturedBooksSection from "../components/home/FeaturedBooksSection";

const defaultFounderData = {
  name: "Esther Ruth Kentish",
  title: "Meet Our Founder",
  biography: "An interdisciplinary researcher, author, and TEDx speaker whose work bridges scientific communication, medical humanities, and life writing. With academic rigor and spiritual depth, she brings a unique vision to the literary world.",
  photo_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/8b487794f_ebb7b83cd_gkbp5mi24iq6mo3o1tefva0072_SY600_.jpg",
  highlights: [
    { icon: "Star", text: "Author of 15 Books" },
    { icon: "Award", text: "TEDx Speaker" },
    { icon: "BookOpen", text: "Researcher" },
    { icon: "Heart", text: "Advocate" }
  ],
  cta_links: [
    { text: "Learn About Our Founder", url: "Founder", is_primary: true },
    { text: "Explore Her Works", url: "Books", is_primary: false }
  ]
};

const iconMap = {
  Star: Star,
  Award: Award,
  BookOpen: BookOpen,
  Heart: Heart,
  Users: Users,
  Cross: Cross,
  Lightbulb: Lightbulb,
  Shield: Shield
};

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';
  const [isEditMode, setIsEditMode] = useState(false);
  const [founderData, setFounderData] = useState(null);
  const [founderBooks, setFounderBooks] = useState([]);
  const [editingFounder, setEditingFounder] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", description: "", cover: "", purchase_url: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: founders } = await supabase.from('founder_info').select('*').limit(1);
        if (founders && founders.length > 0) {
          setFounderData(founders[0]);
          setEditForm(founders[0]);
        } else {
          setFounderData(defaultFounderData);
          setEditForm(defaultFounderData);
        }
      } catch {
        setFounderData(defaultFounderData);
        setEditForm(defaultFounderData);
      }

      try {
        const { data: books } = await supabase
          .from('published_books')
          .select('*')
          .eq('author_name', 'Esther Ruth Kentish')
          .eq('is_active', true)
          .order('display_order')
          .limit(10);
        setFounderBooks(books || []);
      } catch {
        setFounderBooks([]);
      }
    };
    fetchData();
  }, []);

  const handleSaveFounder = async () => {
    setIsSaving(true);
    try {
      if (founderData.id) {
        await supabase.from('founder_info').update(editForm).eq('id', founderData.id);
      } else {
        const { data: created } = await supabase.from('founder_info').insert(editForm).select().single();
        setEditForm(f => ({ ...f, id: created.id }));
      }
      setFounderData(editForm);
      setEditingFounder(false);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `founder-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);
      setEditForm(f => ({ ...f, photo_url: publicUrl }));
    } catch (error) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddHighlight = () => {
    setEditForm(f => ({
      ...f,
      highlights: [...(f.highlights || []), { icon: "Star", text: "New Highlight" }]
    }));
  };

  const handleRemoveHighlight = (index) => {
    setEditForm(f => ({
      ...f,
      highlights: f.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateHighlight = (index, field, value) => {
    setEditForm(f => ({
      ...f,
      highlights: f.highlights.map((h, i) => i === index ? { ...h, [field]: value } : h)
    }));
  };

  const handleAddBook = async () => {
    if (!newBook.title) return;
    try {
      await supabase.from('published_books').insert({
        ...newBook,
        author_name: "Esther Ruth Kentish",
        is_active: true,
        display_order: founderBooks.length
      });
      const { data: books } = await supabase
        .from('published_books')
        .select('*')
        .eq('author_name', 'Esther Ruth Kentish')
        .eq('is_active', true)
        .order('display_order')
        .limit(10);
      setFounderBooks(books || []);
      setShowAddBook(false);
      setNewBook({ title: "", description: "", cover: "", purchase_url: "" });
    } catch (error) {
      alert("Failed to add book");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!confirm("Delete this book?")) return;
    try {
      await supabase.from('published_books').delete().eq('id', bookId);
      setFounderBooks(founderBooks.filter(b => b.id !== bookId));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const data = founderData || defaultFounderData;

  return (
    <div>
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
        </div>
      )}

      <section className="py-8 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-['Times_New_Roman',_serif] text-5xl md:text-7xl font-bold text-gray-900 tracking-wider whitespace-nowrap">
            KENTISH PUBLISHING COMPANY
          </h1>
        </div>
      </section>

      <section className="w-full text-center z-10 relative bg-white">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/1374c99e0_Bannerforribbon.jpg"
          alt="Red Ribbon"
          className="h-auto object-contain inline-block w-full"
          style={{ imageRendering: 'crisp-edges', filter: 'contrast(1.1) saturate(1.1)' }}
        />
      </section>

      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Founded in 2016, Kentish Publishing Company is a distinguished professional publishing house
            dedicated to nurturing unique stories and experiences from authors around the world. Guided by
            Christian principles, we combine precision with personalized care to ensure every author's vision is fully realized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Submission")}>
              <Button size="lg" className="ribbon-button text-white px-8 py-4 text-lg font-semibold">
                Submit Your Manuscript
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("About")}>
              <Button variant="outline" size="lg" className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold">
                Learn Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100 bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardContent className="p-12 text-center">
              <Cross className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">Our Christian Foundation</h2>
              <blockquote className="text-xl leading-relaxed">
                "The foundation of our company is firmly cultivated through and guided by the principles of Jesus Christ.
                We hold that producing literature that is connected to, and inspired by, God is not only our calling but
                the essence of our purpose."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three Distinct Imprints</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each imprint serves different audiences while maintaining our commitment to inclusive, Christian-rooted excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-purple-700 mb-3">Creative Imprint</h3>
                <p className="text-gray-600 mb-4">Fiction, poetry, and creative non-fiction that weave Christian values into compelling narratives.</p>
                <Link to={createPageUrl("Imprints")}>
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">Academic Imprint</h3>
                <p className="text-gray-600 mb-4">Rigorous scholarly works that bridge faith and academia with integrity and excellence.</p>
                <Link to={createPageUrl("Imprints")}>
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-red-700 mb-3">Inspirational Imprint</h3>
                <p className="text-gray-600 mb-4">Devotionals and memoirs that uplift, encourage, and transform lives through faith.</p>
                <Link to={createPageUrl("Imprints")}>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Kentish Publishing?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six distinctive features that set us apart from other publishing houses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cross, title: "Faith-Centered Foundation", desc: "Rooted in Christian principles, guiding every project with spiritual integrity." },
              { icon: Users, title: "Personalized Author Support", desc: "One-on-one guidance from our CEO and professional editorial team." },
              { icon: Award, title: "Professional Expertise", desc: "Combining creative, academic, and business expertise holistically." },
              { icon: Lightbulb, title: "Unique Voice Amplification", desc: "Dedicated to publishing underrepresented voices and overlooked stories." },
              { icon: Shield, title: "Vision-Driven Publishing", desc: "Every project treated as a creative partnership with authentic results." },
              { icon: Heart, title: "Spiritual & Creative Synergy", desc: "Blending faith, creativity, and professional publishing for deeper impact." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked selections showcasing exceptional works from our publishing house.
            </p>
          </div>
          <FeaturedBooksSection isAdmin={isAdmin} isEditMode={isEditMode} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Share Your Story?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of authors who have chosen to publish with purpose, spiritual integrity, and professional excellence.
          </p>
          <Link to={createPageUrl("Submission")}>
            <Button size="lg" className="ribbon-button text-white px-12 py-4 text-xl font-semibold">
              Start Your Publishing Journey
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      <Dialog open={editingFounder} onOpenChange={setEditingFounder}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Founder Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Section Title</Label>
              <Input value={editForm.title || ""} onChange={(e) => setEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Meet Our Founder" />
            </div>
            <div>
              <Label>Name</Label>
              <Input value={editForm.name || ""} onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label>Biography</Label>
              <Textarea value={editForm.biography || ""} onChange={(e) => setEditForm(f => ({ ...f, biography: e.target.value }))} rows={4} />
            </div>
            <div>
              <Label>Photo</Label>
              <div className="flex items-center gap-4">
                {editForm.photo_url && <img src={editForm.photo_url} className="w-20 h-20 rounded-full object-cover" alt="Founder" />}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="founder-photo" />
                <label htmlFor="founder-photo">
                  <Button type="button" variant="outline" disabled={isUploading} asChild>
                    <span>
                      {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {isUploading ? "Uploading..." : "Upload"}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Highlights</Label>
                <Button size="sm" variant="outline" onClick={handleAddHighlight}><Plus className="w-4 h-4 mr-1" />Add</Button>
              </div>
              {editForm.highlights?.map((h, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <select value={h.icon} onChange={(e) => handleUpdateHighlight(i, 'icon', e.target.value)} className="border rounded px-2 py-1 text-sm">
                    {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                  <Input value={h.text} onChange={(e) => handleUpdateHighlight(i, 'text', e.target.value)} className="flex-1" />
                  <Button size="sm" variant="ghost" onClick={() => handleRemoveHighlight(i)}><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingFounder(false)}>Cancel</Button>
              <Button onClick={handleSaveFounder} disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={newBook.title} onChange={(e) => setNewBook(b => ({ ...b, title: e.target.value }))} placeholder="Book title" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={newBook.description} onChange={(e) => setNewBook(b => ({ ...b, description: e.target.value }))} rows={3} />
            </div>
            <div>
              <Label>Cover Image URL</Label>
              <Input value={newBook.cover} onChange={(e) => setNewBook(b => ({ ...b, cover: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <Label>Purchase URL</Label>
              <Input value={newBook.purchase_url} onChange={(e) => setNewBook(b => ({ ...b, purchase_url: e.target.value }))} placeholder="https://amazon.com/..." />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddBook(false)}>Cancel</Button>
              <Button onClick={handleAddBook} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />Add Book
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
