import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X, Users, Lightbulb, BookOpen, Award, Globe, ArrowRight, Plus, Pencil, Trash2, Save, Loader2, Upload, Search, Filter, Copy, GripVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function GeniusMentorshipNetwork() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [customContent, setCustomContent] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("all");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('mentor_profiles')
        .select('*')
        .order('display_order');
      if (!error && profiles) {
        setMentors(profiles.filter(p => p.profile_type === "mentor" && p.is_active));
        setMentees(profiles.filter(p => p.profile_type === "mentee" && p.is_active));
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }

    try {
      const { data: content, error } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('page_name', 'genius_mentorship_network')
        .order('display_order');
      if (!error && content) {
        setCustomContent(content.filter(c => c.is_active !== false));
      }
    } catch (error) {
      console.error("Error fetching custom content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (e, type = "photo") => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const filePath = `mentor/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
      const file_url = urlData.publicUrl;

      if (type === "large") {
        setEditingProfile(p => ({ ...p, large_photo_url: file_url }));
      } else if (type === "content") {
        setEditingContent(c => ({ ...c, image_url: file_url }));
      } else {
        setEditingProfile(p => ({ ...p, photo_url: file_url }));
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddBookArticle = () => {
    setEditingProfile(p => ({
      ...p,
      books_articles: [...(p.books_articles || []), { title: "", type: "book", url: "", year: "" }]
    }));
  };

  const handleUpdateBookArticle = (index, field, value) => {
    const updated = [...(editingProfile.books_articles || [])];
    updated[index][field] = value;
    setEditingProfile(p => ({ ...p, books_articles: updated }));
  };

  const handleRemoveBookArticle = (index) => {
    const updated = [...(editingProfile.books_articles || [])];
    updated.splice(index, 1);
    setEditingProfile(p => ({ ...p, books_articles: updated }));
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) return;
    setIsSaving(true);
    try {
      if (editingProfile.id) {
        const { error } = await supabase
          .from('mentor_profiles')
          .update(editingProfile)
          .eq('id', editingProfile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('mentor_profiles')
          .insert({
            ...editingProfile,
            display_order: editingProfile.profile_type === "mentor" ? mentors.length : mentees.length
          })
          .select()
          .single();
        if (error) throw error;
      }
      await fetchData();
      setEditingProfile(null);
    } catch (error) {
      alert("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (!confirm("Delete this profile?")) return;
    try {
      const { error } = await supabase.from('mentor_profiles').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      alert("Failed to delete profile");
    }
  };

  const handleAddExpertise = () => {
    setEditingProfile(p => ({
      ...p,
      expertise_areas: [...(p.expertise_areas || []), ""]
    }));
  };

  const handleUpdateExpertise = (index, value) => {
    const updated = [...(editingProfile.expertise_areas || [])];
    updated[index] = value;
    setEditingProfile(p => ({ ...p, expertise_areas: updated }));
  };

  const handleRemoveExpertise = (index) => {
    const updated = [...(editingProfile.expertise_areas || [])];
    updated.splice(index, 1);
    setEditingProfile(p => ({ ...p, expertise_areas: updated }));
  };

  const handleSaveCustomContent = async () => {
    if (!editingContent) return;
    setIsSaving(true);
    try {
      const blockData = {
        page_name: "genius_mentorship_network",
        section_id: editingContent.section_id || `section_${Date.now()}`,
        title: editingContent.title,
        content: editingContent.content,
        image_url: editingContent.image_url,
        text_color: editingContent.text_color,
        background_color: editingContent.background_color,
        font_family: editingContent.font_family,
        font_size: editingContent.font_size,
        display_order: editingContent.display_order ?? customContent.length,
        is_active: true
      };

      if (editingContent.id) {
        const { error } = await supabase
          .from('content_blocks')
          .update(blockData)
          .eq('id', editingContent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('content_blocks')
          .insert(blockData)
          .select()
          .single();
        if (error) throw error;
      }
      await fetchData();
      setEditingContent(null);
    } catch (error) {
      alert("Failed to save content block");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCustomContent = async (id) => {
    if (!confirm("Delete this content block?")) return;
    try {
      const { error } = await supabase.from('content_blocks').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      alert("Failed to delete content block");
    }
  };

  const openContentDialog = (block = null) => {
    setEditingContent(block || {
      title: "",
      content: "",
      image_url: "",
      text_color: "",
      background_color: "",
      font_family: "",
      font_size: "",
      display_order: customContent.length
    });
  };

  const handleDuplicateBlock = async (block) => {
    setIsSaving(true);
    try {
      const { id, ...blockWithoutId } = block;
      const duplicatedBlock = {
        ...blockWithoutId,
        title: block.title ? `${block.title} (Copy)` : "",
        display_order: customContent.length
      };
      const { error } = await supabase
        .from('content_blocks')
        .insert(duplicatedBlock)
        .select()
        .single();
      if (error) throw error;
      await fetchData();
    } catch (error) {
      alert("Failed to duplicate block");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragEndContent = async (result) => {
    if (!result.destination) return;

    const items = Array.from(customContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    items.forEach((item, index) => {
      item.display_order = index;
    });

    setCustomContent(items);
  };

  const handleSaveContentOrder = async () => {
    setIsSaving(true);
    try {
      for (const block of customContent) {
        await supabase
          .from('content_blocks')
          .update({ display_order: block.display_order })
          .eq('id', block.id);
      }
      alert("Content order saved!");
      setIsEditMode(false);
    } catch (error) {
      alert("Failed to save order");
    } finally {
      setIsSaving(false);
    }
  };

  const allExpertiseAreas = [...new Set([...mentors, ...mentees]
    .flatMap(p => p.expertise_areas || [])
    .filter(Boolean)
  )].sort();

  const filterProfiles = (profiles) => {
    return profiles.filter(profile => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        profile.name?.toLowerCase().includes(query) ||
        profile.title?.toLowerCase().includes(query) ||
        profile.description?.toLowerCase().includes(query) ||
        profile.expertise_areas?.some(e => e.toLowerCase().includes(query));

      const matchesExpertise = expertiseFilter === "all" ||
        profile.expertise_areas?.includes(expertiseFilter);

      return matchesSearch && matchesExpertise;
    });
  };

  const ProfileCard = ({ profile, type }) => (
    <Card className="hover:shadow-lg transition-shadow border-red-100 relative group">
      {isAdmin && (
        <div className="absolute -right-2 -top-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white" onClick={(e) => { e.preventDefault(); setEditingProfile(profile); }}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); handleDeleteProfile(profile.id); }}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-4 border-red-50">
            {profile.photo_url ? (
              <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Users className="w-16 h-16" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Link to={createPageUrl(`MentorProfileDetail?id=${profile.id}`)}>
              <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-red-600 transition-colors cursor-pointer">
                {profile.name}
              </h3>
            </Link>
            {profile.title && <p className="text-sm text-red-600 font-semibold mb-2">{profile.title}</p>}
            {profile.description && <p className="text-gray-700 text-sm mb-3">{profile.description}</p>}
            {profile.expertise_areas && profile.expertise_areas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.expertise_areas.map((area, idx) => (
                  <Badge key={idx} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {area}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        {profile.biography && (
          <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-3">{profile.biography}</p>
        )}
      </CardContent>
    </Card>
  );

  const membershipTiers = [
    {
      name: "Mentee Membership",
      price: "$7/month or $84/year",
      description: "Receive structured, one-to-one mentorship with a dedicated mentor. Mentees gain full access to the private portal, Thought Lab, virtual events, and publishing opportunities through Kentish Publishing Company.",
      features: [
        { text: "One mentor assigned per mentee", included: true },
        { text: "Full portal access", included: true },
        { text: "Thought Lab (IP-aware workspace)", included: true },
        { text: "Co-writing & publishing eligibility", included: true },
        { text: "Virtual events & workshops", included: true },
        { text: "Application required", included: true }
      ],
      cta: "Apply as Mentee",
      ctaNote: "Applications are reviewed to ensure alignment and fit.",
      ctaLink: "https://wise.com/pay/business/kentishpublishingcompany",
      color: "red"
    },
    {
      name: "Insight Pass",
      price: "$12/month or $144/year",
      description: "For those who want visibility and learning without mentorship participation. The Insight Pass offers access to educational content and behind-the-scenes insights from The Genius Network.",
      features: [
        { text: "One-to-one mentorship", included: false },
        { text: "Private portal access", included: false },
        { text: "Thought Lab access", included: false },
        { text: "Webinars & educational content", included: true },
        { text: "Behind-the-scenes updates", included: true },
        { text: "Application required", included: false }
      ],
      cta: "Get Insight Pass",
      ctaNote: "Does not include mentorship, Thought Lab access, or portal participation.",
      ctaLink: "https://wise.com/pay/business/kentishpublishingcompany",
      color: "indigo",
      featured: true
    },
    {
      name: "Mentor Membership",
      price: "Free",
      description: "Share your expertise by guiding the next generation of creators, researchers, and innovators. Mentors contribute through one-to-one guidance, collaborative projects, and thought leadership within an ethical, first-class ecosystem.",
      features: [
        { text: "One-to-one mentorship (as mentor)", included: true },
        { text: "Private portal access", included: true },
        { text: "Thought Lab participation", included: true },
        { text: "Virtual events & workshops", included: true },
        { text: "Co-authoring & publishing opportunities", included: true },
        { text: "Application required", included: true }
      ],
      cta: "Apply as Mentor",
      ctaNote: "Mentors are selected based on experience, values, and commitment.",
      ctaLink: "https://wise.com/pay/business/kentishpublishingcompany",
      color: "gray"
    }
  ];

  const guidanceBooks = [
    {
      title: "The Ethical CEO",
      author: "Dr. Esther Ruth Kentish",
      description: "A comprehensive guide to ethical leadership and decision-making in modern business."
    },
    {
      title: "Business Ethics & Leadership",
      author: "Various Authors",
      description: "Essential reading for those building ethical, sustainable organizations."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-cream-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg">
              <Lightbulb className="w-6 h-6" />
              <span className="font-semibold text-lg">The Genius Mentorship Network</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Quality over scale. Depth over volume.</h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Mentorship designed for serious ideas.
          </p>
          <p className="text-lg text-red-600 font-semibold mt-4">
            Ethical guidance. Protected creation. Real outcomes.
          </p>
        </div>

        {/* Custom Content Sections */}
        {customContent.length > 0 && (
          <section className="space-y-12 mb-16">
            {isAdmin && isEditMode && (
              <div className="flex justify-end mb-4">
                <Button onClick={handleSaveContentOrder} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />Save Order
                </Button>
              </div>
            )}
            <DragDropContext onDragEnd={handleDragEndContent}>
              <Droppable droppableId="content-blocks" isDropDisabled={!isEditMode}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-12">
                    {customContent.map((block, index) => (
                      <Draggable key={block.id} draggableId={block.id} index={index} isDragDisabled={!isEditMode}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`relative group ${snapshot.isDragging ? 'opacity-50' : ''}`}
                          >
                            {isAdmin && (
                              <div className="absolute -right-2 -top-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {isEditMode && (
                                  <div {...provided.dragHandleProps} className="bg-white rounded p-1 shadow cursor-move">
                                    <GripVertical className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                                <Button size="sm" className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white" onClick={() => handleDuplicateBlock(block)} title="Duplicate">
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button size="sm" className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setEditingContent(block)}>
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDeleteCustomContent(block.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}

                            <Card
                              className="overflow-hidden"
                              style={{
                                backgroundColor: block.background_color || 'white',
                                color: block.text_color || 'inherit'
                              }}
                            >
                              <CardContent className="p-8">
                                {block.title && (
                                  <h2
                                    className="text-3xl font-bold mb-6"
                                    style={{
                                      fontFamily: block.font_family || 'inherit',
                                      fontSize: block.font_size || 'inherit',
                                      color: block.text_color || 'inherit'
                                    }}
                                  >
                                    {block.title}
                                  </h2>
                                )}

                                {block.image_url && (
                                  <div className="mb-6">
                                    {block.image_url.includes('.mp4') || block.image_url.includes('.webm') || block.image_url.includes('youtube.com') || block.image_url.includes('vimeo.com') ? (
                                      block.image_url.includes('youtube.com') || block.image_url.includes('vimeo.com') ? (
                                        <div className="aspect-video">
                                          <iframe
                                            src={block.image_url}
                                            className="w-full h-full rounded-lg"
                                            allowFullScreen
                                          />
                                        </div>
                                      ) : (
                                        <video src={block.image_url} controls className="w-full max-w-3xl mx-auto rounded-lg shadow-lg" />
                                      )
                                    ) : (
                                      <img
                                        src={block.image_url}
                                        alt={block.title || 'Content image'}
                                        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                                      />
                                    )}
                                  </div>
                                )}

                                {block.content && (
                                  <div
                                    className="prose prose-lg max-w-none"
                                    style={{
                                      fontFamily: block.font_family || 'inherit',
                                      fontSize: block.font_size || 'inherit',
                                      color: block.text_color || 'inherit'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: block.content.replace(/\n/g, '<br />') }}
                                  />
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>
        )}

        {/* Introduction */}
        <section className="mb-16">
          <Card className="shadow-lg border-red-100">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Genius Network is a curated mentorship ecosystem designed to transform ideas into books, intellectual property, and long-term careers. Built for individuals who seek depth rather than volume, the network operates on a precise and intentional model that prioritizes ethical guidance, creative rigor, and real-world outcomes. Rather than offering surface-level advice or crowded mentorship programs, The Genius Network focuses on sustained relationships and meaningful creation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At the core of the network is a simple but powerful structure: one mentor per mentee. Each mentee is paired with a single, dedicated mentor, allowing for deep focus, genuine investment, and long-term partnership. This model ensures that mentorship extends beyond isolated meetings and instead becomes an ongoing process of growth, accountability, and collaboration. Mentors are able to guide with care and intention, while mentees receive consistent support tailored to their goals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mentorship within The Genius Network is designed to lead to tangible work. Mentors and mentees collaborate on co-writing books, essays, and research-driven projects, with clear attention to authorship, attribution, and intellectual property protection. Many of these works are published through Kentish Publishing Company, the network's publishing partner, which provides professional editing, production, and international distribution. The publishing pathway transforms mentorship into lasting, visible outcomes.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Users className="w-6 h-6" />
                  Global Virtual Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The network hosts virtual events and meetups that support community learning without sacrificing quality. These include curated panels, workshops, and question-and-answer sessions that are intentionally small enough to allow real interaction. By removing geographic barriers, The Genius Network brings together a global community while maintaining a standard of thoughtful engagement and intellectual care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600">
                  <Lightbulb className="w-6 h-6" />
                  The Thought Lab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  A defining feature of the ecosystem is the Thought Lab, an IP-aware workspace where ideas are treated as valuable intellectual assets. Within the Thought Lab, members develop concepts that may evolve into patents, proprietary methodologies, or protected creative work. Clear ethical guidelines govern collaboration, ensuring that ideas are respected, contributions are documented, and ownership is taken seriously.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <BookOpen className="w-6 h-6" />
                  Publishing Partnership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The Genius Network functions as part of a broader ecosystem that integrates mentorship and publishing. The Genius Network (GenWork) serves as the mentorship and innovation arm, while Kentish Publishing Company acts as the publishing infrastructure that nurtures, edits, and releases completed work. Together, they create a seamless pathway from guided development to public-facing publication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600">
                  <Award className="w-6 h-6" />
                  Internal Growth Loop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  An important dimension of the network is its internal growth loop. Some individuals who began as interns or collaborators with Kentish Publishing Company have grown into experienced professionals and now return as mentors within The Genius Network. This continuity reinforces a culture of stewardship, where experience is passed forward and knowledge is reinvested in the next generation of creators and innovators.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Meet Our Community */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Community</h2>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name, title, expertise, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-red-200 focus:border-red-400 focus:ring-red-400"
              />
            </div>

            <div className="flex items-center gap-4 justify-center flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Filter by Expertise:</span>
              </div>
              <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="All Expertise Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise Areas</SelectItem>
                  {allExpertiseAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {expertiseFilter !== "all" && (
                <Button variant="ghost" size="sm" onClick={() => setExpertiseFilter("all")}>
                  Clear Filter
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="mentors" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="mentors">Our Mentors</TabsTrigger>
              <TabsTrigger value="mentees">Our Mentees</TabsTrigger>
            </TabsList>

            <TabsContent value="mentors">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Experienced professionals guiding the next generation</p>
                {isAdmin && (
                  <Button onClick={() => setEditingProfile({ profile_type: "mentor", name: "", expertise_areas: [] })} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />Add Mentor
                  </Button>
                )}
              </div>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                </div>
              ) : filterProfiles(mentors).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>{mentors.length === 0 ? "No mentors yet" : "No mentors found matching your filters"}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filterProfiles(mentors).map(mentor => <ProfileCard key={mentor.id} profile={mentor} type="mentor" />)}
                </div>
              )}
            </TabsContent>

            <TabsContent value="mentees">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Talented individuals on their journey of growth</p>
                {isAdmin && (
                  <Button onClick={() => setEditingProfile({ profile_type: "mentee", name: "", expertise_areas: [] })} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />Add Mentee
                  </Button>
                )}
              </div>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                </div>
              ) : filterProfiles(mentees).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>{mentees.length === 0 ? "No mentees yet" : "No mentees found matching your filters"}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filterProfiles(mentees).map(mentee => <ProfileCard key={mentee.id} profile={mentee} type="mentee" />)}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Guidance Books Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-50 to-indigo-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Recommended Guidance for Members</h2>
            <p className="text-center text-gray-700 mb-8">Essential reading from our published authors to guide your journey in The Genius Network</p>
            <div className="grid md:grid-cols-2 gap-6">
              {guidanceBooks.map((book, index) => (
                <Card key={index} className="border-red-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-10 h-10 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{book.description}</p>
                        <Link to={createPageUrl("Books")}>
                          <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                            View in Catalog
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Choose Your Path</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Membership within The Genius Network is structured to meet different levels of engagement.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <Card key={index} className={`${tier.featured ? 'border-2 border-indigo-600 shadow-2xl relative' : 'border-gray-200'}`}>
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-red-600 mt-2">{tier.price}</div>
                  <CardDescription className="mt-4 text-gray-600">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-900" : "text-gray-400 line-through"}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a href={tier.ctaLink} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full ${tier.featured ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                      {tier.cta}
                    </Button>
                  </a>
                  <p className="text-xs text-gray-500 mt-3 text-center">{tier.ctaNote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Join */}
        <section className="mb-16">
          <div className="bg-gray-900 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Join The Genius Network</h2>
            <p className="text-center text-gray-300 mb-8 text-lg">
              Joining The Genius Network is intentionally simple and intentionally selective.
            </p>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Choose your path</h3>
                <p className="text-gray-300 text-sm">Apply as a mentee, apply as a mentor, or select the Insight Pass.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Submit your application</h3>
                <p className="text-gray-300 text-sm">Mentee and mentor applications are reviewed. Insight Pass access is immediate.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Enter the ecosystem</h3>
                <p className="text-gray-300 text-sm">Approved members receive access to the portal, events, and collaboration spaces.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">Begin guided growth</h3>
                <p className="text-gray-300 text-sm">Engage in mentorship, develop ideas, collaborate, and participate in events.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wise.com/pay/business/kentishpublishingcompany" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">Apply as Mentee</Button>
              </a>
              <a href="https://wise.com/pay/business/kentishpublishingcompany" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">Get Insight Pass</Button>
              </a>
              <a href="https://wise.com/pay/business/kentishpublishingcompany" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white border-white text-black hover:bg-gray-100">Apply as Mentor</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Profile Edit Dialog */}
        <Dialog open={!!editingProfile} onOpenChange={() => setEditingProfile(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProfile?.id ? `Edit ${editingProfile.profile_type === "mentor" ? "Mentor" : "Mentee"}` : `Add ${editingProfile?.profile_type === "mentor" ? "Mentor" : "Mentee"}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={editingProfile?.name || ""}
                  onChange={(e) => setEditingProfile(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>

              <div>
                <Label>Profile Photo (Regular)</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "photo")}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="flex-1">
                    <Button type="button" variant="outline" className="w-full text-gray-900" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        {isUploading ? "Uploading..." : "Upload Photo"}
                      </span>
                    </Button>
                  </label>
                </div>
                {editingProfile?.photo_url && (
                  <div className="mt-2">
                    <img src={editingProfile.photo_url} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <Label>Large Profile Photo (Detail Page)</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "large")}
                    className="hidden"
                    id="large-photo-upload"
                  />
                  <label htmlFor="large-photo-upload" className="flex-1">
                    <Button type="button" variant="outline" className="w-full text-gray-900" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        {isUploading ? "Uploading..." : "Upload Large Photo"}
                      </span>
                    </Button>
                  </label>
                </div>
                {editingProfile?.large_photo_url && (
                  <div className="mt-2">
                    <img src={editingProfile.large_photo_url} alt="Large Preview" className="w-32 h-32 rounded-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <Label>Title/Role</Label>
                <Input
                  value={editingProfile?.title || ""}
                  onChange={(e) => setEditingProfile(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g., Published Author, Creative Writer"
                />
              </div>

              <div>
                <Label>Short Description</Label>
                <Textarea
                  value={editingProfile?.description || ""}
                  onChange={(e) => setEditingProfile(p => ({ ...p, description: e.target.value }))}
                  placeholder="A brief tagline or summary"
                  rows={2}
                />
              </div>

              <div>
                <Label>Biography</Label>
                <Textarea
                  value={editingProfile?.biography || ""}
                  onChange={(e) => setEditingProfile(p => ({ ...p, biography: e.target.value }))}
                  placeholder="Full biography"
                  rows={5}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Areas of Expertise/Interest</Label>
                  <Button type="button" size="sm" variant="outline" className="text-gray-900" onClick={handleAddExpertise}>
                    <Plus className="w-4 h-4 mr-1" />Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {(editingProfile?.expertise_areas || []).map((area, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={area}
                        onChange={(e) => handleUpdateExpertise(idx, e.target.value)}
                        placeholder="e.g., Fiction Writing, Poetry"
                      />
                      <Button type="button" size="sm" variant="ghost" onClick={() => handleRemoveExpertise(idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Contact Email {editingProfile?.profile_type === "mentor" && "(For Mentors)"}</Label>
                <Input
                  type="email"
                  value={editingProfile?.email || ""}
                  onChange={(e) => setEditingProfile(p => ({ ...p, email: e.target.value }))}
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <Label>Website URL</Label>
                <Input
                  value={editingProfile?.website || ""}
                  onChange={(e) => setEditingProfile(p => ({ ...p, website: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label>Social Media Links</Label>
                <div className="space-y-2">
                  <Input
                    value={editingProfile?.social_media?.twitter || ""}
                    onChange={(e) => setEditingProfile(p => ({ ...p, social_media: { ...(p.social_media || {}), twitter: e.target.value } }))}
                    placeholder="Twitter/X URL"
                  />
                  <Input
                    value={editingProfile?.social_media?.linkedin || ""}
                    onChange={(e) => setEditingProfile(p => ({ ...p, social_media: { ...(p.social_media || {}), linkedin: e.target.value } }))}
                    placeholder="LinkedIn URL"
                  />
                  <Input
                    value={editingProfile?.social_media?.instagram || ""}
                    onChange={(e) => setEditingProfile(p => ({ ...p, social_media: { ...(p.social_media || {}), instagram: e.target.value } }))}
                    placeholder="Instagram URL"
                  />
                  <Input
                    value={editingProfile?.social_media?.facebook || ""}
                    onChange={(e) => setEditingProfile(p => ({ ...p, social_media: { ...(p.social_media || {}), facebook: e.target.value } }))}
                    placeholder="Facebook URL"
                  />
                </div>
              </div>

              {editingProfile?.profile_type === "mentor" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Books Written / Articles Posted</Label>
                    <Button type="button" size="sm" variant="outline" className="text-gray-900" onClick={handleAddBookArticle}>
                      <Plus className="w-4 h-4 mr-1" />Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(editingProfile?.books_articles || []).map((item, idx) => (
                      <Card key={idx} className="p-3">
                        <div className="space-y-2">
                          <Input
                            value={item.title}
                            onChange={(e) => handleUpdateBookArticle(idx, "title", e.target.value)}
                            placeholder="Title"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={item.type}
                              onChange={(e) => handleUpdateBookArticle(idx, "type", e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                              <option value="book">Book</option>
                              <option value="article">Article</option>
                            </select>
                            <Input
                              value={item.year}
                              onChange={(e) => handleUpdateBookArticle(idx, "year", e.target.value)}
                              placeholder="Year"
                            />
                          </div>
                          <Input
                            value={item.url}
                            onChange={(e) => handleUpdateBookArticle(idx, "url", e.target.value)}
                            placeholder="URL (optional)"
                          />
                          <Button type="button" size="sm" variant="ghost" onClick={() => handleRemoveBookArticle(idx)}>
                            <Trash2 className="w-4 h-4 mr-1" />Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" className="text-gray-900" onClick={() => setEditingProfile(null)}>Cancel</Button>
                <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white">
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Closing Statement */}
        <section className="text-center mb-16">
          <Card className="bg-gradient-to-r from-red-50 to-indigo-50 border-red-100">
            <CardContent className="p-8">
              <Globe className="w-16 h-16 mx-auto text-red-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                The Genius Network is intentionally small, deliberately selective, and fiercely protective of the people and ideas within it.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Its guiding principles are fairness, precision, and care. Brilliant people are not exploited, mentorship is not performative, and collaborations honor both experience and originality. The network values quality over scale and depth over visibility.
              </p>
              <p className="text-gray-700 mb-4">
                For those ready to grow, guide, or meaningfully engage, The Genius Network offers a structured and ethical environment where ideas are taken seriously and supported from conception to realization.
              </p>
              <p className="text-sm text-gray-600 italic">
                The Genius Network is operated by GenWork, with Kentish Publishing Company as its publishing partner. Together, they form an integrated system that supports mentorship, authorship, and intellectual development with clarity, accountability, and purpose.
              </p>
            </CardContent>
          </Card>
        </section>

        {isAdmin && (
          <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-2xl rounded-lg p-3 border border-gray-200">
            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">Admin</span>
            {customContent.length > 0 && (
              <Button
                size="sm"
                variant={isEditMode ? "default" : "outline"}
                onClick={() => setIsEditMode(!isEditMode)}
                className={isEditMode ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {isEditMode ? "Cancel Reorder" : "Reorder Blocks"}
              </Button>
            )}
            <Button onClick={() => openContentDialog()} className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        )}

        {/* Content Editor Dialog */}
        <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContent?.id ? "Edit Content Section" : "Add Content Section"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title (optional)</Label>
                <Input
                  value={editingContent?.title || ""}
                  onChange={(e) => setEditingContent(c => ({ ...c, title: e.target.value }))}
                  placeholder="Section title"
                />
              </div>

              <div>
                <Label>Content</Label>
                <Textarea
                  value={editingContent?.content || ""}
                  onChange={(e) => setEditingContent(c => ({ ...c, content: e.target.value }))}
                  placeholder="Write your content here..."
                  rows={8}
                />
              </div>

              <div>
                <Label>Image or Video</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handlePhotoUpload(e, "content")}
                    className="hidden"
                    id="content-media-upload"
                  />
                  <label htmlFor="content-media-upload" className="flex-1">
                    <Button type="button" variant="outline" className="w-full text-gray-900" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        {isUploading ? "Uploading..." : "Upload Media"}
                      </span>
                    </Button>
                  </label>
                </div>
                {editingContent?.image_url && (
                  <div className="mt-4">
                    {editingContent.image_url.includes('.mp4') || editingContent.image_url.includes('.webm') ? (
                      <video src={editingContent.image_url} controls className="w-full max-w-md rounded" />
                    ) : editingContent.image_url.includes('youtube.com') || editingContent.image_url.includes('vimeo.com') ? (
                      <div className="aspect-video max-w-md">
                        <iframe src={editingContent.image_url} className="w-full h-full rounded" allowFullScreen />
                      </div>
                    ) : (
                      <img src={editingContent.image_url} alt="Preview" className="w-full max-w-md rounded" />
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">Or paste a URL (image, video, or YouTube/Vimeo embed):</p>
                <Input
                  value={editingContent?.image_url || ""}
                  onChange={(e) => setEditingContent(c => ({ ...c, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg or video URL"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Text Color</Label>
                  <Input
                    type="color"
                    value={editingContent?.text_color || "#000000"}
                    onChange={(e) => setEditingContent(c => ({ ...c, text_color: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={editingContent?.background_color || "#ffffff"}
                    onChange={(e) => setEditingContent(c => ({ ...c, background_color: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Font Family</Label>
                  <Input
                    value={editingContent?.font_family || ""}
                    onChange={(e) => setEditingContent(c => ({ ...c, font_family: e.target.value }))}
                    placeholder="e.g., Arial, Georgia"
                  />
                </div>
                <div>
                  <Label>Font Size</Label>
                  <Input
                    value={editingContent?.font_size || ""}
                    onChange={(e) => setEditingContent(c => ({ ...c, font_size: e.target.value }))}
                    placeholder="e.g., 16px, 1.2rem"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" className="text-gray-900" onClick={() => setEditingContent(null)}>Cancel</Button>
                <Button onClick={handleSaveCustomContent} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white">
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
