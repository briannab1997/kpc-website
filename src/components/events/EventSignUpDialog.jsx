import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/api/supabaseClient';
import { format } from 'date-fns';

export default function EventSignUpDialog({ open, event, onClose }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    occupation: '', how_did_you_hear: '', special_requirements: '', additional_notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('event_registrations').insert({
        ...form,
        event_id: event.id,
        event_title: event.title,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ first_name: '', last_name: '', email: '', phone: '', occupation: '', how_did_you_hear: '', special_requirements: '', additional_notes: '' });
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Registered!</h2>
            <p className="text-gray-600 mb-2">Thank you, <strong>{form.first_name}</strong>! You've successfully signed up for:</p>
            <p className="text-red-600 font-semibold text-lg mb-4">{event.title}</p>
            <p className="text-sm text-gray-500 mb-6">We'll be in touch at <strong>{form.email}</strong> with further details.</p>
            <Button onClick={handleClose} className="bg-red-600 hover:bg-red-700">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Sign Up: {event.title}</DialogTitle>
              <DialogDescription asChild>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 pt-1">
                  {event.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(event.date), 'MMMM d, yyyy')}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input required value={form.first_name} onChange={e => set('first_name', e.target.value)} placeholder="Jane" />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input required value={form.last_name} onChange={e => set('last_name', e.target.value)} placeholder="Smith" />
                </div>
              </div>
              <div>
                <Label>Email Address *</Label>
                <Input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7700 900000" />
              </div>
              <div>
                <Label>Occupation / Role</Label>
                <Input value={form.occupation} onChange={e => set('occupation', e.target.value)} placeholder="e.g. Author, Student, Professional" />
              </div>
              <div>
                <Label>How did you hear about this event?</Label>
                <Input value={form.how_did_you_hear} onChange={e => set('how_did_you_hear', e.target.value)} placeholder="Social media, word of mouth, etc." />
              </div>
              <div>
                <Label>Special Requirements / Accessibility Needs</Label>
                <Input value={form.special_requirements} onChange={e => set('special_requirements', e.target.value)} placeholder="Dietary needs, accessibility, etc." />
              </div>
              <div>
                <Label>Additional Notes / Questions</Label>
                <Textarea value={form.additional_notes} onChange={e => set('additional_notes', e.target.value)} rows={3} placeholder="Anything else you'd like us to know..." />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Complete Registration
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
