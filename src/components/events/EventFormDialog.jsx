import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/api/supabaseClient';

const EVENT_TYPES = ["Book Signing", "Workshop", "Writing Retreat", "Summer Internship Program", "Specialized Training", "Other"];
const DEFAULT_PAYMENT_LINK = 'https://wise.com/pay/business/kentishpublishingcompany';

export default function EventFormDialog({ open, event, onClose, onSaved }) {
  const [form, setForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(event ? { ...event, custom_links: event.custom_links || [] } : {
        title: '', event_type: 'Workshop', description: '', date: '', time: '',
        location: '', is_virtual: false, virtual_link: '', capacity: '',
        price: '', payment_link: DEFAULT_PAYMENT_LINK, payment_link_label: 'Pay Now',
        custom_links: [], image_url: '', tags: '', host_name: '', contact_email: '',
        is_active: true, is_upcoming: true, registration_open: true, display_order: 0
      });
    }
  }, [open, event]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const addLink = () => setForm(f => ({ ...f, custom_links: [...(f.custom_links || []), { label: '', url: '' }] }));
  const updateLink = (i, field, val) => setForm(f => {
    const links = [...(f.custom_links || [])];
    links[i] = { ...links[i], [field]: val };
    return { ...f, custom_links: links };
  });
  const removeLink = (i) => setForm(f => ({ ...f, custom_links: (f.custom_links || []).filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.title) return alert('Title is required');
    setIsSaving(true);
    try {
      const { id, ...data } = form;
      if (id) {
        const { error } = await supabase.from('events').update(data).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('events').insert(data);
        if (error) throw error;
      }
      onSaved();
      onClose();
    } catch (e) {
      alert('Failed to save event');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{form.id ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title *</Label>
            <Input value={form.title || ''} onChange={e => set('title', e.target.value)} placeholder="Event title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Event Type</Label>
              <Select value={form.event_type || 'Workshop'} onValueChange={v => set('event_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Host / Presenter</Label>
              <Input value={form.host_name || ''} onChange={e => set('host_name', e.target.value)} placeholder="e.g. Esther Ruth Kentish" />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description || ''} onChange={e => set('description', e.target.value)} rows={4} placeholder="Describe the event..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input type="date" value={form.date || ''} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <Label>Time</Label>
              <Input value={form.time || ''} onChange={e => set('time', e.target.value)} placeholder="e.g. 2:00 PM - 5:00 PM" />
            </div>
          </div>
          <div>
            <Label>Location</Label>
            <Input value={form.location || ''} onChange={e => set('location', e.target.value)} placeholder="Venue name, city" />
          </div>

          <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700">Pricing & Payment</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input value={form.price || ''} onChange={e => set('price', e.target.value)} placeholder="e.g. £50 or Free" />
              </div>
              <div>
                <Label>Payment Button Label</Label>
                <Input value={form.payment_link_label || ''} onChange={e => set('payment_link_label', e.target.value)} placeholder="Pay Now" />
              </div>
            </div>
            <div>
              <Label>Payment Link URL</Label>
              <Input value={form.payment_link || ''} onChange={e => set('payment_link', e.target.value)} placeholder="https://wise.com/pay/business/..." />
              <p className="text-xs text-gray-400 mt-1">Default: Kentish Publishing Wise payment page</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1"><LinkIcon className="w-3.5 h-3.5" /> Additional Links</p>
              <Button type="button" size="sm" variant="outline" onClick={addLink} className="h-7 text-xs">
                <Plus className="w-3 h-3 mr-1" /> Add Link
              </Button>
            </div>
            {(form.custom_links || []).length === 0 && (
              <p className="text-xs text-gray-400 italic">No additional links. Add links like "Apply Here", "Learn More", "View Brochure", etc.</p>
            )}
            {(form.custom_links || []).map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={link.label} onChange={e => updateLink(i, 'label', e.target.value)} placeholder="Label (e.g. Apply Here)" className="w-36 text-sm" />
                <Input value={link.url} onChange={e => updateLink(i, 'url', e.target.value)} placeholder="https://..." className="flex-1 text-sm" />
                <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500" onClick={() => removeLink(i)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div>
            <Label>Image URL (optional)</Label>
            <Input value={form.image_url || ''} onChange={e => set('image_url', e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tags (comma-separated)</Label>
              <Input value={form.tags || ''} onChange={e => set('tags', e.target.value)} placeholder="writing, retreat, paid" />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input value={form.contact_email || ''} onChange={e => set('contact_email', e.target.value)} placeholder="events@kentish.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Capacity</Label>
              <Input type="number" value={form.capacity || ''} onChange={e => set('capacity', e.target.value)} placeholder="Max attendees" />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" value={form.display_order || 0} onChange={e => set('display_order', parseInt(e.target.value) || 0)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Switch checked={!!form.is_virtual} onCheckedChange={v => set('is_virtual', v)} />
              <Label>Virtual Event</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.registration_open !== false} onCheckedChange={v => set('registration_open', v)} />
              <Label>Registration Open</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_upcoming !== false} onCheckedChange={v => set('is_upcoming', v)} />
              <Label>Upcoming (not past)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_active !== false} onCheckedChange={v => set('is_active', v)} />
              <Label>Active / Visible</Label>
            </div>
          </div>
          {form.is_virtual && (
            <div>
              <Label>Virtual Meeting Link</Label>
              <Input value={form.virtual_link || ''} onChange={e => set('virtual_link', e.target.value)} placeholder="https://zoom.us/..." />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
