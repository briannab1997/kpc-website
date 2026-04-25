import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Heart,
  Users,
  BookOpen,
  ArrowRight,
  Hospital,
  PenTool,
  Target
} from "lucide-react";

const healthcareCollaborations = [
  {
    name: "London Arts & Health (UK)",
    description: "Partnered to provide creative workshops for healthcare professionals, exploring poetry, reflective practice, and emotional resilience in clinical environments.",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/b0558e64b_unnamed.jpg",
    type: "Arts & Health Organization"
  },
  {
    name: "Holly Hill Hospital (USA)",
    description: "Delivered informal reflective writing and creative support sessions to patients, focusing on emotional processing, narrative expression, and personal growth through poetry.",
    icon: Hospital,
    type: "Hospital Partnership"
  },
  {
    name: "NHS Healthcare Professionals (UK)",
    description: "Facilitated creative writing workshops with doctors and healthcare professionals, focusing on reflective practice, emotional resilience, and narrative medicine techniques within the UK healthcare system.",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/fca1cb659_National_Health_Service_England_logosvg.png",
    type: "National Health Service"
  }
];

const HealthcareCollaborationCard = ({ item }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300 border-red-100 flex flex-col">
    <CardHeader className="flex-shrink-0">
      <div className="flex items-center space-x-4">
        {item.logo ? (
          <img src={item.logo} alt={`${item.name} logo`} className="h-12 w-auto object-contain flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <item.icon className="w-6 h-6 text-red-600" />
          </div>
        )}
        <div>
          <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
          <Badge variant="outline" className="text-xs mt-1">{item.type}</Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-gray-600">{item.description}</p>
    </CardContent>
  </Card>
);

export default function HospitalsAndHealthcare() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stethoscope className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Hospitals & Healthcare Collaborations</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kentish Publishing Company partners with healthcare institutions, medical professionals, and arts & health organizations to bring the healing power of narrative medicine and creative expression to clinical environments.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <Heart className="w-16 h-16 mx-auto text-red-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Narrative Medicine & Healthcare</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  Our healthcare collaborations focus on integrating creative writing, reflective practice, and narrative medicine into medical education and professional development. We believe that storytelling and creative expression can enhance empathy, reduce burnout, and improve patient care by helping healthcare professionals process their experiences and connect more deeply with their patients.
                </p>
                <p>
                  Through workshops, training sessions, and ongoing partnerships, we support healthcare workers in developing skills in narrative medicine, reflective writing, and emotional resilience - essential tools for both personal wellbeing and professional excellence in medical practice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Healthcare Collaborations */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-blue-100 rounded-full p-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Healthcare Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Working with leading healthcare organizations to integrate narrative medicine and creative practices into medical education and professional development.
            </p>
          </div>
          <div className="space-y-8">
            {healthcareCollaborations.map(item => (
              <HealthcareCollaborationCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer Healthcare Organizations</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-red-100">
              <CardContent className="p-8">
                <PenTool className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reflective Writing Workshops</h3>
                <p className="text-gray-600">Guided sessions helping healthcare professionals process experiences and develop emotional resilience through writing.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-red-100">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Narrative Medicine Training</h3>
                <p className="text-gray-600">Professional development programs focusing on patient narratives and empathy-building through storytelling.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-red-100">
              <CardContent className="p-8">
                <Target className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Support Programs</h3>
                <p className="text-gray-600">Creative writing sessions for patients to support emotional processing and personal growth during treatment.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Partner With Us in Healthcare</h2>
          <p className="text-xl text-gray-300 mb-8">
            Interested in bringing narrative medicine and creative writing programs to your healthcare organization? We'd love to discuss how we can support your team and patients.
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Contact Us for Partnership
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
