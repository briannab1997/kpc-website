import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Pencil, Trash2, ArrowRight, Wifi, CreditCard, ExternalLink, Mail } from 'lucide-react';
import { format } from 'date-fns';

const typeColors = {
  "Book Signing": "bg-purple-100 text-purple-700",
  "Workshop": "bg-blue-100 text-blue-700",
  "Writing Retreat": "bg-green-100 text-green-700",
  "Summer Internship Program": "bg-yellow-100 text-yellow-700",
  "Specialized Training": "bg-red-100 text-red-700",
  "Other": "bg-gray-100 text-gray-700",
};

export default function EventCard({ event, isAdmin, onEdit, onDelete, onSignUp }) {
  const tags = event.tags ? event.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <Card className="shadow-md border-red-100 hover:shadow-xl transition-shadow overflow-hidden group relative flex flex-col">
      <div className="h-2 bg-gradient-to-r from-red-600 to-red-700"></div>
      {event.image_url && (
        <div className="h-48 overflow-hidden">
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-2">
            <Badge className={typeColors[event.event_type] || typeColors["Other"]}>{event.event_type}</Badge>
            {event.is_virtual && <Badge variant="outline" className="text-blue-600 border-blue-300"><Wifi className="w-3 h-3 mr-1" />Virtual</Badge>}
            {!event.registration_open && <Badge variant="outline" className="text-gray-500">Registration Closed</Badge>}
            {tags.map(tag => <Badge key={tag} variant="outline" className="text-gray-500 text-xs">{tag}</Badge>)}
          </div>
          {isAdmin && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-blue-600 hover:bg-blue-50" onClick={() => onEdit(event)}>
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50" onClick={() => onDelete(event)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
        {event.host_name && <p className="text-sm text-red-600 font-medium mb-2">Hosted by {event.host_name}</p>}
        {event.description && <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{event.description}</p>}

        <div className="space-y-2 mb-4">
          {event.date && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
          {event.capacity && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Capacity: {event.capacity}</span>
            </div>
          )}
          {event.price && (
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <span className="w-4 h-4 text-center text-red-500 flex-shrink-0 font-bold">£</span>
              <span>{event.price}</span>
            </div>
          )}
          {event.contact_email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
              <a href={`mailto:${event.contact_email}`} className="hover:text-red-600 underline">{event.contact_email}</a>
            </div>
          )}
        </div>

        {event.custom_links && event.custom_links.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.custom_links.map((link, i) => link.url && (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="text-xs h-7 border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-600">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {link.label || 'View Link'}
                </Button>
              </a>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-2">
          {event.payment_link && (
            <a href={event.payment_link} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <CreditCard className="w-4 h-4 mr-2" />
                {event.payment_link_label || 'Pay Now'}
              </Button>
            </a>
          )}
          {event.registration_open && (
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => onSignUp(event)}>
              Sign Up for This Event
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
