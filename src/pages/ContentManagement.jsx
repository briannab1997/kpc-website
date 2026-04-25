import React, { useState, useEffect } from "react";
import StaffLayout from "@/components/staff/StaffLayout";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Loader2,
  Users,
  FileText,
  Save,
  X,
  Image as ImageIcon
} from "lucide-react";

const categoryLabels = {
  beta_reader: "Beta Reader",
  game_designer: "Game Designer",
  creative_developer: "Creative Developer",
  leadership: "Leadership",
  other: "Other"
};

function TeamMemberForm({ member, onSave, onCancel }) {
  const [form, setForm] = useState(member || {
    name: "",
    role: "",
    category: "beta_reader",
    photo: "",
    biography: "",
    display_order: 0,
    is_active: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const path = `team/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('uploads').upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(path);
      setForm(f => ({ ...f, photo: publicUrl }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role) {
      alert("Please fill in name and role");
      return;
    }
    setIsSaving(true);
    try {
      await onSave(form);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Full name"
          />
        </div>
        <div>
          <Label>Role *</Label>
          <Input
            value={form.role}
            onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
            placeholder="e.g., Beta Reader"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(v) => setForm(f => ({ ...f, category: v }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Display Order</Label>
          <Input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div>
        <Label>Photo</Label>
        <div className="flex items-center gap-4 mt-2">
          {form.photo && (
            <img src={form.photo} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload">
              <Button type="button" variant="outline" disabled={isUploading} asChild>
                <span>
                  {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  {isUploading ? "Uploading..." : "Upload Photo"}
                </span>
              </Button>
            </label>
          </div>
          {form.photo && (
            <Button variant="ghost" size="sm" onClick={() => setForm(f => ({ ...f, photo: "" }))}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div>
        <Label>Biography</Label>
        <Textarea
          value={form.biography}
          onChange={(e) => setForm(f => ({ ...f, biography: e.target.value }))}
          rows={6}
          placeholder="Write the team member's biography..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={form.is_active}
          onCheckedChange={(v) => setForm(f => ({ ...f, is_active: v }))}
        />
        <Label>Active (visible on website)</Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

function ContentBlockForm({ block, onSave, onCancel }) {
  const [form, setForm] = useState(block || {
    page_name: "",
    section_id: "",
    title: "",
    content: "",
    image_url: "",
    text_color: "#000000",
    background_color: "#ffffff",
    font_family: "inherit",
    font_size: "16px",
    display_order: 0,
    is_active: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const path = `content/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('uploads').upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(path);
      setForm(f => ({ ...f, image_url: publicUrl }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.page_name || !form.section_id) {
      alert("Please fill in page name and section ID");
      return;
    }
    setIsSaving(true);
    try {
      await onSave(form);
    } finally {
      setIsSaving(false);
    }
  };

  const fontOptions = [
    { value: "inherit", label: "Default" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Courier New, monospace", label: "Courier New" }
  ];

  const pageOptions = [
    "Home", "About", "Team", "Authors", "Books", "Events",
    "Collaborations", "Prisons", "HospitalsAndHealthcare",
    "CommunityPartnerships", "RapeCrisisCenters", "Contact"
  ];

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Page Name *</Label>
          <Select value={form.page_name} onValueChange={(v) => setForm(f => ({ ...f, page_name: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {pageOptions.map((page) => (
                <SelectItem key={page} value={page}>{page}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Section ID *</Label>
          <Input
            value={form.section_id}
            onChange={(e) => setForm(f => ({ ...f, section_id: e.target.value }))}
            placeholder="e.g., hero-subtitle, custom-section-1"
          />
        </div>
      </div>

      <div>
        <Label>Title (Optional)</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Section title"
        />
      </div>

      <div>
        <Label>Content</Label>
        <Textarea
          value={form.content}
          onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
          rows={8}
          placeholder="Enter content here..."
          className="font-mono text-sm"
        />
      </div>

      <div>
        <Label>Image</Label>
        <div className="flex items-center gap-4 mt-2">
          {form.image_url && (
            <img src={form.image_url} alt="Preview" className="w-32 h-20 object-cover rounded-lg" />
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="content-image-upload"
            />
            <label htmlFor="content-image-upload">
              <Button type="button" variant="outline" disabled={isUploading} asChild>
                <span>
                  {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                  {isUploading ? "Uploading..." : "Upload Image"}
                </span>
              </Button>
            </label>
          </div>
          {form.image_url && (
            <Button variant="ghost" size="sm" onClick={() => setForm(f => ({ ...f, image_url: "" }))}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Text Color</Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={form.text_color}
              onChange={(e) => setForm(f => ({ ...f, text_color: e.target.value }))}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <Input
              value={form.text_color}
              onChange={(e) => setForm(f => ({ ...f, text_color: e.target.value }))}
              placeholder="#000000"
            />
          </div>
        </div>
        <div>
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={form.background_color}
              onChange={(e) => setForm(f => ({ ...f, background_color: e.target.value }))}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <Input
              value={form.background_color}
              onChange={(e) => setForm(f => ({ ...f, background_color: e.target.value }))}
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Font Family</Label>
          <Select value={form.font_family} onValueChange={(v) => setForm(f => ({ ...f, font_family: v }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Font Size</Label>
          <Input
            value={form.font_size}
            onChange={(e) => setForm(f => ({ ...f, font_size: e.target.value }))}
            placeholder="16px"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Display Order</Label>
          <Input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch
            checked={form.is_active}
            onCheckedChange={(v) => setForm(f => ({ ...f, is_active: v }))}
          />
          <Label>Active</Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

export default function ContentManagement() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showBlockForm, setShowBlockForm] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [{ data: members }, { data: blocks }] = await Promise.all([
        supabase.from('team_members').select('*').order('display_order'),
        supabase.from('content_blocks').select('*').order('display_order')
      ]);
      setTeamMembers(members || []);
      setContentBlocks(blocks || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveMember = async (data) => {
    try {
      if (editingMember) {
        await supabase.from('team_members').update(data).eq('id', editingMember.id);
      } else {
        await supabase.from('team_members').insert(data);
      }
      setShowMemberForm(false);
      setEditingMember(null);
      fetchData();
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Failed to save team member");
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await supabase.from('team_members').delete().eq('id', id);
      fetchData();
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member");
    }
  };

  const handleSaveBlock = async (data) => {
    try {
      if (editingBlock) {
        await supabase.from('content_blocks').update(data).eq('id', editingBlock.id);
      } else {
        await supabase.from('content_blocks').insert(data);
      }
      setShowBlockForm(false);
      setEditingBlock(null);
      fetchData();
    } catch (error) {
      console.error("Error saving content block:", error);
      alert("Failed to save content block");
    }
  };

  const handleDeleteBlock = async (id) => {
    try {
      await supabase.from('content_blocks').delete().eq('id', id);
      fetchData();
    } catch (error) {
      console.error("Error deleting content block:", error);
      alert("Failed to delete content block");
    }
  };

  if (isLoading) {
    return (
      <StaffLayout>
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      </StaffLayout>
    );
  }

  return (
    <StaffLayout>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-600">Manage team members and website content</p>
      </header>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Content Blocks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <Dialog open={showMemberForm} onOpenChange={setShowMemberForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingMember(null); setShowMemberForm(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                  </DialogHeader>
                  <TeamMemberForm
                    member={editingMember}
                    onSave={handleSaveMember}
                    onCancel={() => { setShowMemberForm(false); setEditingMember(null); }}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {teamMembers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No team members yet. Add your first team member!</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className={`${!member.is_active ? 'opacity-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="w-16 h-16 object-cover rounded-lg" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Users className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{categoryLabels[member.category]}</span>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setEditingMember(member); setShowMemberForm(true); }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {member.name}? This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteMember(member.id)} className="bg-red-600">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Content Blocks</CardTitle>
              <Dialog open={showBlockForm} onOpenChange={setShowBlockForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingBlock(null); setShowBlockForm(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content Block
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{editingBlock ? "Edit Content Block" : "Add Content Block"}</DialogTitle>
                  </DialogHeader>
                  <ContentBlockForm
                    block={editingBlock}
                    onSave={handleSaveBlock}
                    onCancel={() => { setShowBlockForm(false); setEditingBlock(null); }}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {contentBlocks.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No content blocks yet. Add your first content block!</p>
              ) : (
                <div className="space-y-4">
                  {contentBlocks.map((block) => (
                    <Card key={block.id} className={`${!block.is_active ? 'opacity-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                {block.page_name}
                              </span>
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {block.section_id}
                              </span>
                            </div>
                            {block.title && <h3 className="font-semibold">{block.title}</h3>}
                            {block.content && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{block.content}</p>
                            )}
                            {block.image_url && (
                              <img src={block.image_url} alt="" className="w-24 h-16 object-cover rounded mt-2" />
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => { setEditingBlock(block); setShowBlockForm(true); }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Content Block</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this content block? This cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteBlock(block.id)} className="bg-red-600">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StaffLayout>
  );
}
