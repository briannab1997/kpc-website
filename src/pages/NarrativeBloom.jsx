import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Check, Plus, Pencil, Trash2, Save, Loader2, Video, Upload } from "lucide-react";

export default function NarrativeBloom() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [isEditMode, setIsEditMode] = useState(false);
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', 'narrative_bloom_videos')
        .order('display_order');
      if (!error && data) {
        setVideos(data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const filePath = `narrative/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
      setEditingVideo(v => ({ ...v, content_value: urlData.publicUrl, styles: { type: "upload" } }));
    } catch (error) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveVideo = async () => {
    if (!editingVideo) return;
    setIsSaving(true);
    try {
      if (editingVideo.id) {
        const { error } = await supabase
          .from('page_content')
          .update({
            content_value: editingVideo.content_value,
            section_key: editingVideo.section_key,
            styles: editingVideo.styles
          })
          .eq('id', editingVideo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('page_content')
          .insert({
            page_name: "narrative_bloom_videos",
            section_key: editingVideo.section_key || `video_${Date.now()}`,
            content_type: "text",
            content_value: editingVideo.content_value,
            display_order: videos.length,
            styles: editingVideo.styles
          })
          .select()
          .single();
        if (error) throw error;
      }
      await fetchData();
      setEditingVideo(null);
    } catch (error) {
      alert("Failed to save video");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!confirm("Delete this video?")) return;
    try {
      const { error } = await supabase.from('page_content').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      alert("Failed to delete video");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-cream-50 to-white min-h-screen">
      {/* Admin Toolbar */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-2xl rounded-lg p-3 border border-gray-200">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">Admin</span>
          <Button size="sm" variant={isEditMode ? "default" : "outline"} onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "Preview" : "Edit Videos"}
          </Button>
          {isEditMode && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setEditingVideo({ content_value: "", section_key: "" })}>
              <Plus className="w-4 h-4 mr-1" />Add Video
            </Button>
          )}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Narrative Behind Words</h1>
          <p className="text-2xl text-red-600 font-semibold mb-8">
            Reflective Storytelling. Empathy Mapping. Creative Insight.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Narrative Behind Words is a digital reflective storytelling platform that transforms personal writing into visual, emotional, and narrative insight - without reducing human experience to scores or diagnoses.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mt-4">
            Created by Dr. Esther Ruth Kentish, Narrative Behind Words merges digital humanities, narrative therapy, and ethical computational analysis into a single, research-grade system designed for reflection, creativity, learning, and care.
          </p>
        </div>

        {/* Videos Section */}
        {videos.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Video className="w-8 h-8 text-red-600" />
              Platform Videos
            </h2>
            <div className="grid md:grid-cols-1 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="relative group">
                  {isEditMode && (
                    <div className="absolute -right-2 -top-2 z-10 flex gap-1">
                      <Button size="sm" className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600" onClick={() => setEditingVideo(video)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDeleteVideo(video.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-black max-w-4xl mx-auto">
                    {video.styles?.type === "upload" ? (
                      <video controls className="w-full h-full" src={video.content_value}>
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        src={video.content_value}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What It Does */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Narrative Behind Words Does</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Narrative Behind Words helps people understand the deeper structures shaping their stories - how emotions, meaning, and narrative form evolve over time - by converting writing into interpretable visual and reflective outputs.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">Rather than telling users what their writing means, the platform:</p>
          <ul className="space-y-2 ml-6">
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Reveals emotional and narrative patterns</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Generates reflective, non-directive questions</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Visualizes emotional movement and resolution</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Preserves user authority over interpretation</span></li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">1. Write</h3>
              <p className="text-gray-700 leading-relaxed">Users enter reflective writing, poetry, or free expression in a calm, neurodivergent-accessible environment. Optional mood check-ins provide emotional context before and after writing.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">2. Analyze</h3>
              <p className="text-gray-700 leading-relaxed">The system applies transparent narrative and emotional analysis grounded in literary theory, narrative therapy, and trauma-informed design - never diagnosis.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">3. Visualize</h3>
              <p className="text-gray-700 leading-relaxed">Writing is transformed into evolving visual landscapes and blooms that represent emotional and thematic shifts over time.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">4. Reflect</h3>
              <p className="text-gray-700 leading-relaxed">Users receive adaptive prompts that invite insight, re-authoring, and emotional regulation while maintaining full interpretive control.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">5. Track Growth</h3>
              <p className="text-gray-700 leading-relaxed mb-3">Over time, Narrative Behind Words identifies longitudinal patterns such as:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Emotional cycles and recovery arcs</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Narrative coherence and agency</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Creative blocks and breakthroughs</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Meaning-making and spiritual themes</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* What Makes It Different */}
        <section className="mb-16 bg-gradient-to-r from-red-50 to-cream-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Narrative Behind Words Different</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ethical, Human-Centered Analysis</h3>
              <p className="text-gray-700 leading-relaxed">Narrative Behind Words uses the Kentish Emotional Lexicon Model (KELM) - a human-calibrated, transparent sentiment framework - rather than opaque, black-box AI systems.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Narrative Theory, Not Keyword Scoring</h3>
              <p className="text-gray-700 leading-relaxed">The platform detects themes, motifs, voice, structure, and agency, not just positive or negative sentiment.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Empathy Through Visualization</h3>
              <p className="text-gray-700 leading-relaxed">Instead of charts and dashboards, Narrative Behind Words renders emotional insight through organic, calming visual metaphors that support intuitive understanding.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neurodivergent-Accessible Design</h3>
              <p className="text-gray-700 leading-relaxed">Adjustable typography, low-stimulus color palettes, rhythmic motion cues, and non-linear workflows support diverse cognitive and sensory needs.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Closed Reflective Feedback Loop</h3>
              <p className="text-gray-700 leading-relaxed">The system doesn't just analyze writing - it responds, adapts, and grows alongside the user's narrative journey.</p>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Narrative Behind Words Is For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-3">Individuals</h3>
                <ul className="space-y-2">
                  <li className="text-gray-700">• Emotional processing and reflection</li>
                  <li className="text-gray-700">• Personal growth and meaning-making</li>
                  <li className="text-gray-700">• Creative self-understanding</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-3">Writers & Creatives</h3>
                <ul className="space-y-2">
                  <li className="text-gray-700">• Insight beyond grammar or style tools</li>
                  <li className="text-gray-700">• Emotional and narrative coherence across drafts</li>
                  <li className="text-gray-700">• Ethical pathways from reflection to publication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-3">Therapists & Counselors</h3>
                <ul className="space-y-2">
                  <li className="text-gray-700">• Trauma-informed client reflection tools</li>
                  <li className="text-gray-700">• Empathy visualization for therapeutic insight</li>
                  <li className="text-gray-700">• Longitudinal emotional pattern awareness</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-3">Educators & Institutions</h3>
                <ul className="space-y-2">
                  <li className="text-gray-700">• Teaching empathy, narrative form, and reflection</li>
                  <li className="text-gray-700">• Digital humanities and narrative medicine applications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-3">Researchers & Health Systems</h3>
                <ul className="space-y-2">
                  <li className="text-gray-700">• Research-grade narrative and sentiment analysis</li>
                  <li className="text-gray-700">• Clinician well-being and burnout reflection</li>
                  <li className="text-gray-700">• Cohort-level analysis with built-in privacy safeguards</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* From Reflection to Creation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">From Reflection to Creation</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Narrative Behind Words uniquely supports the ethical transformation of reflective writing into creative or publishable work.
          </p>
          <p className="text-gray-700 mb-3">Users may:</p>
          <ul className="space-y-2 ml-6">
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Compile reflective entries into manuscripts</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Track emotional and narrative stability during development</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Generate emotionally informed summaries, covers, and blurbs</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" /><span className="text-gray-700">Share filtered interpretive insights - never raw text - with editors, mentors, or publishers, strictly by consent</span></li>
          </ul>
        </section>

        {/* Privacy */}
        <section className="mb-16 bg-gray-900 text-white p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">Privacy, Safety & Ethics</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /><span>End-to-end encryption and user-owned data</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /><span>Opt-in storage and sharing only</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /><span>Crisis-aware writing support and resources</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /><span>Non-diagnostic, non-directive analysis</span></li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /><span>Designed to complement, not replace, professional care</span></li>
          </ul>
          <p className="text-xl font-semibold text-red-400">Narrative Behind Words is a technology of care, not extraction.</p>
        </section>

        {/* Access & Membership */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Access & Membership</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Narrative Behind Words operates under a tiered, approval-based access model to ensure ethical and responsible use.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Seedling</h3>
                <p className="text-4xl font-bold text-red-600 mb-4">Free</p>
                <p className="text-gray-600 mb-6">Introductory reflection tools with limited entries</p>
                <a href="https://narrativebloom.com" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700">Get Started</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-600 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bloom</h3>
                <p className="text-4xl font-bold text-red-600 mb-1">$29<span className="text-lg text-gray-600">/month</span></p>
                <p className="text-gray-600 mb-6">Unlimited writing, full analysis, visual landscapes, and progress tracking</p>
                <a href="https://wise.com/pay/business/kentishpublishingcompany" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Subscribe Now
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Publishing Pathway</h3>
                <p className="text-4xl font-bold text-red-600 mb-1">$99<span className="text-lg text-gray-600">/month</span></p>
                <p className="text-gray-600 mb-6">All Bloom features plus manuscript assembly and publishing support</p>
                <a href="https://wise.com/pay/business/kentishpublishingcompany" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Subscribe Now
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <p className="text-gray-700 text-center">
            Institutional, clinical, and research access is available upon request.
          </p>
        </section>

        {/* About Creator */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Creator</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Dr. Esther Ruth Kentish is a scholar, author, and system designer working at the intersection of digital humanities, narrative medicine, and ethical AI. Narrative Behind Words is grounded in her doctoral research and ongoing work in clinician well-being, trauma-informed storytelling, and computational hermeneutics.
          </p>
        </section>

        {/* CTA */}
        <section>
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Begin Your Narrative Behind Words Journey</h2>
              <p className="text-xl mb-8 text-gray-100">
                Whether you seek emotional clarity, creative insight, or research-grade narrative analysis, Narrative Behind Words offers a space where writing becomes understanding.
              </p>
              <div className="flex justify-center">
                <a href="https://narrativebehindwords.com/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Explore the Platform
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Video Edit Dialog */}
      <Dialog open={!!editingVideo} onOpenChange={() => setEditingVideo(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingVideo?.id ? "Edit Video" : "Add Video"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Video Title (optional)</Label>
              <Input
                value={editingVideo?.section_key || ""}
                onChange={(e) => setEditingVideo(v => ({ ...v, section_key: e.target.value }))}
                placeholder="e.g., Platform Demo"
              />
            </div>

            <div>
              <Label>Upload Video File</Label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="flex-1">
                  <Button type="button" variant="outline" className="w-full" disabled={isUploading} asChild>
                    <span>
                      {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {isUploading ? "Uploading..." : "Upload Video"}
                    </span>
                  </Button>
                </label>
              </div>
              {editingVideo?.styles?.type === "upload" && editingVideo?.content_value && (
                <p className="text-sm text-green-600 mt-2">Video uploaded successfully</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div>
              <Label>Video Embed URL</Label>
              <Input
                value={editingVideo?.styles?.type === "upload" ? "" : editingVideo?.content_value || ""}
                onChange={(e) => setEditingVideo(v => ({ ...v, content_value: e.target.value, styles: {} }))}
                placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID"
                disabled={editingVideo?.styles?.type === "upload"}
              />
              <p className="text-sm text-gray-500 mt-2">
                For YouTube: use https://www.youtube.com/embed/VIDEO_ID<br />
                For Vimeo: use https://player.vimeo.com/video/VIDEO_ID
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingVideo(null)}>Cancel</Button>
              <Button onClick={handleSaveVideo} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
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
