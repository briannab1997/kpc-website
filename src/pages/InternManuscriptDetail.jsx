import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, MessageSquare, Send, BookOpen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const statusConfig = {
  submitted: { color: "bg-blue-500" },
  under_review: { color: "bg-yellow-500" },
  revision_requested: { color: "bg-orange-500" },
  accepted: { color: "bg-green-500" },
  published: { color: "bg-purple-500" },
  declined: { color: "bg-red-500" },
};

export default function InternManuscriptDetail() {
  const { user, isLoadingAuth } = useAuth();
  const [manuscript, setManuscript] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const userType = user?.user_metadata?.user_type;

  useEffect(() => {
    if (isLoadingAuth) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user || !userType?.startsWith('Intern')) {
          navigate(createPageUrl("Dashboard"));
          return;
        }

        const params = new URLSearchParams(location.search);
        const manuscriptId = params.get("id");

        if (manuscriptId) {
          const { data: msData, error } = await supabase
            .from('manuscripts')
            .select('*')
            .eq('id', manuscriptId)
            .single();

          if (error || !msData) {
            navigate(createPageUrl("Dashboard"));
            return;
          }

          if (!msData.assigned_interns?.includes(user.email)) {
            navigate(createPageUrl("Dashboard"));
            return;
          }

          setManuscript(msData);
        }
      } catch (error) {
        navigate(createPageUrl("Dashboard"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search, navigate, user, isLoadingAuth, userType]);

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim() || !manuscript || !user) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('feedback').insert({
        manuscript_id: manuscript.id,
        feedback_text: feedbackText,
        submitted_by_role: userType,
      });
      if (error) throw error;
      setFeedbackText("");
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingAuth || isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-red-600" /></div>;
  }

  if (!manuscript) {
    return <div className="text-center py-20"><h2>Manuscript not found or you do not have access.</h2></div>;
  }

  return (
    <div className="py-12 bg-gradient-to-br from-cream-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to={createPageUrl("Dashboard")} className="flex items-center text-red-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Intern Dashboard
          </Link>
        </div>

        <Card className="shadow-lg border-red-100 mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">{manuscript.title}</CardTitle>
                <CardDescription>By {manuscript.author_name} | Genre: {manuscript.genre}</CardDescription>
              </div>
              <Badge className={`${statusConfig[manuscript.status]?.color || 'bg-gray-400'} text-white`}>{manuscript.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {userType !== 'Intern_BetaReader' && manuscript.file_url ? (
              <a href={manuscript.file_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline inline-block">
                <Button variant="outline"><BookOpen className="w-4 h-4 mr-2" /> View Manuscript File</Button>
              </a>
            ) : (
              <p className="text-sm text-gray-500">As a Beta Reader, you have read-only access to the content provided by your supervisor.</p>
            )}
            <div className="mt-4">
              <h3 className="font-semibold">Synopsis</h3>
              <p className="text-gray-700 mt-1">{manuscript.synopsis}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Editorial Feedback (Author-facing)</h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-md mt-1">{manuscript.feedback || "No feedback provided to the author yet."}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center"><MessageSquare className="w-6 h-6 mr-3 text-red-600" />Submit Your Feedback</CardTitle>
            <CardDescription>Your feedback will be visible to staff for internal review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={8}
              placeholder={`As an ${userType?.replace('Intern_', '')}, provide your feedback here...`}
            />
            <Button onClick={handleFeedbackSubmit} disabled={isSubmitting || !feedbackText.trim()} className="w-full ribbon-button text-white">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
