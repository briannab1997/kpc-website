import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import StaffLayout from '@/components/staff/StaffLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2, LayoutGrid, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhaseBoard from '@/components/crm/PhaseBoard';
import PhaseDetailView from '@/components/crm/PhaseDetailView';
import GanttTimeline from '@/components/crm/GanttTimeline';
import AccessManagement from '@/components/crm/AccessManagement';
import StaffMessaging from '@/components/crm/StaffMessaging';

function CreateAuthorForm({ onAuthorCreated, workflowTasks }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", book_title: "" });
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        if (!form.name || !form.email) return;
        setIsCreating(true);
        try {
            const { data: newAuthor, error } = await supabase
                .from('authors')
                .insert(form)
                .select()
                .single();
            if (error) throw error;

            const authorTasksPayload = workflowTasks.map(task => ({
                author_id: newAuthor.id,
                task_id: task.id,
                phase_id: task.phase_id,
                status: 'Not Started',
            }));
            if (authorTasksPayload.length > 0) {
                await supabase.from('crm_author_tasks').insert(authorTasksPayload);
            }
            onAuthorCreated();
            setIsOpen(false);
            setForm({ name: "", email: "", phone: "", book_title: "" });
        } catch (error) {
            console.error("Failed to create author:", error);
            alert("Could not create author.");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" />
                    New Author
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Create New Author</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    {['name', 'email', 'phone', 'book_title'].map(k => (
                        <Input
                            key={k}
                            placeholder={k.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            value={form[k]}
                            onChange={(e) => setForm(f => ({ ...f, [k]: e.target.value }))}
                        />
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={isCreating}>
                        {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function StaffCRM() {
    const [data, setData] = useState({ authors: [], phases: [], workflowTasks: [], authorTasks: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPhase, setSelectedPhase] = useState(null);
    const { user } = useAuth();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [
                { data: authors },
                { data: phases },
                { data: workflowTasks }
            ] = await Promise.all([
                supabase.from('authors').select('*').order('created_at', { ascending: false }),
                supabase.from('crm_phases').select('*').order('phase_order'),
                supabase.from('crm_workflow_tasks').select('*').order('phase_id'),
            ]);

            let { data: authorTasks } = await supabase.from('crm_author_tasks').select('*');

            let tasksWereCreated = false;
            for (const author of (authors || [])) {
                const authorCurrentTaskIds = new Set(
                    (authorTasks || []).filter(at => at.author_id === author.id).map(at => at.task_id)
                );
                const missingTasks = (workflowTasks || []).filter(wt => !authorCurrentTaskIds.has(wt.id));

                if (missingTasks.length > 0) {
                    const payload = missingTasks.map(task => ({
                        author_id: author.id,
                        task_id: task.id,
                        phase_id: task.phase_id,
                        status: 'Not Started',
                    }));
                    await supabase.from('crm_author_tasks').insert(payload);
                    tasksWereCreated = true;
                }
            }

            if (tasksWereCreated) {
                const { data: refreshed } = await supabase.from('crm_author_tasks').select('*');
                authorTasks = refreshed;
            }

            setData({
                authors: authors || [],
                phases: phases || [],
                workflowTasks: workflowTasks || [],
                authorTasks: authorTasks || []
            });
        } catch (error) {
            console.error("Error fetching CRM data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const selectedAuthor = data.authors.find(a => a.id === selectedId);
    const selectedAuthorTasks = data.authorTasks.filter(at => at.author_id === selectedId);

    const visibleAuthors = data.authors.filter(a =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        (a.book_title && a.book_title.toLowerCase().includes(query.toLowerCase()))
    );

    const calculateProgress = (authorId) => {
        const tasksForAuthor = data.authorTasks.filter(t => t.author_id === authorId);
        if (tasksForAuthor.length === 0) return 0;
        const completed = tasksForAuthor.filter(t => t.status === 'Completed').length;
        return Math.round((completed / tasksForAuthor.length) * 100);
    };

    return (
        <StaffLayout>
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Author Workflow Management</h1>
                <div className="flex gap-4">
                    <Input placeholder="Search authors..." value={query} onChange={e => setQuery(e.target.value)} className="w-64" />
                    <CreateAuthorForm onAuthorCreated={fetchData} workflowTasks={data.workflowTasks} />
                </div>
            </header>

            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                </div>
            ) : (
                <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <section className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
                        <h2 className="font-semibold mb-3 text-lg">Authors ({data.authors.length})</h2>
                        <div className="space-y-2 max-h-[70vh] overflow-auto">
                            {visibleAuthors.map(a => {
                                const progress = calculateProgress(a.id);
                                return (
                                    <div
                                        key={a.id}
                                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedId === a.id ? 'bg-red-100 border-red-300' : 'hover:bg-gray-50'}`}
                                        onClick={() => setSelectedId(a.id)}
                                    >
                                        <p className="font-medium text-gray-800">{a.name}</p>
                                        <p className="text-sm text-slate-600">{a.book_title || "No Title"}</p>
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <p className="text-xs text-right mt-1">{progress}% Complete</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="lg:col-span-3 bg-white rounded-lg shadow-md p-6 max-h-[80vh] overflow-auto">
                        {!selectedAuthor ? (
                            <div className="p-6 text-center text-slate-600">
                                <h3 className="text-xl font-semibold mb-2">Select an Author</h3>
                                <p>Choose an author to view their publishing pipeline workflow</p>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold">{selectedAuthor.name}</h2>
                                    <p className="text-lg text-slate-600">{selectedAuthor.book_title}</p>
                                    <p className="text-sm text-slate-500">{selectedAuthor.email} | {selectedAuthor.phone}</p>
                                </div>

                                <AccessManagement authorId={selectedAuthor.id} />
                                <StaffMessaging author={selectedAuthor} staffUser={user} />

                                <Tabs defaultValue="board" className="w-full mt-6">
                                    <TabsList className="grid w-full grid-cols-2 mb-6">
                                        <TabsTrigger value="board" className="flex items-center gap-2">
                                            <LayoutGrid className="w-4 h-4" />
                                            Phase Board
                                        </TabsTrigger>
                                        <TabsTrigger value="timeline" className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" />
                                            Gantt Timeline
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="board">
                                        <PhaseBoard
                                            phases={data.phases}
                                            authorTasks={selectedAuthorTasks}
                                            workflowTasks={data.workflowTasks}
                                            onPhaseClick={(phase) => setSelectedPhase(phase)}
                                            onUpdate={fetchData}
                                        />
                                    </TabsContent>

                                    <TabsContent value="timeline">
                                        <GanttTimeline
                                            phases={data.phases}
                                            authorTasks={selectedAuthorTasks}
                                            workflowTasks={data.workflowTasks}
                                            author={selectedAuthor}
                                            onUpdate={fetchData}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </section>
                </main>
            )}

            {selectedPhase && selectedAuthor && (
                <PhaseDetailView
                    phase={selectedPhase}
                    author={selectedAuthor}
                    authorTasks={selectedAuthorTasks}
                    workflowTasks={data.workflowTasks}
                    onClose={() => setSelectedPhase(null)}
                    onUpdate={fetchData}
                />
            )}
        </StaffLayout>
    );
}
