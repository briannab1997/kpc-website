import React, { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, BookOpen, LayoutList, MessageSquare, Folder, Sparkles, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AuthorProjectHeader from '@/components/author/AuthorProjectHeader';
import AuthorPipeline from '@/components/author/AuthorPipeline';
import AuthorPhaseDetail from '@/components/author/AuthorPhaseDetail';
import AuthorAIAssistant from '@/components/author/AuthorAIAssistant';
import AuthorMessaging from '@/components/author/AuthorMessaging';
import AuthorFileLibrary from '@/components/author/AuthorFileLibrary';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function AuthorPortal() {
  const { user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const [authorRecord, setAuthorRecord] = useState(null);
  const [phases, setPhases] = useState([]);
  const [workflowTasks, setWorkflowTasks] = useState([]);
  const [authorTasks, setAuthorTasks] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (isLoadingAuth) return;
    if (!user) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      const isAdmin = user?.user_metadata?.role === 'admin';
      if (isAdmin) {
        setStatus('admin');
        setIsLoading(false);
        return;
      }

      try {
        const [
          { data: authors },
          { data: allPhases },
          { data: allWorkflowTasks },
          { data: allAuthorTasks }
        ] = await Promise.all([
          supabase.from('authors').select('*'),
          supabase.from('crm_phases').select('*').order('phase_order'),
          supabase.from('crm_workflow_tasks').select('*').order('phase_id'),
          supabase.from('crm_author_tasks').select('*'),
        ]);

        const myAuthor = (authors || []).find(a => a.email === user.email);
        if (!myAuthor) {
          setStatus('not_found');
          setIsLoading(false);
          return;
        }

        setAuthorRecord(myAuthor);
        setPhases(allPhases || []);
        setWorkflowTasks(allWorkflowTasks || []);
        setAuthorTasks((allAuthorTasks || []).filter(t => t.author_id === myAuthor.id));
        setStatus('found');
      } catch {
        setStatus('not_found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, isLoadingAuth]);

  const calculatePhaseProgress = (phaseId) => {
    const tasks = authorTasks.filter(t => t.phase_id === phaseId);
    if (!tasks.length) return 0;
    return Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100);
  };

  const getPhaseStatus = (phaseId) => {
    const tasks = authorTasks.filter(t => t.phase_id === phaseId);
    if (!tasks.length) return 'not_started';
    if (tasks.every(t => t.status === 'Completed')) return 'completed';
    if (tasks.some(t => t.status === 'In Progress' || t.status === 'Completed')) return 'in_progress';
    return 'not_started';
  };

  const overallProgress = authorTasks.length === 0 ? 0 :
    Math.round((authorTasks.filter(t => t.status === 'Completed').length / authorTasks.length) * 100);

  const sortedPhases = [...phases].sort((a, b) => a.phase_order - b.phase_order);
  const currentPhase = sortedPhases.find(p => getPhaseStatus(p.id) === 'in_progress')
    || sortedPhases.find(p => getPhaseStatus(p.id) === 'not_started')
    || sortedPhases[0];

  if (isLoading || isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (status === 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
        <BookOpen className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Account Detected</h2>
        <p className="text-gray-600 max-w-md mb-6">
          This is the author portal for authors to view their publishing progress. As an admin, please use the Staff CRM to manage projects.
        </p>
        <Link to={createPageUrl('StaffCRM')}>
          <Button className="bg-red-600 hover:bg-red-700">Go to Staff CRM <ArrowRight className="ml-2 w-4 h-4" /></Button>
        </Link>
      </div>
    );
  }

  if (status === 'not_found') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Book Project Found</h2>
        <p className="text-gray-600 max-w-md mb-6">
          Your account hasn't been linked to a book project yet. Please contact Kentish Publishing Company to get access to your author portal.
        </p>
        <a href="mailto:kentishpublishing@gmail.com">
          <Button className="bg-red-600 hover:bg-red-700">Contact Your Publisher</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthorProjectHeader
        authorRecord={authorRecord}
        overallProgress={overallProgress}
        currentPhase={currentPhase}
        totalPhases={sortedPhases.length}
        completedPhases={sortedPhases.filter(p => getPhaseStatus(p.id) === 'completed').length}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="pipeline">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="pipeline" className="flex items-center gap-2 text-xs sm:text-sm">
              <LayoutList className="w-4 h-4" />
              <span className="hidden sm:inline">My Pipeline</span>
              <span className="sm:hidden">Pipeline</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2 text-xs sm:text-sm">
              <Folder className="w-4 h-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <AuthorPipeline
              phases={sortedPhases}
              authorTasks={authorTasks}
              getPhaseStatus={getPhaseStatus}
              calculatePhaseProgress={calculatePhaseProgress}
              onPhaseClick={setSelectedPhase}
            />
          </TabsContent>

          <TabsContent value="files">
            <AuthorFileLibrary authorRecord={authorRecord} user={user} />
          </TabsContent>

          <TabsContent value="messages">
            <AuthorMessaging authorRecord={authorRecord} user={user} />
          </TabsContent>

          <TabsContent value="ai">
            <AuthorAIAssistant
              authorRecord={authorRecord}
              phases={sortedPhases}
              authorTasks={authorTasks}
              workflowTasks={workflowTasks}
              currentPhase={currentPhase}
              overallProgress={overallProgress}
              getPhaseStatus={getPhaseStatus}
              calculatePhaseProgress={calculatePhaseProgress}
            />
          </TabsContent>
        </Tabs>
      </div>

      {selectedPhase && (
        <AuthorPhaseDetail
          phase={selectedPhase}
          authorTasks={authorTasks.filter(t => t.phase_id === selectedPhase.id)}
          workflowTasks={workflowTasks.filter(t => t.phase_id === selectedPhase.id)}
          onClose={() => setSelectedPhase(null)}
        />
      )}
    </div>
  );
}
