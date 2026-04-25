import { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

export default function EditableCollaborationPage({ pageName, defaultTitle, defaultSubtitle }) {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, [pageName]);

  const fetchPageData = async () => {
    const { data } = await supabase
      .from('collaboration_pages')
      .select('*')
      .eq('page_name', pageName)
      .single();
    setPageData(data || null);
    setIsLoading(false);
  };

  const handleEdit = () => {
    setEditForm({
      title: pageData?.title || defaultTitle,
      subtitle: pageData?.subtitle || defaultSubtitle,
      body: pageData?.body || '',
      image_url: pageData?.image_url || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (pageData) {
      await supabase.from('collaboration_pages').update(editForm).eq('id', pageData.id);
    } else {
      await supabase.from('collaboration_pages').insert({ page_name: pageName, ...editForm });
    }
    await fetchPageData();
    setIsEditing(false);
    setIsSaving(false);
  };

  const title = pageData?.title || defaultTitle;
  const subtitle = pageData?.subtitle || defaultSubtitle;
  const body = pageData?.body || '';
  const imageUrl = pageData?.image_url || '';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isEditing ? (
            <div className="space-y-4 text-left">
              <Input
                value={editForm.title}
                onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                className="text-2xl font-bold"
                placeholder="Page title"
              />
              <Textarea
                value={editForm.subtitle}
                onChange={e => setEditForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="Subtitle / introduction"
                rows={3}
              />
              <Input
                value={editForm.image_url}
                onChange={e => setEditForm(f => ({ ...f, image_url: e.target.value }))}
                placeholder="Image URL (optional)"
              />
              <Textarea
                value={editForm.body}
                onChange={e => setEditForm(f => ({ ...f, body: e.target.value }))}
                placeholder="Main content..."
                rows={10}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white">
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">{title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
              {isAdmin && (
                <Button variant="outline" className="mt-6" onClick={handleEdit}>
                  <Pencil className="w-4 h-4 mr-2" /> Edit Page
                </Button>
              )}
            </>
          )}
        </div>
      </section>

      {/* Image */}
      {imageUrl && !isEditing && (
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img src={imageUrl} alt={title} className="w-full rounded-xl shadow-lg object-cover max-h-96" />
          </div>
        </section>
      )}

      {/* Body Content */}
      {body && !isEditing && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl border-red-100">
              <CardContent className="p-10">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {body}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-gray-300 mb-8">
            Interested in partnering with us or learning more? Reach out today.
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
