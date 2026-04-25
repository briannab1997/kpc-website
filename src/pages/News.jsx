import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, Gamepad2, UserCheck, Lightbulb, BookOpen, TrendingUp, Star, Globe, CheckCircle,
  Plus, Pencil, Trash2, Loader2, Save, Upload, Calendar
} from "lucide-react";
import { format } from "date-fns";

const internGroups = [
  {
    title: "Game Design & Technical Innovation",
    icon: Gamepad2,
    color: "blue",
    description: "Shaping how we translate publishing processes into engaging, playable experiences.",
    interns: [
      { name: "Andru Tjalas", location: "Phoenix, Arizona, United States", contribution: "Approached design with a philosophical and strategic mindset, transforming complex concepts into actionable game mechanics while mentoring newer interns." },
      { name: "Carter Kappes", location: "Versailles, Indiana, United States", contribution: "Established the architectural foundation for our game projects, translating technical expertise into clear, practical applications and guiding peers." },
      { name: "Jake Albohn", location: "Kernersville, North Carolina, United States", contribution: "Demonstrated remarkable collaboration, navigating critical design decisions and ensuring team alignment with company values." },
      { name: "Natalie Clark", location: "United States", contribution: "Integrated narrative, pedagogy, and technical design to create immersive prototypes for staff onboarding and conference demos." },
      { name: "Arushi Saurabh", location: "Illinois, United States", contribution: "Brought curiosity and enthusiasm, contributing effectively to collaborative workflows." },
      { name: "Fenim Pauls", location: "Chennai, Tamil Nadu, India", contribution: "Applied creative problem-solving and technical innovation to enhance game mechanics and user experience design." },
      { name: "Vishnu Priyan Bhaskar", location: "Los Angeles, California, United States", contribution: "Contributed technical expertise and collaborative insights to strengthen the game development process." }
    ]
  },
  {
    title: "Recruitment & Author Engagement",
    icon: UserCheck,
    color: "green",
    description: "Strengthening the company's author outreach and engagement strategies.",
    interns: [
      { name: "Floriana Kpaku", location: "London, England, United Kingdom", contribution: "Mastered candidate evaluation and interview processes, bringing precision and reflection to every interaction." },
      { name: "Asal Moghadam", location: "Milan, Italy", contribution: "Enhanced the team's mentorship culture with emotional intelligence and thoughtful candidate engagement." },
      { name: "Melissa Davis", location: "Denver, Colorado, United States", contribution: "Applied structured training to refine author recruitment outreach, balancing ethical engagement with strategic networking." },
      { name: "Joshua Thibeault", location: "Portsmouth, New Hampshire, United States", contribution: "Expanded KPC's global reach, navigating international communications and building connections across multiple continents." }
    ]
  },
  {
    title: "Instructional Design & Research",
    icon: Lightbulb,
    color: "purple",
    description: "Elevating KPC's learning, research capabilities, and digital learning initiatives.",
    interns: [
      { name: "Jen Glaser", location: "Charlotte, North Carolina, United States", contribution: "Created visually engaging, research-informed instructional materials that enhanced internal workflows and branding." },
      { name: "Yitong Ye", location: "New York, New York, United States", contribution: "Conducted in-depth competitor analysis and user flow research, providing actionable insights for digital learning initiatives." }
    ]
  },
  {
    title: "Beta Reading & Writing Mentorship",
    icon: BookOpen,
    color: "orange",
    description: "Improving manuscript quality and supporting thoughtful editorial practices.",
    interns: [
      { name: "Curtis Jeter", location: "Spartanburg, South Carolina, United States", contribution: "Brought a keen eye for literature and reflective analysis to improve manuscript quality." }
    ]
  }
];

const colorClasses = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
};

const categoryLabels = {
  company_updates: "Company Updates",
  author_spotlight: "Author Spotlight",
  publishing_tips: "Publishing Tips",
  events: "Events",
  archived_2025: "2025 Archive"
};

