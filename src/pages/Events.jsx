import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar, PenTool, GraduationCap, Globe, Target, ArrowRight,
  BookOpen, MapPin, User, Plus, Loader2, Users
} from "lucide-react";
import EventCard from '@/components/events/EventCard';
import EventFormDialog from '@/components/events/EventFormDialog';
import EventSignUpDialog from '@/components/events/EventSignUpDialog';

const eventTypes = [
  {
    title: "Book Signings",
    icon: BookOpen,
    description: "We host and organize professional book signings for our authors, helping them connect directly with readers, build visibility, and celebrate their work.",
    color: "purple",
    features: ["Professional venue coordination", "Marketing support", "Reader engagement opportunities", "Author visibility"]
  },
  {
    title: "Workshops",
    icon: PenTool,
    description: "From writing craft to narrative medicine, we run interactive workshops for authors, students, and professionals. Past workshops include collaborations with universities, hospitals, and arts organizations.",
    color: "blue",
    features: ["Writing craft development", "Narrative medicine techniques", "University collaborations", "Professional development"]
  },
  {
    title: "Writing Retreats",
    icon: Globe,
    description: "Our all-inclusive writing retreats take place in inspiring locations such as Japan, England, Italy, and France. Guided personally by our Founder, these retreats provide:",
    color: "green",
    features: ["Daily feedback and one-on-one mentoring", "Focused writing sessions in serene environments", "Community with other creatives", "Time to recharge, reflect, and produce meaningful work"],
    locations: ["Japan", "England", "Italy", "France"]
  },
  {
    title: "Summer Internship Programs",
    icon: GraduationCap,
    description: "We offer structured summer internships that allow students and emerging professionals to learn about publishing, editing, and creative entrepreneurship through hands-on experience.",
    color: "yellow",
    features: ["Hands-on publishing experience", "Editorial training", "Creative entrepreneurship", "Professional mentorship"]
  },
  {
    title: "Specialized Training",
    icon: Target,
    description: "Beyond events open to the public, we also host exclusive training sessions for:",
    color: "red",
    features: ["Authors (developing their craft and publishing strategy)", "Game designers (narrative and worldbuilding guidance)", "Consultants and professionals (communication, storytelling, and publishing insights)"],
    exclusive: true
  }
];

