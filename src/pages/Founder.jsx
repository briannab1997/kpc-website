import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GraduationCap, BookOpen, Mic, Award, Users, Heart, Book, ArrowRight, Pencil, Save, X, Upload, Loader2, Plus, Trash2 } from 'lucide-react';

const iconMap = { Users, Heart, BookOpen, Mic, Award, Book, GraduationCap };

const defaultData = {
  name: "Esther Ruth Kentish",
  title: "Founder & CEO, Kentish Publishing Company",
  photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/8b487794f_ebb7b83cd_gkbp5mi24iq6mo3o1tefva0072_SY600_.jpg",
  highlights: [
    { icon: "Mic", text: "TEDx Speaker" },
    { icon: "Book", text: "Author of 15+ Books" },
    { icon: "Users", text: "Interdisciplinary Researcher" },
    { icon: "Heart", text: "Mental Health Advocate" },
  ],
  bioSections: [
    { icon: "Users", title: "Interdisciplinary Excellence", content: "Esther Ruth Kentish is an interdisciplinary researcher, author, and TEDx speaker whose work bridges the fields of scientific communication, medical humanities, and life writing. With a strong academic background in English literature, technical communication, and medical humanities, she specializes in exploring the intersections between illness, narrative, and digital media." },
    { icon: "Heart", title: "Healthcare Experience", content: "Her professional experience includes working as a Mental Health Technician in geriatric care in North Carolina, where she interacted directly with patients, gaining first hand insight into the complexities of mental health care. Currently based in Britain, she is contributing to COVID-19 research, focusing on the role of patient narratives, autobiographies, and biographies in medical discourse." },
    { icon: "BookOpen", title: "Prolific Author", content: "A prolific author, Esther has written fifteen books, including The Emotional Healing Behind Words, a poetic memoir that features a critical meta-data analysis of 47 poems written between 2009 and 2012. Her literary work not only engages with poetry and storytelling but also contributes to the de-stigmatization of illnesses, investigating their origins, causes, and socio-cultural impacts." },
    { icon: "Mic", title: "TEDx Speaker & Advocate", content: "As a TEDx speaker, she passionately communicates the significance of narrative medicine, medical humanities, and scientific communication, advocating for the use of qualitative research methods, metadata analysis, and data visualization to enhance public understanding of medical information. She also incorporates performing arts, such as spoken word poetry, music, and dance, to creatively communicate statistical data and medical narratives." },
    { icon: "Award", title: "International Impact", content: "Her research examines mortality, pandemics, gender, and race, shedding light on the lived experiences of individuals affected by disease. She has presented her work in the United States, the United Kingdom, France, and Japan, contributing to international discourse on COVID-19 and the evolving role of medical storytelling. Through her research and literary contributions, Esther Kentish continues to shape the conversation at the intersection of medicine, literature, and communication, making scientific knowledge more accessible and deeply human." }
  ],
  education: [
    { degree: "Faculty of English (2 years)", school: "University of Oxford", year: "2020-2022", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/University_of_Oxford_coat_of_arms_official.svg/200px-University_of_Oxford_coat_of_arms_official.svg.png" },
    { degree: "M.S. Medical Humanities", school: "King's College London", year: "2020", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/0f9c9f028_Kings_College_London_logosvg.png" },
    { degree: "M.S. Technical Communication", school: "North Carolina State University", year: "2018", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/ad2488074_North_Carolina_State_University_Athletic_logosvg.png" },
    { degree: "B.A. English Literature & Language", school: "University of Texas at Arlington", year: "2017", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/7f776af0e_University_of_Texas_at_Arlington_sealsvg.png" },
  ],
  affiliations: [
    { name: "Royal Society of Literature", role: "Member" },
    { name: "Royal Society of Medicine", role: "Associate Member" },
  ]
};

export default function Founder() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState(defaultData);
  const [founderRecord, setFounderRecord] = useState(null);
  const [editDialog, setEditDialog] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: records } = await supabase
          .from('founder_page')
          .select('*')
          .eq('section_key', 'main');

        if (records && records.length > 0 && records[0].content) {
          const parsed = JSON.parse(records[0].content);
          setData({ ...defaultData, ...parsed });
          setFounderRecord(records[0]);
        }
      } catch {
        // Use defaults
      }
    };
    fetchData();
  }, []);

  const saveData = async (newData) => {
    setIsSaving(true);
    try {
      const content = JSON.stringify(newData);
      if (founderRecord) {
        await supabase.from('founder_page').update({ content }).eq('id', founderRecord.id);
      } else {
        const { data: created } = await supabase
          .from('founder_page')
          .insert({ section_key: 'main', content })
          .select()
          .single();
        setFounderRecord(created);
      }
      setData(newData);
      setEditDialog(null);
    } catch (error) {
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const path = `founder/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('uploads').upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(path);
      setEditForm(f => ({ ...f, photo: publicUrl }));
    } catch {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const openHeroEdit = () => {
    setEditForm({ name: data.name, title: data.title, photo: data.photo });
    setEditDialog("hero");
  };
  const saveHero = () => saveData({ ...data, name: editForm.name, title: editForm.title, photo: editForm.photo });

  const openHighlightsEdit = () => { setEditForm({ highlights: [...data.highlights] }); setEditDialog("highlights"); };
  const saveHighlights = () => saveData({ ...data, highlights: editForm.highlights });

  const openBioEdit = (index) => { setEditForm({ index, ...data.bioSections[index] }); setEditDialog("bio"); };
  const saveBio = () => {
    const newSections = [...data.bioSections];
    newSections[editForm.index] = { icon: editForm.icon, title: editForm.title, content: editForm.content };
    saveData({ ...data, bioSections: newSections });
  };
  const addBioSection = () => saveData({ ...data, bioSections: [...data.bioSections, { icon: "BookOpen", title: "New Section", content: "Content here..." }] });
  const deleteBioSection = (index) => {
    if (!confirm("Delete this section?")) return;
    saveData({ ...data, bioSections: data.bioSections.filter((_, i) => i !== index) });
  };

  const openEducationEdit = () => { setEditForm({ education: [...data.education] }); setEditDialog("education"); };
  const saveEducation = () => saveData({ ...data, education: editForm.education });

  const openAffiliationsEdit = () => { setEditForm({ affiliations: [...data.affiliations] }); setEditDialog("affiliations"); };
  const saveAffiliations = () => saveData({ ...data, affiliations: editForm.affiliations });

  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Admin Toolbar */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-2xl rounded-lg p-3 border border-gray-200">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">Admin</span>
          <Button
            size="sm"
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
            className={isEditMode ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {isEditMode ? "Preview" : "Edit Mode"}
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 text-center relative">
        {isEditMode && (
          <Button size="sm" className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600" onClick={openHeroEdit}>
            <Pencil className="w-4 h-4 mr-1" />Edit Hero
          </Button>
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={data.photo}
            alt={data.name}
            className="w-48 h-48 rounded-full mx-auto mb-6 shadow-2xl border-4 border-white object-cover"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-2">{data.name}</h1>
          <p className="text-xl text-red-600 font-semibold">{data.title}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 relative">
            {isEditMode && (
              <Button size="sm" variant="outline" className="absolute -top-8 right-0" onClick={openHighlightsEdit}>
                <Pencil className="w-3 h-3 mr-1" />Edit
              </Button>
            )}
            {data.highlights.map((highlight, i) => {
              const IconComp = iconMap[highlight.icon] || Book;
              return (
                <Badge key={i} variant="secondary" className="bg-red-100 text-red-700 text-sm px-3 py-1">
                  <IconComp className="w-4 h-4 mr-2" />
                  {highlight.text}
                </Badge>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">

          {/* Left Column for Bio */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-red-100">
              <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100 p-8 flex flex-row items-center justify-between">
                <CardTitle className="text-3xl font-bold text-gray-900">A Legacy of Interdisciplinary Excellence</CardTitle>
                {isEditMode && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={addBioSection}>
                    <Plus className="w-4 h-4 mr-1" />Add Section
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-10">
                  {data.bioSections.map((section, index) => {
                    const IconComp = iconMap[section.icon] || BookOpen;
                    return (
                      <div key={index} className="flex items-start gap-x-6 relative group">
                        {isEditMode && (
                          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button size="sm" className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600" onClick={() => openBioEdit(index)}>
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button size="sm" className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600" onClick={() => deleteBioSection(index)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        <IconComp className="w-10 h-10 text-red-600/70 flex-shrink-0 mt-1" strokeWidth={1.5} />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{section.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card className="shadow-lg border-red-100 relative group">
              {isEditMode && (
                <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 hover:bg-blue-600" onClick={openEducationEdit}>
                  <Pencil className="w-3 h-3" />
                </Button>
              )}
              <CardHeader className="flex flex-row items-center space-x-3">
                <GraduationCap className="w-6 h-6 text-red-600" />
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {data.education.map((edu, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <img src={edu.logo} alt={`${edu.school} logo`} className="h-12 w-12 object-contain flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.school} ({edu.year})</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-red-100 relative group">
              {isEditMode && (
                <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 hover:bg-blue-600" onClick={openAffiliationsEdit}>
                  <Pencil className="w-3 h-3" />
                </Button>
              )}
              <CardHeader className="flex flex-row items-center space-x-3">
                <Award className="w-6 h-6 text-red-600" />
                <CardTitle>Affiliations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.affiliations.map((aff, i) => (
                    <li key={i}>
                      <p className="font-semibold text-gray-800">{aff.name}</p>
                      <p className="text-sm text-gray-600">{aff.role}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white text-center p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Connect with Our Vision</h3>
              <p className="mb-6">Learn more about our mission to democratize publishing and empower diverse voices.</p>
              <Link to={createPageUrl("About")}>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600 w-full">
                  About Kentish Publishing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero Edit Dialog */}
      <Dialog open={editDialog === "hero"} onOpenChange={() => setEditDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Hero Section</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input value={editForm.name || ""} onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>Title</Label><Input value={editForm.title || ""} onChange={(e) => setEditForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div>
              <Label>Photo</Label>
              <div className="flex items-center gap-4 mt-2">
                {editForm.photo && <img src={editForm.photo} className="w-20 h-20 rounded-full object-cover" alt="preview" />}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="hero-photo" />
                <label htmlFor="hero-photo">
                  <Button type="button" variant="outline" disabled={isUploading} asChild>
                    <span>{isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}{isUploading ? "Uploading..." : "Upload"}</span>
                  </Button>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialog(null)}>Cancel</Button>
              <Button onClick={saveHero} disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}<Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Highlights Edit Dialog */}
      <Dialog open={editDialog === "highlights"} onOpenChange={() => setEditDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Highlights</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {editForm.highlights?.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <select value={h.icon} onChange={(e) => { const newH = [...editForm.highlights]; newH[i].icon = e.target.value; setEditForm(f => ({ ...f, highlights: newH })); }} className="border rounded px-2 py-1 text-sm">
                  {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
                <Input value={h.text} onChange={(e) => { const newH = [...editForm.highlights]; newH[i].text = e.target.value; setEditForm(f => ({ ...f, highlights: newH })); }} className="flex-1" />
                <Button size="sm" variant="ghost" onClick={() => { const newH = editForm.highlights.filter((_, idx) => idx !== i); setEditForm(f => ({ ...f, highlights: newH })); }}><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => setEditForm(f => ({ ...f, highlights: [...(f.highlights || []), { icon: "Book", text: "New" }] }))}><Plus className="w-4 h-4 mr-1" />Add</Button>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialog(null)}>Cancel</Button>
              <Button onClick={saveHighlights} disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}<Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bio Edit Dialog */}
      <Dialog open={editDialog === "bio"} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Edit Bio Section</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div>
                <Label>Icon</Label>
                <select value={editForm.icon || "BookOpen"} onChange={(e) => setEditForm(f => ({ ...f, icon: e.target.value }))} className="border rounded px-2 py-2 w-full">
                  {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
              <div className="flex-1"><Label>Title</Label><Input value={editForm.title || ""} onChange={(e) => setEditForm(f => ({ ...f, title: e.target.value }))} /></div>
            </div>
            <div><Label>Content</Label><Textarea value={editForm.content || ""} onChange={(e) => setEditForm(f => ({ ...f, content: e.target.value }))} rows={6} /></div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialog(null)}>Cancel</Button>
              <Button onClick={saveBio} disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}<Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Education Edit Dialog */}
      <Dialog open={editDialog === "education"} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Education</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {editForm.education?.map((edu, i) => (
              <div key={i} className="border p-3 rounded space-y-2">
                <Input value={edu.degree} onChange={(e) => { const newE = [...editForm.education]; newE[i].degree = e.target.value; setEditForm(f => ({ ...f, education: newE })); }} placeholder="Degree" />
                <Input value={edu.school} onChange={(e) => { const newE = [...editForm.education]; newE[i].school = e.target.value; setEditForm(f => ({ ...f, education: newE })); }} placeholder="School" />
                <Input value={edu.year} onChange={(e) => { const newE = [...editForm.education]; newE[i].year = e.target.value; setEditForm(f => ({ ...f, education: newE })); }} placeholder="Year" />
                <Input value={edu.logo} onChange={(e) => { const newE = [...editForm.education]; newE[i].logo = e.target.value; setEditForm(f => ({ ...f, education: newE })); }} placeholder="Logo URL" />
                <Button size="sm" variant="destructive" onClick={() => { const newE = editForm.education.filter((_, idx) => idx !== i); setEditForm(f => ({ ...f, education: newE })); }}><Trash2 className="w-3 h-3 mr-1" />Remove</Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => setEditForm(f => ({ ...f, education: [...(f.education || []), { degree: "", school: "", year: "", logo: "" }] }))}><Plus className="w-4 h-4 mr-1" />Add</Button>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialog(null)}>Cancel</Button>
              <Button onClick={saveEducation} disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}<Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Affiliations Edit Dialog */}
      <Dialog open={editDialog === "affiliations"} onOpenChange={() => setEditDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Affiliations</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {editForm.affiliations?.map((aff, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={aff.name} onChange={(e) => { const newA = [...editForm.affiliations]; newA[i].name = e.target.value; setEditForm(f => ({ ...f, affiliations: newA })); }} placeholder="Name" className="flex-1" />
                <Input value={aff.role} onChange={(e) => { const newA = [...editForm.affiliations]; newA[i].role = e.target.value; setEditForm(f => ({ ...f, affiliations: newA })); }} placeholder="Role" className="w-32" />
                <Button size="sm" variant="ghost" onClick={() => { const newA = editForm.affiliations.filter((_, idx) => idx !== i); setEditForm(f => ({ ...f, affiliations: newA })); }}><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => setEditForm(f => ({ ...f, affiliations: [...(f.affiliations || []), { name: "", role: "" }] }))}><Plus className="w-4 h-4 mr-1" />Add</Button>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialog(null)}>Cancel</Button>
              <Button onClick={saveAffiliations} disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}<Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
