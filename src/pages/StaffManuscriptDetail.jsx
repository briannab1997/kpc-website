import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Edit, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import StaffLayout from "@/components/staff/StaffLayout";

const statusConfig = {
  submitted: { color: "bg-blue-500" },
  under_review: { color: "bg-yellow-500" },
  revision_requested: { color: "bg-orange-500" },
  accepted: { color: "bg-green-500" },
  published: { color: "bg-purple-500" },
  declined: { color: "bg-red-500" },
};

function StaffManuscriptDetailContent() {
  const [manuscript, setManuscript] = useState(null);
  const [interns, setInterns] = useState([]);
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      const manuscriptId = params.get("id");

      if (manuscriptId) {
        const [{ data: msData }, { data: allUsers }] = await Promise.all([
          supabase.from('manuscripts').select('*').eq('id', manuscriptId).single(),
          supabase.from('profiles').select('*'),
        ]);
        setManuscript(msData);
        setFeedback(msData?.feedback || "");
        setStatus(msData?.status || "");
        setSelectedInterns(msData?.assigned_interns || []);

        const internUsers = (allUsers || []).filter(u => u.user_type?.startsWith('Intern'));
        setInterns(internUsers);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [location.search]);

  const handleUpdate = async () => {
    if (!manuscript) return;
    try {
      await supabase
        .from('manuscripts')
        .update({ feedback, status, assigned_interns: selectedInterns })
        .eq('id', manuscript.id);
      alert("Manuscript updated successfully!");
      const { data: msData } = await supabase.from('manuscripts').select('*').eq('id', manuscript.id).single();
      setManuscript(msData);
    } catch (error) {
      console.error("Failed to update manuscript:", error);
      alert("Update failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-12 h-12 animate-spin text-red-600" /></div>;
  }

  if (!manuscript) {
    return <div className="text-center py-20"><h2>Manuscript not found.</h2></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link to={createPageUrl("StaffDashboard")} className="flex items-center text-red-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Staff Dashboard
        </Link>
      </div>

      <Card className="shadow-lg border-red-100 mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">{manuscript.title}</CardTitle>
              <CardDescription>By {manuscript.author_name} | Genre: {manuscript.genre}</CardDescription>
            </div>
            <Badge className={`${statusConfig[manuscript.status]?.color || 'bg-gray-400'} text-white`}>
              {manuscript.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="prose">{manuscript.synopsis}</p>
          {manuscript.file_url && (
            <a href={manuscript.file_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline mt-4 inline-block">
              View Manuscript File
            </a>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Edit className="w-6 h-6 mr-3 text-red-600" />
            Management Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="font-semibold">Update Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(statusConfig).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-semibold">Editorial Feedback</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
              placeholder="Provide feedback for the author..."
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Assign Interns</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {interns.map(intern => (
                <div key={intern.id} className="flex items-center space-x-2 p-2 rounded-md bg-gray-100">
                  <input
                    type="checkbox"
                    id={`intern-${intern.id}`}
                    checked={selectedInterns.includes(intern.email)}
                    onChange={(e) => {
                      const email = intern.email;
                      setSelectedInterns(e.target.checked
                        ? [...selectedInterns, email]
                        : selectedInterns.filter(i => i !== email)
                      );
                    }}
                  />
                  <label htmlFor={`intern-${intern.id}`} className="text-sm">
                    {intern.full_name} <span className="text-gray-500">({intern.user_type?.replace('Intern_', '')})</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleUpdate} className="w-full ribbon-button text-white">
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StaffManuscriptDetail() {
  return (
    <StaffLayout>
      <StaffManuscriptDetailContent />
    </StaffLayout>
  );
}
