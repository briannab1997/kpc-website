import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle, FileUp, BookOpen, ArrowRight } from "lucide-react";

export default function Submission() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author_name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    manuscript_title: "",
    genre: "",
    synopsis: "",
    additional_notes: "",
    word_count: ""
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload your manuscript file.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `manuscripts/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '-')}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);

      const { data: manuscript, error: insertError } = await supabase
        .from('manuscripts')
        .insert({
          title: formData.manuscript_title,
          author_name: formData.author_name,
          genre: formData.genre,
          synopsis: formData.synopsis,
          word_count: parseInt(formData.word_count, 10) || 0,
          file_url: publicUrl,
          status: 'submitted',
          created_by: user?.email || formData.email,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      await supabase.from('consultations').insert({
        ...formData,
        file_url: publicUrl,
      });

      setSubmissionStatus("success");
      setTimeout(() => navigate(createPageUrl("Dashboard")), 3000);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === "success") {
    return (
      <div className="flex items-center justify-center py-20 text-center">
        <Card className="w-full max-w-lg p-8">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
          <p className="text-gray-600">Thank you for submitting your manuscript. You will be redirected to your dashboard shortly.</p>
        </Card>
      </div>
    );
  }

  if (submissionStatus === "error") {
    return (
      <div className="flex items-center justify-center py-20 text-center">
        <Card className="w-full max-w-lg p-8">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Submission Failed</h2>
          <p className="text-gray-600 mb-6">An unexpected error occurred. Please try again or contact our support team.</p>
          <Button onClick={() => setSubmissionStatus(null)}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-cream-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-red-100">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Manuscript Submission</CardTitle>
            <CardDescription className="text-gray-600">
              Take the first step in your publishing journey. Upload your work for our team to review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-red-50 to-cream-50 rounded-xl p-6 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2026 Publishing Cycle</h3>
                <p className="text-gray-600 mb-4">
                  For initial inquiries or to get your work considered for our upcoming cycle, please use our inquiry form.
                </p>
                <a href="https://forms.gle/PAXPgvPKwqwCQ5Sw6" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="ribbon-button text-white px-8 py-3">
                    Submit Publishing Inquiry Form
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <p className="text-sm text-gray-500 mt-4">For full manuscript submissions, use the detailed form below.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input name="author_name" placeholder="Author Name" value={formData.author_name} onChange={handleInputChange} required />
                <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
              </div>
              <Input name="manuscript_title" placeholder="Manuscript Title" value={formData.manuscript_title} onChange={handleInputChange} required />
              <div className="grid md:grid-cols-2 gap-6">
                <Select onValueChange={(value) => handleSelectChange('genre', value)} required>
                  <SelectTrigger><SelectValue placeholder="Select Genre" /></SelectTrigger>
                  <SelectContent>
                    {["Fiction","Poetry","Creative Non-Fiction","Children's Literature","Young Adult","Medical Humanities","Theology","Education","Devotional","Memoir","Christian Living","Other"].map(g => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input name="word_count" type="number" placeholder="Approximate Word Count" value={formData.word_count} onChange={handleInputChange} required />
              </div>
              <Textarea name="synopsis" placeholder="Synopsis (a brief summary of your work)" value={formData.synopsis} onChange={handleInputChange} required rows={6} />
              <Textarea name="additional_notes" placeholder="Additional Notes (optional)" value={formData.additional_notes} onChange={handleInputChange} rows={3} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your Manuscript</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                        <span>Upload a file</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".doc,.docx,.pdf" required />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">DOC, DOCX, PDF up to 10MB</p>
                    {file && <p className="text-sm text-green-600 mt-2">{file.name}</p>}
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full ribbon-button text-white" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Submit Manuscript"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
