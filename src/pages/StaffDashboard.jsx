import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Book, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StaffLayout from "@/components/staff/StaffLayout";

function AdminDashboardContent() {
  const [stats, setStats] = useState({ manuscripts: 0, users: 0, pending: 0 });
  const [unapprovedUsers, setUnapprovedUsers] = useState([]);
  const [recentManuscripts, setRecentManuscripts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: allManuscripts }, { data: allUsers }] = await Promise.all([
        supabase.from('manuscripts').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*'),
      ]);

      const pendingUsers = (allUsers || []).filter(u => !u.is_approved);
      setUnapprovedUsers(pendingUsers);
      setStats({
        manuscripts: (allManuscripts || []).length,
        users: (allUsers || []).length,
        pending: pendingUsers.length,
      });
      setRecentManuscripts((allManuscripts || []).slice(0, 5));
    };
    fetchData();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await supabase.from('profiles').update({ is_approved: true }).eq('id', userId);
      const { data: allUsers } = await supabase.from('profiles').select('*');
      const pendingUsers = (allUsers || []).filter(u => !u.is_approved);
      setUnapprovedUsers(pendingUsers);
      setStats(prev => ({ ...prev, pending: pendingUsers.length, users: (allUsers || []).length }));
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-lg text-gray-600">Full administrative access granted.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Manuscripts</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.manuscripts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckSquare className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              {unapprovedUsers.length > 0 ? (
                <div className="space-y-4">
                  {unapprovedUsers.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div>
                        <p className="font-semibold">{u.full_name}</p>
                        <p className="text-sm text-gray-500">{u.email} ({u.user_type})</p>
                      </div>
                      <Button size="sm" onClick={() => handleApprove(u.id)}>Approve</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No users are pending approval.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Manuscript Submissions</CardTitle>
              <CardDescription>A view of the latest submissions needing review and assignment.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentManuscripts.length > 0 ? (
                <div className="space-y-4">
                  {recentManuscripts.map(m => (
                    <Link to={createPageUrl(`StaffManuscriptDetail?id=${m.id}`)} key={m.id} className="block">
                      <div className="border rounded-lg p-4 flex items-center justify-between hover:bg-red-50 transition-colors">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{m.title}</h3>
                          <p className="text-sm text-gray-500">By {m.author_name}</p>
                        </div>
                        <Badge className={m.status === 'submitted' ? "bg-blue-500 text-white" : "bg-gray-400 text-white"}>
                          {m.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No manuscripts have been submitted yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InternDashboardContent() {
  const { user } = useAuth();
  const [manuscripts, setManuscripts] = useState([]);

  useEffect(() => {
    const fetchAssignedManuscripts = async () => {
      if (user?.email) {
        const { data } = await supabase
          .from('manuscripts')
          .select('*')
          .contains('assigned_interns', [user.email])
          .order('created_at', { ascending: false });
        setManuscripts(data || []);
      }
    };
    fetchAssignedManuscripts();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Intern Dashboard</h1>
      <p className="text-lg text-gray-600">
        Welcome, {user?.user_metadata?.full_name}! ({user?.user_metadata?.user_type?.replace('_', ' ')})
      </p>
      <Card className="shadow-lg border-red-100 mt-8">
        <CardHeader>
          <CardTitle>Assigned Manuscripts</CardTitle>
          <CardDescription>These are the manuscripts assigned to you for review or feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          {manuscripts.length > 0 ? (
            <div className="space-y-4">
              {manuscripts.map((manuscript) => (
                <Link to={createPageUrl(`InternManuscriptDetail?id=${manuscript.id}`)} key={manuscript.id} className="block">
                  <div className="border rounded-lg p-4 flex items-center justify-between hover:bg-red-50 transition-colors">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{manuscript.title}</h3>
                      <p className="text-sm text-gray-500">Author: {manuscript.author_name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Book className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">No Assigned Manuscripts</h3>
              <p className="mt-1 text-sm text-gray-500">You currently have no manuscripts assigned to you.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function StaffDashboard() {
  const { user } = useAuth();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchType = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      setUserType(profile?.user_type || '');
    };
    fetchType();
  }, [user]);

  const isAdmin = userType === 'admin' || userType === 'Staff';

  return (
    <StaffLayout>
      {userType && (
        isAdmin ? <AdminDashboardContent /> : <InternDashboardContent />
      )}
    </StaffLayout>
  );
}
