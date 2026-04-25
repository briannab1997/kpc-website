import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  BookOpen,
  Shield,
  Users,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  PenTool,
  Globe
} from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Trauma-Informed Writing",
    description: "Writing workshops designed with trauma-informed principles to ensure a safe, supportive environment for survivors.",
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    icon: Shield,
    title: "Confidential Submissions",
    description: "Survivors may submit their writing anonymously or under a chosen name - identity is always protected.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: BookOpen,
    title: "Free Digital Anthologies",
    description: "Published anthologies are provided free of charge in digital format to all participating survivors and centers.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Globe,
    title: "Optional Print",
    description: "Print copies are available at cost for survivors or centers who wish to have a physical edition.",
    color: "text-green-600",
    bg: "bg-green-50"
  },
  {
    icon: Heart,
    title: "Safe Environment",
    description: "All programs are coordinated with center staff to ensure alignment with their safety protocols and therapeutic approaches.",
    color: "text-pink-600",
    bg: "bg-pink-50"
  },
  {
    icon: Users,
    title: "Advocacy",
    description: "Published works serve as tools for advocacy, raising awareness and amplifying survivor voices in the wider community.",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  }
];

const partners = [
  {
    name: "Interact Rape Crisis Center",
    location: "Wake County, NC",
    description: "Serving survivors of sexual violence in Wake County, North Carolina, with comprehensive support services and community advocacy.",
    website: "https://interactofwake.org"
  },
  {
    name: "Jasmine House",
    location: "Leicester, UK",
    description: "Supporting survivors of sexual violence and abuse in Leicester and the surrounding region with specialist services and community programs.",
    website: null
  }
];

export default function RapeCrisisCenters() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-red-200" />
          <h1 className="text-5xl font-bold mb-6">Rape Crisis Centers</h1>
          <p className="text-xl text-red-100 leading-relaxed max-w-3xl mx-auto">
            Kentish Publishing partners with rape crisis centers to provide trauma-informed creative writing programs
            that empower survivors to find their voice, share their stories, and heal through the power of words.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
              <CardTitle className="text-3xl font-bold text-gray-900 text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                We believe that storytelling is a powerful tool for healing and advocacy. Through our partnership
                with rape crisis centers, we offer carefully designed creative writing programs that honor the courage
                of survivors, protect their privacy, and amplify their voices in ways that create meaningful change
                in communities around the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thoughtfully designed programs that center survivor safety, dignity, and empowerment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${service.bg} rounded-full flex items-center justify-center mb-4`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are honored to work alongside these organizations in their vital mission to support survivors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partners.map((partner) => (
              <Card key={partner.name} className="hover:shadow-xl transition-shadow border-red-100">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                      <Badge variant="outline" className="text-red-600 border-red-300">{partner.location}</Badge>
                    </div>
                    <Heart className="w-8 h-8 text-red-400 flex-shrink-0 ml-4" />
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{partner.description}</p>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Impact of Our Work</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Survivors</h3>
                <p className="text-gray-600">
                  Creative writing provides a safe outlet for processing trauma, reclaiming personal narrative,
                  and building confidence through the written word.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Communities</h3>
                <p className="text-gray-600">
                  Published anthologies foster empathy, break silence, and help communities better understand
                  and support survivors of sexual violence.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Advocacy</h3>
                <p className="text-gray-600">
                  Survivor stories serve as powerful advocacy tools, raising awareness and driving policy
                  change at local, national, and international levels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl font-bold mb-6">Partner With Us</h2>
          <p className="text-xl text-gray-300 mb-8">
            If your rape crisis center or survivor support organization would like to explore a partnership
            with Kentish Publishing, we would be honored to hear from you. Together, we can create something
            meaningful for the communities you serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("CommunityPartnerships")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold">
                All Community Partnerships
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
