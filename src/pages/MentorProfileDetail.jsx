import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Loader2, Mail, Globe, ExternalLink, BookOpen, FileText } from "lucide-react";

export default function MentorProfileDetail() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const params = new URLSearchParams(location.search);
      const profileId = params.get("id");

      if (!profileId) {
        navigate(createPageUrl("GeniusMentorshipNetwork"));
        return;
      }

      try {
        const { data, error } = await supabase
          .from('mentor_profiles')
          .select('*')
          .eq('id', profileId)
          .single();

        if (error || !data) {
          navigate(createPageUrl("GeniusMentorshipNetwork"));
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate(createPageUrl("GeniusMentorshipNetwork"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, location.search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="py-20 bg-gradient-to-br from-cream-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          onClick={() => navigate(createPageUrl("GeniusMentorshipNetwork"))}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Genius Network
        </Button>

        <Card className="shadow-2xl border-red-100">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Large Profile Picture */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-200 border-4 border-red-100 shadow-lg">
                  {(profile.large_photo_url || profile.photo_url) ? (
                    <img
                      src={profile.large_photo_url || profile.photo_url}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Users className="w-32 h-32" />
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <Badge className={`mb-2 ${profile.profile_type === "mentor" ? "bg-indigo-600" : "bg-red-600"}`}>
                    {profile.profile_type === "mentor" ? "Mentor" : "Mentee"}
                  </Badge>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                  {profile.title && (
                    <p className="text-xl text-red-600 font-semibold mb-4">{profile.title}</p>
                  )}
                  {profile.description && (
                    <p className="text-lg text-gray-700 mb-6">{profile.description}</p>
                  )}
                </div>

                {profile.expertise_areas && profile.expertise_areas.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-gray-900 mb-3">Areas of Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise_areas.map((area, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 text-sm"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact & Social Links */}
            {(profile.email || profile.website || profile.social_media) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.email && (
                    <a href={`mailto:${profile.email}`}>
                      <Button variant="outline" className="text-gray-900">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-gray-900">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </Button>
                    </a>
                  )}
                  {profile.social_media?.twitter && (
                    <a href={profile.social_media.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-gray-900">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Twitter/X
                      </Button>
                    </a>
                  )}
                  {profile.social_media?.linkedin && (
                    <a href={profile.social_media.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-gray-900">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </a>
                  )}
                  {profile.social_media?.instagram && (
                    <a href={profile.social_media.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-gray-900">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Instagram
                      </Button>
                    </a>
                  )}
                  {profile.social_media?.facebook && (
                    <a href={profile.social_media.facebook} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-gray-900">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Books & Articles (Mentors Only) */}
            {profile.profile_type === "mentor" && profile.books_articles && profile.books_articles.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Publications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.books_articles.map((item, idx) => (
                    <Card key={idx} className="border-red-100">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {item.type === "book" ? (
                            <BookOpen className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          ) : (
                            <FileText className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.type === "book" ? "Book" : "Article"} {item.year && `• ${item.year}`}
                            </p>
                            {item.url && (
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="text-gray-900">
                                  View
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Full Biography */}
            {profile.biography && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {profile.biography}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-red-50 to-indigo-50 border-red-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in {profile.profile_type === "mentor" ? "mentorship with" : "joining"} The Genius Network?
              </h3>
              <p className="text-gray-700 mb-6">
                {profile.profile_type === "mentor"
                  ? "Connect with experienced mentors and transform your ideas into reality."
                  : "Become part of our community of creators, innovators, and thinkers."}
              </p>
              <a href="https://wise.com/pay/business/kentishpublishingcompany" target="_blank" rel="noopener noreferrer">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Apply Now
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
