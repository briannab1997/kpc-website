import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  BookOpen,
  Feather,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Handshake,
  Globe
} from "lucide-react";

export default function History() {
  const timeline = [
    {
      year: "The Beginning",
      title: "A Foundation in Houston, Texas",
      description: "The seeds of Kentish Publishing were sown in Houston, Texas, where founder Esther Ruth Kentish first discovered her passion for reading and writing.",
      location: "Houston, Texas",
      icon: Feather
    },
    {
      year: "2016",
      title: "First Book & Academic Roots",
      description: "Esther wrote her first book and established the company in Arlington, Texas, where she shared and presented her work with The University of Texas at Arlington.",
      location: "Arlington, Texas",
      icon: GraduationCap
    },
    {
      year: "2017",
      title: "Formal Establishment",
      description: "We were formally established as a publishing company in Raleigh, North Carolina, expanding our services beyond basic editing to support a wider range of authors.",
      location: "Raleigh, North Carolina",
      icon: BookOpen
    },
    {
      year: "2017-2020",
      title: "Building Connections & Diverse Clientele",
      description: "Esther helped a diverse range of private clients develop their work, including professionals in the FBI, United States Secret Service, expats in China, Pastors, and Firefighters.",
      location: "Global",
      icon: Briefcase
    },
    {
      year: "2020-2024",
      title: "Resilience Through COVID-19",
      description: "KPC continued to develop through the pandemic, collecting narratives of patients and doctors and began accepting new clients shortly after, focusing on the power of stories in times of crisis.",
      location: "Global",
      icon: Stethoscope
    },
    {
      year: "2025",
      title: "A Landmark Partnership",
      description: "The National Health Service (NHS) became one of Kentish Publishing Company's esteemed clients, marking a significant milestone in our work within the medical humanities.",
      location: "United Kingdom",
      icon: Handshake
    },
    {
      year: "Present",
      title: "A Truly Global Reach",
      description: "Kentish Publishing Company has proudly accepted and supported clients from every inhabitable continent on Earth, fulfilling our mission to give a voice to stories from around the world.",
      location: "Worldwide",
      icon: Globe
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From a passion for words in Texas to a global publishing house, discover the journey that shaped Kentish Publishing Company.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
              <CardTitle className="text-3xl font-bold text-gray-900 text-center">Company History</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
                Kentish Publishing Company began with a love for reading and writing in Houston, Texas. In 2016, our founder wrote her first book and established the company in Arlington, Texas. Formally established in 2017 in Raleigh, North Carolina, we have since grown from helping individuals edit basic essays to becoming a full-fledged international press dedicated to supporting writers and creators in developing their ideas into fully realized works.
              </p>

              <div className="space-y-8">
                {timeline.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex flex-col items-center mr-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <milestone.icon className="w-8 h-8 text-white" />
                      </div>
                      {index !== timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-red-200"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge className="bg-red-600 text-white mr-3 text-lg px-3 py-1 whitespace-nowrap">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{milestone.location}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Continuity */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <Globe className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">A Consistent Mission with Global Impact</h2>
              <p className="text-xl text-red-100 leading-relaxed">
                Throughout our evolution from a local passion project to a global press, our mission has remained constant: to support writers and creators from every corner of the world in developing their ideas into fully realized works.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