export default function News() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [activeTab, setActiveTab] = useState("blog");
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('publication_date', { ascending: false });
      if (!error && data) {
        setBlogPosts(data);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePost = async () => {
    if (!editingPost.title || !editingPost.content) {
      alert("Please fill in title and content");
      return;
    }

    setIsSaving(true);
    try {
      if (editingPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(editingPost)
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            ...editingPost,
            publication_date: editingPost.publication_date || new Date().toISOString().split('T')[0]
          })
          .select()
          .single();
        if (error) throw error;
      }
      await fetchData();
      setEditingPost(null);
    } catch (error) {
      alert("Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const filePath = `news/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
      setEditingPost(post => ({ ...post, cover_image: urlData.publicUrl }));
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest from Kentish Publishing Company
          </p>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="blog">News & Blog</TabsTrigger>
          <TabsTrigger value="2025">2025 Internship</TabsTrigger>
        </TabsList>

        {/* Blog Posts Tab */}
        <TabsContent value="blog">
          {isAdmin && (
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")} className={selectedCategory === "all" ? "bg-red-600 hover:bg-red-700" : ""}>All</Button>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <Button key={key} size="sm" variant={selectedCategory === key ? "default" : "outline"} onClick={() => setSelectedCategory(key)} className={selectedCategory === key ? "bg-red-600 hover:bg-red-700" : ""}>{label}</Button>
                ))}
              </div>
              <Button onClick={() => setEditingPost({ category: "company_updates", is_published: true })} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />New Post
              </Button>
            </div>
          )}

          {!isAdmin && (
            <div className="flex gap-2 flex-wrap mb-8 justify-center">
              <Button size="sm" variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")} className={selectedCategory === "all" ? "bg-red-600 hover:bg-red-700" : ""}>All</Button>
              {Object.entries(categoryLabels).filter(([key]) => key !== "archived_2025").map(([key, label]) => (
                <Button key={key} size="sm" variant={selectedCategory === key ? "default" : "outline"} onClick={() => setSelectedCategory(key)} className={selectedCategory === key ? "bg-red-600 hover:bg-red-700" : ""}>{label}</Button>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No posts yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-2xl transition-shadow border-red-100">
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-red-100 text-red-700">{categoryLabels[post.category] || post.category}</Badge>
                      {post.publication_date && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {format(new Date(post.publication_date), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                    {isAdmin && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => setEditingPost(post)}>
                          <Pencil className="w-3 h-3 mr-1" />Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3 h-3 mr-1" />Delete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 2025 Internship Tab */}
        <TabsContent value="2025">
          <div className="bg-white">
            <section className="py-12 bg-cream-50 rounded-lg mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Globe className="w-16 h-16 mx-auto text-red-700 mb-6" />
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Impact: Summer 2025 Internship</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This summer, Kentish Publishing Company welcomed a diverse cohort of interns from across five continents, fostering a global collaborative experience from London to Los Angeles.
                </p>
              </div>
            </section>

            <section className="py-8 bg-white border-y border-gray-200 mb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="p-6">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">5 Continents</h3>
                    <p className="text-gray-600">North America, Europe, Asia</p>
                  </div>
                  <div className="p-6">
                    <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">12+ Interns</h3>
                    <p className="text-gray-600">From diverse academic backgrounds</p>
                  </div>
                  <div className="p-6">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">24/7 Collaboration</h3>
                    <p className="text-gray-600">Across multiple time zones</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Honoring Our Summer 2025 Interns</h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                    This summer, our interns not only contributed to key projects but also grew into leaders and mentors. From innovative game design to global author recruitment, their impact was exceptional.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-12 bg-gray-50 rounded-lg mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {internGroups.map((group) => {
                  const colors = colorClasses[group.color];
                  return (
                    <Card key={group.title} className="shadow-lg border overflow-hidden">
                      <CardHeader className={`p-8 border-b ${colors.border} ${colors.bg}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${colors.bg} border-2 ${colors.border}`}>
                            <group.icon className={`w-8 h-8 ${colors.text}`} />
                          </div>
                          <div>
                            <CardTitle className={`text-2xl font-bold ${colors.text}`}>{group.title}</CardTitle>
                            <p className="text-gray-600">{group.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">Individual Contributions</h4>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                          {group.interns.map((intern) => (
                            <div key={intern.name} className="flex items-start space-x-3">
                              <CheckCircle className={`w-5 h-5 ${colors.text} mt-1 flex-shrink-0`} />
                              <div>
                                <p className="font-semibold text-gray-900">{intern.name}</p>
                                <p className="text-sm text-gray-500 italic mb-1">{intern.location}</p>
                                <p className="text-sm text-gray-600 leading-normal">{intern.contribution}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section className="py-16 bg-gray-800 text-white rounded-lg mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Star className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-3xl font-bold mb-4">From Interns to Mentors: The Genius Network</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                  All Summer 2025 interns participated in specialized training, earning promotion to mentors within The Genius Network - a community dedicated to guiding new interns and sharing expertise across disciplines.
                </p>
                <div className="grid md:grid-cols-2 gap-8 items-center text-left">
                  <div className="text-gray-300 space-y-4">
                    <p>This progression reflects not only their personal development but also strengthens KPC's talent pipeline and mentorship culture, ensuring that knowledge, creativity, and professionalism continue to thrive.</p>
                    <p>Mentors play a crucial role in onboarding new talent and leading innovation initiatives.</p>
                  </div>
                  <Card className="bg-gray-700/50 border-gray-600 text-white">
                    <CardHeader><CardTitle>Network Growth</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between"><span>Mentorship Hours</span><span className="font-bold text-yellow-400">500+</span></div>
                      <div className="flex items-center justify-between"><span>Cross-Department Projects</span><span className="font-bold text-yellow-400">15</span></div>
                      <div className="flex items-center justify-between"><span>Innovation Initiatives Led</span><span className="font-bold text-yellow-400">8</span></div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="py-16 bg-white rounded-lg mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="border shadow-lg">
                  <CardHeader className="bg-green-50 border-b border-green-200 p-8">
                    <div className="flex items-center space-x-4">
                      <TrendingUp className="w-10 h-10 text-green-600" />
                      <div>
                        <CardTitle className="text-2xl text-green-800">Company Growth & Impact</CardTitle>
                        <p className="text-gray-600">The cohort's contributions extended beyond individual projects.</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        "Streamlined workflows and improved project quality across departments.",
                        "Expanded KPC's global reach through innovative game design and international recruitment.",
                        "Enhanced research, instructional materials, and narrative projects with lasting impact.",
                        "Cemented a sustainable mentorship ecosystem for the next generation of interns."
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="py-12 bg-cream-50 rounded-lg">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xl text-gray-700 leading-relaxed">
                  Kentish Publishing Company is proud to recognize the achievements of our Summer 2025 interns. Their curiosity, creativity, and dedication have not only propelled their own growth but also advanced the company's mission to <span className="text-red-700 font-semibold">innovate, educate, and inspire</span>.
                </p>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editingPost?.title || ""}
                onChange={(e) => setEditingPost(post => ({ ...post, title: e.target.value }))}
                placeholder="Post title"
              />
            </div>

            <div>
              <Label>Category</Label>
              <select
                className="w-full border rounded px-3 py-2"
                value={editingPost?.category || "company_updates"}
                onChange={(e) => setEditingPost(post => ({ ...post, category: e.target.value }))}
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Publication Date</Label>
              <Input
                type="date"
                value={editingPost?.publication_date || ""}
                onChange={(e) => setEditingPost(post => ({ ...post, publication_date: e.target.value }))}
              />
            </div>

            <div>
              <Label>Cover Image</Label>
              {editingPost?.cover_image && (
                <img src={editingPost.cover_image} alt="Cover" className="w-full max-w-md mb-4 rounded" />
              )}
              <div className="flex gap-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="cover-upload" />
                <label htmlFor="cover-upload" className="flex-1">
                  <Button type="button" variant="outline" className="w-full" disabled={uploadingImage} asChild>
                    <span>
                      {uploadingImage ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {uploadingImage ? "Uploading..." : "Upload Image"}
                    </span>
                  </Button>
                </label>
                {editingPost?.cover_image && (
                  <Button variant="ghost" onClick={() => setEditingPost(post => ({ ...post, cover_image: "" }))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Label>Content</Label>
              <Textarea
                value={editingPost?.content || ""}
                onChange={(e) => setEditingPost(post => ({ ...post, content: e.target.value }))}
                rows={12}
                placeholder="Write your post content here..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button>
              <Button onClick={handleSavePost} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
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
