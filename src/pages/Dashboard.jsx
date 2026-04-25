import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Loader2, BookCheck, Clock, Edit, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const statusConfig = {
  submitted: { icon: BookCheck, color: "bg-blue-500", label: "Submitted" },
  under_review: { icon: Clock, color: "bg-yellow-500", label: "Under Review" },
  revision_requested: { icon: Edit, color: "bg-orange-500", label: "Revision Requested" },
  accepted: { icon: FileText, color: "bg-green-500", label: "Accepted" },
  published: { icon: BookCheck, color: "bg-purple-500", label: "Published" },
  declined: { icon: FileText, color: "bg-red-500", label: "Declined" },
};

const ManuscriptList = ({ manuscripts, isIntern = false }) => (
  <div className="space-y-4">
    {manuscripts.map((manuscript) => {
      const config = statusConfig[manuscript.status] || statusConfig.submitted;
      const detailUrl = isIntern
        ? createPageUrl(`InternManuscriptDetail?id=${manuscript.id}`)
        : createPageUrl(`ManuscriptDetail?id=${manuscript.id}`);

      return (
        <Link to={detailUrl} key={manuscript.id} className="block">
          <div className="border rounded-lg p-4 flex items-center justify-between hover:bg-red-50 transition-colors">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{manuscript.title}</h3>
              <p className="text-sm text-gray-500">
                Author: {manuscript.author_name} | Submitted: {format(new Date(manuscript.created_at), "MMMM d, yyyy")}
              </p>
            </div>
            <Badge className={`${config.color} text-white`}>
              <config.icon className="w-4 h-4 mr-2" />
              {config.label}
            </Badge>
          </div>
        </Link>
      );
    })}
  </div>
);

const AuthorDashboard = ({ user, manuscripts }) => (
  <div className="py-12 bg-gradient-to-br from-cream-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Author Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome back, {user?.user_metadata?.full_name || user?.email}!</p>
        </div>
        <Link to={createPageUrl("Submission")}>
          <Button className="ribbon-button text-white">
            <PlusCircle className="w-5 h-5 mr-2" />
            Submit New Manuscript
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg border-red-100">
        <CardHeader>
          <CardTitle>My Submissions</CardTitle>
          <CardDescription>Track the status of all your submitted manuscripts here.</CardDescription>
        </CardHeader>
        <CardContent>
          {manuscripts.length > 0 ? (
            <ManuscriptList manuscripts={manuscripts} />
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <FileText className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">No Manuscripts Submitted Yet</h3>
              <p className="mt-1 text-sm text-gray-500">Ready to share your story? Submit your first manuscript to get started.</p>
              <div className="mt-6">
                <Link to={createPageUrl("Submission")}>
                  <Button className="ribbon-button text-white">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Submit Your First Manuscript
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
);

const InternDashboard = ({ user, manuscripts }) => (
  <div className="py-12 bg-gradient-to-br from-cream-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Intern Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome, {user?.user_metadata?.full_name || user?.email}!
        </p>
      </div>
      <Card className="shadow-lg border-red-100 mt-8">
        <CardHeader>
          <CardTitle>Assigned Manuscripts</CardTitle>
          <CardDescription>These are the manuscripts assigned to you for review or feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          {manuscripts.length > 0 ? (
            <ManuscriptList manuscripts={manuscripts} isIntern={true} />
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <BookCheck className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">No Assigned Manuscripts</h3>
              <p className="mt-1 text-sm text-gray-500">You currently have no manuscripts assigned to you.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();
  const [manuscripts, setManuscripts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoadingAuth) return;

    if (!user) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const role = user?.user_metadata?.role;
        const userType = user?.user_metadata?.user_type || '';

        if (role === 'admin' || userType?.startsWith('Intern')) {
          navigate(createPageUrl("StaffDashboard"));
          return;
        }

        const isApproved = user?.user_metadata?.is_approved;
        if (!isApproved) {
          navigate(createPageUrl("ApprovalPending"));
          return;
        }

        const { data } = await supabase
          .from('manuscripts')
          .select('*')
          .eq('author_email', user.email)
          .order('created_at', { ascending: false });

        setManuscripts(data || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, isLoadingAuth]);

  if (isLoadingAuth || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return <AuthorDashboard user={user} manuscripts={manuscripts} />;
}
