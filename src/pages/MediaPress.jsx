import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Users, FileText, Calendar } from "lucide-react";

export default function MediaPress() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FileText className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Media & Press Inquiries</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Connect with our team for interviews, feature requests, and media coverage opportunities.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
              <CardTitle className="text-3xl font-bold text-gray-900 text-center">Get in Touch with Our Media Team</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  For media and press inquiries, interviews, or feature requests, please contact us at:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                  <Mail className="w-8 h-8 text-red-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:kentishpublishing@gmail.com" className="text-red-600 hover:underline">
                      kentishpublishing@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                  <Phone className="w-8 h-8 text-red-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a href="tel:281-810-1410" className="text-red-600 hover:underline">
                      281-810-1410
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-700 leading-relaxed">
                  Our team is happy to provide information about our authors, books, events, and collaborations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Can Provide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">What We Can Provide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Author Interviews</h3>
                <p className="text-sm text-gray-600">Connect with our published authors for interviews and features</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Press Releases</h3>
                <p className="text-sm text-gray-600">Latest news about book launches and company updates</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Calendar className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Event Coverage</h3>
                <p className="text-sm text-gray-600">Information about workshops, retreats, and book signings</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Mail className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Media Kits</h3>
                <p className="text-sm text-gray-600">Comprehensive materials about our publications and mission</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