const colorClasses = {
  purple: { bg: "bg-purple-100", text: "text-purple-600", gradient: "from-purple-600 to-purple-700" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", gradient: "from-blue-600 to-blue-700" },
  green: { bg: "bg-green-100", text: "text-green-600", gradient: "from-green-600 to-green-700" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", gradient: "from-yellow-600 to-orange-600" },
  red: { bg: "bg-red-100", text: "text-red-600", gradient: "from-red-600 to-red-700" }
};

export default function Events() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [signUpEvent, setSignUpEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('display_order');

      if (!error && data) {
        setEvents(data.filter(e => e.is_active !== false));
      } else {
        setEvents([]);
      }
    } catch {
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event) => { setEditingEvent(event); setShowForm(true); };
  const handleAdd = () => { setEditingEvent(null); setShowForm(true); };
  const handleCloseForm = () => { setShowForm(false); setEditingEvent(null); };

  const handleDelete = async (event) => {
    if (!confirm(`Delete "${event.title}"?`)) return;
    await supabase.from('events').delete().eq('id', event.id);
    fetchEvents();
  };

  const upcomingEvents = events.filter(e => e.is_upcoming !== false);
  const pastEvents = events.filter(e => e.is_upcoming === false);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex mx-auto w-fit items-center justify-center bg-red-100 rounded-full p-4 mb-6">
            <Calendar className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Events at Kentish Publishing Company</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Kentish Publishing, we believe in creating spaces where creativity and collaboration can flourish.
            Our events connect authors, readers, and creatives across disciplines.
          </p>
        </div>
      </section>

      {/* Live Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Events</h2>
              <p className="text-gray-600 mt-1">Sign up for upcoming events or browse past ones</p>
            </div>
            {isAdmin && (
              <Button onClick={handleAdd} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" /> Add Event
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-red-600" /></div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No events listed yet.</p>
              {isAdmin && <p className="text-sm mt-1">Click "Add Event" to create your first event.</p>}
            </div>
          ) : (
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-8">
                <TabsTrigger value="upcoming">
                  Upcoming <Badge className="ml-2 bg-red-100 text-red-700">{upcomingEvents.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past <Badge className="ml-2 bg-gray-100 text-gray-700">{pastEvents.length}</Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                {upcomingEvents.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No upcoming events at the moment. Check back soon!</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map(event => (
                      <EventCard key={event.id} event={event} isAdmin={isAdmin} onEdit={handleEdit} onDelete={handleDelete} onSignUp={setSignUpEvent} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past">
                {pastEvents.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No past events recorded yet.</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map(event => (
                      <EventCard key={event.id} event={event} isAdmin={isAdmin} onEdit={handleEdit} onDelete={handleDelete} onSignUp={setSignUpEvent} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Event Types Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Events We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover all the ways to engage with our publishing community</p>
          </div>
          <div className="space-y-16">
            {eventTypes.map((event, index) => (
              <Card key={event.title} className="shadow-2xl border-red-100 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${colorClasses[event.color].gradient}`}></div>
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${colorClasses[event.color].bg} rounded-full flex items-center justify-center mr-4`}>
                        <event.icon className={`w-8 h-8 ${colorClasses[event.color].text}`} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
                        {event.exclusive && <Badge className="bg-red-100 text-red-700 mt-2">Exclusive</Badge>}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{event.description}</p>
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">What We Offer:</h3>
                      <ul className="space-y-2">
                        {event.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className={`w-2 h-2 ${colorClasses[event.color].bg} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {event.locations && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Retreat Locations:</h3>
                        <div className="flex flex-wrap gap-2">
                          {event.locations.map(location => (
                            <Badge key={location} variant="outline" className={`${colorClasses[event.color].text} border-current`}>
                              <MapPin className="w-3 h-3 mr-1" />{location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`${colorClasses[event.color].bg} p-8 lg:p-12 flex flex-col justify-center`}>
                    <div className="text-center">
                      <event.icon className={`w-24 h-24 ${colorClasses[event.color].text} mx-auto mb-6 opacity-80`} />
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Join?</h3>
                      <p className="text-gray-600 mb-6">Get in touch to learn more about our {event.title.toLowerCase()} and how to participate.</p>
                      <Link to={event.title === "Book Signings" ? createPageUrl("BookSignings") : createPageUrl("Contact")}>
                        <Button className={`bg-gradient-to-r ${colorClasses[event.color].gradient} hover:shadow-lg text-white`}>
                          {event.title === "Book Signings" ? "Learn More About Book Signings" : "Learn More"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Excursion: Japan */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Past Excursions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Celebrating our journey of creative exploration and international collaboration.</p>
          </div>
          <Card className="shadow-2xl border-purple-100 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Past Excursion: Japan</h2>
                    <Badge className="bg-purple-100 text-purple-700 mt-2">International Event</Badge>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p>Kentish Publishing's first international excursion took place in Japan, beginning with an academic conference in Tokyo and evolving into a period of cultural immersion and creative development.</p>
                  <p>Hosted at the <strong>Hilton Odiba</strong>, we balanced professional engagement with reflection and exploration, using Japan's rich cultural landscape as a backdrop for writing, dialogue, and creative practice. This journey directly inspired and led to the publication of <em>Beyond Japan: A Memoir of Unknowing</em>.</p>
                  <p>This excursion established the foundation for what Kentish Publishing now offers through our international writing retreats: structured opportunities to travel, learn, and write within a guided curriculum.</p>
                </div>
                <Link to={createPageUrl("Contact")} className="inline-block">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg text-white px-8 py-3">
                    Register for Next Writing Retreat <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="bg-purple-100 p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-center">
                  <Globe className="w-24 h-24 text-purple-600 mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cultural Immersion</h3>
                  <p className="text-gray-600 mb-6">Experience the transformative power of international creative exploration and writing development.</p>
                  <div className="space-y-3 text-left">
                    {["Academic conferences", "Cultural immersion", "Writing development", "Creative practice"].map(item => (
                      <div key={item} className="flex items-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <User className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">Personally Guided by Our Founder</h2>
              <p className="text-xl text-red-100 leading-relaxed mb-6">
                All of our retreats and specialized training sessions are personally guided by Esther Ruth Kentish,
                ensuring you receive expert mentorship and individualized attention throughout your creative journey.
              </p>
              <Link to={createPageUrl("Founder")}>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-3">
                  Meet Our Founder <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Creative Community?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you're interested in attending a workshop, joining a retreat, or exploring internship opportunities, we're here to support your creative journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                Get Event Information <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("About")}>
              <Button variant="outline" size="lg" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Learn About Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <EventFormDialog open={showForm} event={editingEvent} onClose={handleCloseForm} onSaved={fetchEvents} />
      <EventSignUpDialog open={!!signUpEvent} event={signUpEvent} onClose={() => setSignUpEvent(null)} />
    </div>
  );
}
