import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  Heart,
  ArrowRight,
  Globe
} from "lucide-react";

const bookSigningImages = [
  {
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/4103820ee_KCurryBookSigning-34.jpg",
    alt: "Book signing table setup with Turbulence books and decorative elements",
    caption: "Professional book display setup"
  },
  {
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/52ca4cbb8_KCurryBookSigning-181.jpg",
    alt: "Author interaction with reader during book signing",
    caption: "Personal connection with readers"
  },
  {
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/6153d5ccf_KCurryBookSigning-191.jpg",
    alt: "Author reading from book during signing event",
    caption: "Engaging reading sessions"
  }
];

const services = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "We organize book signings wherever our authors are located, anywhere in the world. Distance is never a barrier to celebrating your work."
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Connect directly with your readers, build meaningful relationships, and create lasting memories around your literary work."
  },
  {
    icon: Calendar,
    title: "Professional Coordination",
    description: "From venue selection to event logistics, we handle all the details so you can focus on what matters most - your readers."
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Every book signing is tailored to reflect your unique voice and story, creating an authentic experience for you and your audience."
  }
];

export default function BookSignings() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-4 mb-6">
            <BookOpen className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Professional Book Signings</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Celebrate your literary achievement with professionally organized book signing events.
            We bring authors and readers together in meaningful, memorable experiences that honor your work and build lasting connections.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {bookSigningImages.map((image, index) => (
              <Card key={index} className="overflow-hidden shadow-lg border-red-100 group">
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 text-center">{image.caption}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100 text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">Our Global Approach</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  At Kentish Publishing Company, we believe that every author deserves the opportunity to celebrate their work
                  with their community, regardless of geographical boundaries. Our book signing services are designed to bring
                  the celebration directly to you, wherever you call home.
                </p>
                <p>
                  We organize professional book signing events in any country where our authors are located. Whether you're in
                  a bustling metropolitan city or a quiet rural town, we work with local venues, community centers, bookstores,
                  and cultural institutions to create the perfect setting for your book launch.
                </p>
                <p>
                  Our comprehensive approach includes venue coordination, marketing support, event logistics, and professional
                  setup to ensure your book signing is both memorable and successful. We understand that connecting with readers
                  in person is one of the most rewarding aspects of being a published author, and we're committed to making that
                  connection possible, no matter where you are in the world.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Provide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete book signing coordination from planning to execution, tailored to your location and audience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-red-100 group text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Your Event */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Book Signing?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Whether you're planning your first book signing or your tenth, we're here to make it special.
              Contact us to discuss how we can bring your book celebration to life, wherever you are in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                  Plan Your Event
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("Events")}>
                <Button variant="outline" size="lg" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                  View All Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
