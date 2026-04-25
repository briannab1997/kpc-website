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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  BookOpen,
  Heart,
  Users,
  Award,
  ArrowRight,
  Cross,
  Lightbulb,
  Shield,
  Quote,
  Pencil,
  Trash2,
  Plus,
  Save,
  X,
  Loader2
} from "lucide-react";

const uniqueFeatures = [
  { icon: Cross, title: "Faith-Centered Foundation", description: "Rooted in Christian principles, guiding every project with spiritual integrity and God-centered values." },
  { icon: Users, title: "Personalized Author Support", description: "One-on-one guidance from our CEO and a team of professional editors, consultants, and advisors." },
  { icon: Award, title: "Professional Expertise Integration", description: "Combining creative, academic, and business expertise to support authors holistically." },
  { icon: Lightbulb, title: "Unique Voice Amplification", description: "Dedicated to publishing underrepresented voices and stories that might be overlooked elsewhere." },
  { icon: Shield, title: "Vision-Driven Publishing", description: "Every project treated as a creative partnership, ensuring authentic and meaningful publications." },
  { icon: Heart, title: "Spiritual & Creative Synergy", description: "Blending faith, creativity, and professional publishing for deeper purpose and lasting impact." }
];

export default function About() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';
  const [isEditMode, setIsEditMode] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [showTestimonialDialog, setShowTestimonialDialog] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .neq('is_active', false)
          .order('display_order');
        setTestimonials(data || []);
      } catch {
        setTestimonials([]);
      }
    };
    fetchData();
  }, []);

  const refreshTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .neq('is_active', false)
      .order('display_order');
    setTestimonials(data || []);
  };

  const openTestimonialDialog = (testimonial = null) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm(testimonial || {
      reviewer_name: "",
      quote: "",
      title: "",
      display_order: testimonials.length,
      is_active: true
    });
    setShowTestimonialDialog(true);
  };

  const handleSaveTestimonial = async () => {
    if (!testimonialForm.reviewer_name || !testimonialForm.quote) {
      alert("Name and quote are required");
      return;
    }
    setIsSaving(true);
    try {
      if (editingTestimonial) {
        await supabase.from('testimonials').update(testimonialForm).eq('id', editingTestimonial.id);
      } else {
        await supabase.from('testimonials').insert(testimonialForm);
      }
      await refreshTestimonials();
      setShowTestimonialDialog(false);
      setEditingTestimonial(null);
    } catch (error) {
      alert("Failed to save testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTestimonial = async (testimonial) => {
    if (!confirm(`Delete testimonial from ${testimonial.reviewer_name}?`)) return;
    try {
      await supabase.from('testimonials').delete().eq('id', testimonial.id);
      await refreshTestimonials();
    } catch {
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Kentish Publishing Company</h1>
          <div className="mb-8">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/c09eb377c_KentishPublishingCompanyIntroductionVideoFacebookPost.jpg"
              alt="To help you write and publish your book - Kentish Publishing Company"
              className="mx-auto rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Since 2016, we've been dedicated to nurturing and bringing to life the unique stories
            and experiences of authors from around the world, guided by Christian principles and professional excellence.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardContent className="p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-900 mb-6">
                  Kentish Publishing Company (2016) is a distinguished professional publishing and press institution
                  dedicated to nurturing and bringing to life the unique stories and experiences of authors from around the world.
                </p>
                <p>
                  Our mission is rooted in the belief that every story carries significance, and every voice deserves to be heard.
                  At Kentish Publishing Company, we combine the precision of professional publishing practices with a personalized
                  approach that ensures each author's vision is fully realized.
                </p>
                <p>
                  The foundation of our company is firmly cultivated through and guided by the principles of Jesus Christ.
                  We hold that producing literature that is connected to, and inspired by, God is not only our calling but
                  the essence of our purpose. Every project we undertake is approached with spiritual integrity, ensuring that
                  the content we help produce uplifts, inspires, and reflects values aligned with our faith.
                </p>
                <p>
                  This divine foundation informs every aspect of our work, from editorial decisions to author support,
                  and shapes the way we engage with our clients and their creative journeys.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six distinctive features that set Kentish Publishing Company apart from other publishing houses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300 border-red-100 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Approach</h2>
          </div>
          <Card className="shadow-xl border-red-100">
            <CardContent className="p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>
                  Kentish Publishing Company offers authors unparalleled access to a team of professionally trained experts.
                  Our authors work alongside experienced editors, accomplished authors, business consultants, and financial
                  advisors to ensure their projects are polished, market-ready, and strategically positioned for success.
                  Every client is personally supported with one-on-one guidance from our CEO and Founder, Esther Ruth Kentish,
                  whose expertise spans literature, Medical Humanities, creative writing, and publishing. This hands-on approach
                  allows authors to benefit directly from her knowledge, experience, and personal investment in the project.
                  Our publishing team is committed to illuminating the creative vision of every author. From conceptualization
                  to final publication, we provide comprehensive support that transforms manuscripts into extraordinary literary
                  works. Whether the project is a novel, memoir, poetry collection, or academic work, Kentish Publishing Company
                  ensures that each book reflects the authenticity and individuality of its author, while meeting the highest
                  standards of professional publishing. Our ultimate goal is to make the publishing experience not only seamless
                  and professional but also profoundly meaningful and spiritually enriching.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Authors Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from the authors who have trusted us with their stories.
              </p>
              {isAdmin && (
                <Button className="mt-6 bg-green-600 hover:bg-green-700" onClick={() => openTestimonialDialog()}>
                  <Plus className="w-4 h-4 mr-2" />Add Testimonial
                </Button>
              )}
            </div>
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <Card className="border-red-100 shadow-xl relative group">
                      {isAdmin && isEditMode && (
                        <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => openTestimonialDialog(testimonial)}>
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteTestimonial(testimonial)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      <CardContent className="p-12 text-center">
                        <Quote className="w-16 h-16 mx-auto mb-6 text-red-600 opacity-20" />
                        <p className="text-2xl text-gray-700 italic leading-relaxed mb-8">
                          "{testimonial.quote}"
                        </p>
                        <div className="border-t border-red-100 pt-6">
                          <p className="text-xl font-semibold text-gray-900">{testimonial.reviewer_name}</p>
                          {testimonial.title && (
                            <p className="text-gray-600 mt-2">{testimonial.title}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      )}

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

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Share Your Story?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community of authors who have chosen to publish with purpose,
            spiritual integrity, and professional excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Submission")}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                Start Your Publishing Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Founder")}>
              <Button variant="outline" size="lg" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Meet Our Founder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Dialog open={showTestimonialDialog} onOpenChange={setShowTestimonialDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Reviewer Name *</Label>
              <Input
                value={testimonialForm.reviewer_name || ""}
                onChange={(e) => setTestimonialForm(f => ({ ...f, reviewer_name: e.target.value }))}
                placeholder="e.g., John Smith"
              />
            </div>
            <div>
              <Label>Title / Affiliation (Optional)</Label>
              <Input
                value={testimonialForm.title || ""}
                onChange={(e) => setTestimonialForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g., Author, Business Owner"
              />
            </div>
            <div>
              <Label>Quote *</Label>
              <Textarea
                value={testimonialForm.quote || ""}
                onChange={(e) => setTestimonialForm(f => ({ ...f, quote: e.target.value }))}
                rows={6}
                placeholder="Write the testimonial quote..."
              />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input
                type="number"
                value={testimonialForm.display_order || 0}
                onChange={(e) => setTestimonialForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowTestimonialDialog(false)}>
                <X className="w-4 h-4 mr-2" />Cancel
              </Button>
              <Button onClick={handleSaveTestimonial} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
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
