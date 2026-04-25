import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, BookCheck, Clock, Edit, FileText, MessageSquare } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  submitted: { icon: BookCheck, color: "bg-blue-500", label: "Submitted" },
  under_review: { icon: Clock, color: "bg-yellow-500", label: "Under Review" },
  revision_requested: { icon: Edit, color: "bg-orange-500", label: "Revision Requested" },
  accepted: { icon: FileText, color: "bg-green-500", label: "Accepted" },
  published: { icon: BookCheck, color: "bg-purple-500", label: "Published" },
  declined: { icon: FileText, color: "bg-red-500", label: "Declined" },
};

export default function ManuscriptDetail() {
  const { user, isLoadingAuth } = useAuth();
  const [manuscript, setManuscript] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth) return;

    const fetchManuscript = async () => {
      setIsLoading(true);
      try {
        if (!user) {
          navigate('/');
          return;
        }

        if (!user?.user_metadata?.is_approved) {
          navigate(createPageUrl("ApprovalPending"));
          return;
        }

        const params = new URLSearchParams(location.search);
        const manuscriptId = params.get("id");

        if (manuscriptId) {
          const { data, error } = await supabase
            .from('manuscripts')
            .select('*')
            .eq('id', manuscriptId)
            .single();

          if (error) throw error;
          setManuscript(data);
        } else {
          setManuscript(null);
        }
      } catch (error) {
        setManuscript(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManuscript();
  }, [location.search, navigate, user, isLoadingAuth]);

  if (isLoadingAuth || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (!manuscript) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Manuscript Not Found</h2>
        <p className="text-gray-600">The requested manuscript could not be located.</p>
        <Link to={createPageUrl("Dashboard")}>
          <Button variant="link" className="text-red-600">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const config = statusConfig[manuscript.status] || statusConfig.submitted;

  return (
    <div className="py-12 bg-gradient-to-br from-cream-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to={createPageUrl("Dashboard")} className="flex items-center text-red-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <Card className="shadow-lg border-red-100">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">{manuscript.title}</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Genre: <span className="font-medium text-red-600">{manuscript.genre}</span>
                </CardDescription>
              </div>
              <Badge className={`${config.color} text-white text-lg`}>
                <config.icon className="w-5 h-5 mr-2" />
                {config.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800">Submission Details</h3>
              <p className="text-sm text-gray-600">
                Submitted on: {manuscript.created_at ? format(new Date(manuscript.created_at), "MMMM d, yyyy 'at' h:mm a") : "N/A"}
              </p>
              <p className="text-sm text-gray-600">Word Count: {manuscript.word_count?.toLocaleString() || "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Synopsis</h3>
              <p className="text-gray-700">{manuscript.synopsis}</p>
            </div>

            <Card className="bg-red-50 border-red-200">
              <CardHeader className="flex flex-row items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-red-800">Feedback from our Editors</h3>
              </CardHeader>
              <CardContent>
                {manuscript.feedback ? (
                  <p className="text-gray-700">{manuscript.feedback}</p>
                ) : (
                  <p className="text-gray-600">
                    Your manuscript is currently in the queue. You will be notified once feedback is available. Thank you for your patience.
                  </p>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
