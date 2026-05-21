import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, BookOpen, ArrowRight, Globe, Users, Loader2, Plus, Search, Pencil, Save, GripVertical, Edit } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Authors() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';
  const navigate = useNavigate();

  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [upcomingAuthors, setUpcomingAuthors] = useState([]);
  const [forthcoming2026Authors, setForthcoming2026Authors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pageContent, setPageContent] = useState({
    hero_title: "Featured Authors",
    hero_subtitle: "Discover the diverse voices and emerging talents from around the world whose stories are shaping the future of literature. Our featured authors represent a global community of writers spanning different cultures, backgrounds, and perspectives.",
    available_title: "Available Now",
    upcoming_title: "Upcoming",
    forthcoming_title: "Forthcoming 2026",
    diversity_title: "A Tapestry of Global Narratives",
    diversity_text: "Our featured authors represent the beautiful diversity of human experience, spanning across continents, cultures, and creative traditions. From Africa to North America, from established voices to emerging talents, these writers embody our commitment to amplifying underrepresented perspectives and celebrating the rich variety of storytelling traditions from around the world.",
    cta_title: "Become a Featured Author",
    cta_text: "Do you have a unique story to tell? Join our global community of diverse voices and share your narrative with the world."
  });
  const [editingContent, setEditingContent] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: authors, error } = await supabase
        .from('featured_authors')
        .select('*')
        .order('display_order');

      if (!error && authors) {
        setAvailableAuthors(authors.filter(a => a.status === "available_now"));
        setUpcomingAuthors(authors.filter(a => a.status === "upcoming"));
        setForthcoming2026Authors(authors.filter(a => a.status === "forthcoming_2026"));
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    }

    try {
      const { data: content } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', 'featured_authors');

      if (content && content.length > 0) {
        const parsed = {};
        content.forEach(item => {
          parsed[item.section_key] = item.content_value;
        });
        setPageContent(prev => ({ ...prev, ...parsed }));
      }
    } catch {}

    setIsLoading(false);
  };

  const handleCreateAuthor = async (status = "available_now") => {
    setIsCreating(true);
    try {
      const maxOrder = Math.max(
        ...availableAuthors.map(a => a.display_order || 0),
        ...upcomingAuthors.map(a => a.display_order || 0),
        ...forthcoming2026Authors.map(a => a.display_order || 0),
        -1
      ) + 1;

      const { data: newAuthor, error } = await supabase
        .from('featured_authors')
        .insert({
          name: "New Author",
          country: "International",
          background: "An emerging voice bringing fresh perspectives to contemporary literature.",
          status,
          display_order: maxOrder
        })
        .select()
        .single();

      if (error) throw error;
      navigate(createPageUrl(`AuthorProfile?id=${newAuthor.id}`));
    } catch (error) {
      console.error("Error creating author:", error);
      alert("Failed to create new author");
      setIsCreating(false);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceSection = result.source.droppableId;
    const destSection = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const getAuthors = (section) => {
      if (section === "available_now") return [...availableAuthors];
      if (section === "upcoming") return [...upcomingAuthors];
      return [...forthcoming2026Authors];
    };

    const setAuthors = (section, authors) => {
      if (section === "available_now") setAvailableAuthors(authors);
      else if (section === "upcoming") setUpcomingAuthors(authors);
      else setForthcoming2026Authors(authors);
    };

    if (sourceSection === destSection) {
      const items = getAuthors(sourceSection);
      const [reorderedItem] = items.splice(sourceIndex, 1);
      items.splice(destIndex, 0, reorderedItem);
      items.forEach((item, index) => { item.display_order = index; });
      setAuthors(sourceSection, items);
    } else {
      const sourceItems = getAuthors(sourceSection);
      const destItems = getAuthors(destSection);
      const [movedItem] = sourceItems.splice(sourceIndex, 1);
      movedItem.status = destSection;
      destItems.splice(destIndex, 0, movedItem);
      sourceItems.forEach((item, index) => { item.display_order = index; });
      destItems.forEach((item, index) => { item.display_order = index; });
      setAuthors(sourceSection, sourceItems);
      setAuthors(destSection, destItems);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const allAuthors = [...availableAuthors, ...upcomingAuthors, ...forthcoming2026Authors];
      for (const author of allAuthors) {
        await supabase
          .from('featured_authors')
          .update({ status: author.status, display_order: author.display_order })
          .eq('id', author.id);
      }
      setIsEditMode(false);
      await fetchData();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      for (const [key, value] of Object.entries(pageContent)) {
        const { data: existing } = await supabase
          .from('page_content')
          .select('id')
          .eq('page_name', 'featured_authors')
          .eq('section_key', key);

        if (existing && existing.length > 0) {
          await supabase
            .from('page_content')
            .update({ content_value: value })
            .eq('id', existing[0].id);
        } else {
          await supabase.from('page_content').insert({
            page_name: 'featured_authors',
            section_key: key,
            content_type: 'text',
            content_value: value
          });
        }
      }
      setEditingContent(false);
    } catch (error) {
      alert("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickEditAuthor = async () => {
    if (!editingAuthor) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('featured_authors')
        .update({
          name: editingAuthor.name,
          country: editingAuthor.country,
          background: editingAuthor.background
        })
        .eq('id', editingAuthor.id);

      if (error) throw error;
      await fetchData();
      setEditingAuthor(null);
    } catch (error) {
      alert("Failed to save author");
    } finally {
      setIsSaving(false);
    }
  };

  const renderAuthorCard = (author, provided, snapshot, sectionColor) => (
    <div ref={provided.innerRef} {...provided.draggableProps} className={snapshot.isDragging ? "opacity-50" : ""}>
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-red-100 cursor-pointer group relative">
        {isEditMode && (
          <>
            <div {...provided.dragHandleProps} className="absolute top-2 left-2 z-10 bg-white rounded p-1 shadow cursor-move">
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>
            <Button
              size="sm"
              onClick={(e) => { e.preventDefault(); setEditingAuthor(author); }}
              className="absolute top-2 right-2 z-10 bg-blue-600 hover:bg-blue-700 text-white"
              title="Quick Edit"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </>
        )}
        <Link to={createPageUrl(`AuthorProfile?id=${author.id}`)}>
          <div className={`h-2 bg-gradient-to-r ${sectionColor} transition-all`}></div>
          <div className="aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src={author.book_cover_image || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/93f1020a0_Screenshot2025-11-10at122947AM.png"}
              alt={`${author.name}'s forthcoming work`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
              {author.name}
            </CardTitle>
            {author.country && (
              <Badge className="mt-2 bg-red-100 text-red-700">
                <Globe className="w-3 h-3 mr-1" />
                {author.country}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="text-center pb-6">
            {author.background && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {author.background}
              </p>
            )}
            <div className="flex items-center justify-center gap-2 text-red-600 font-medium group-hover:underline">
              <span>View Full Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );

  const renderSection = (title, authors, sectionId, sectionColor, bgClass = "bg-white") => {
    const filtered = authors.filter(author => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        author.name?.toLowerCase().includes(query) ||
        author.country?.toLowerCase().includes(query) ||
        author.background?.toLowerCase().includes(query)
      );
    });

    return (
      <section className={`py-20 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
            {isEditMode && (
              <Button onClick={() => handleCreateAuthor(sectionId)} disabled={isCreating} className="bg-green-600 hover:bg-green-700">
                {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Author
              </Button>
            )}
          </div>

          {filtered.length === 0 && searchQuery ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No authors found matching "{searchQuery}"</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No authors in this section yet.</p>
            </div>
          ) : (
            <Droppable droppableId={sectionId} isDropDisabled={!isEditMode}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((author, index) => (
                    <Draggable key={author.id} draggableId={author.id} index={index} isDragDisabled={!isEditMode}>
                      {(provided, snapshot) => renderAuthorCard(author, provided, snapshot, sectionColor)}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </section>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div>
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-2xl rounded-lg p-3 border border-gray-200">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">Admin</span>
          <Button size="sm" variant={isEditMode ? "default" : "outline"} onClick={() => setIsEditMode(!isEditMode)} className={isEditMode ? "bg-blue-600 hover:bg-blue-700" : ""}>
            {isEditMode ? "Cancel" : "Edit Mode"}
          </Button>
          {isEditMode && (
            <>
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setEditingContent(true)}>
                <Pencil className="w-4 h-4 mr-1" />Edit Text
              </Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={handleSaveAll} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                Save All
              </Button>
            </>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{pageContent.hero_title}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">{pageContent.hero_subtitle}</p>

          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search authors by name, country, or background..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-5 text-lg border-red-200 focus:border-red-400 focus:ring-red-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Global Voices</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Diverse Perspectives</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Forthcoming Works</span>
            </div>
          </div>
        </div>
      </section>

      {/* Diversity Statement */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-red-100">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.diversity_title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{pageContent.diversity_text}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <DragDropContext onDragEnd={handleDragEnd}>
        {renderSection(pageContent.available_title, availableAuthors, "available_now", "from-red-600 to-red-700 group-hover:from-red-700 group-hover:to-red-800", "bg-white")}
        {renderSection(pageContent.upcoming_title, upcomingAuthors, "upcoming", "from-orange-600 to-red-600 group-hover:from-orange-700 group-hover:to-red-700", "bg-gradient-to-r from-red-50 to-cream-50")}
        {renderSection(pageContent.forthcoming_title, forthcoming2026Authors, "forthcoming_2026", "from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700", "bg-white")}
      </DragDropContext>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{pageContent.cta_title}</h2>
          <p className="text-xl text-gray-300 mb-8">{pageContent.cta_text}</p>
          <Link to={createPageUrl("Submission")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Submit Your Manuscript
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Edit Page Content Dialog */}
      <Dialog open={editingContent} onOpenChange={setEditingContent}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {[
              { key: "hero_title", label: "Hero Title", type: "input" },
              { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
              { key: "available_title", label: "Available Now Section Title", type: "input" },
              { key: "upcoming_title", label: "Upcoming Section Title", type: "input" },
              { key: "forthcoming_title", label: "Forthcoming 2026 Section Title", type: "input" },
              { key: "diversity_title", label: "Diversity Statement Title", type: "input" },
              { key: "diversity_text", label: "Diversity Statement Text", type: "textarea" },
              { key: "cta_title", label: "CTA Title", type: "input" },
              { key: "cta_text", label: "CTA Text", type: "textarea" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="text-sm font-medium">{label}</label>
                {type === "textarea" ? (
                  <Textarea rows={3} value={pageContent[key]} onChange={(e) => setPageContent(p => ({ ...p, [key]: e.target.value }))} />
                ) : (
                  <Input value={pageContent[key]} onChange={(e) => setPageContent(p => ({ ...p, [key]: e.target.value }))} />
                )}
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingContent(false)}>Cancel</Button>
              <Button onClick={handleSaveContent} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Edit Author Dialog */}
      <Dialog open={!!editingAuthor} onOpenChange={() => setEditingAuthor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quick Edit Author</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={editingAuthor?.name || ""} onChange={(e) => setEditingAuthor(a => ({ ...a, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <Input value={editingAuthor?.country || ""} onChange={(e) => setEditingAuthor(a => ({ ...a, country: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Background</label>
              <Textarea rows={6} value={editingAuthor?.background || ""} onChange={(e) => setEditingAuthor(a => ({ ...a, background: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingAuthor(null)}>Cancel</Button>
              <Button onClick={handleQuickEditAuthor} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
