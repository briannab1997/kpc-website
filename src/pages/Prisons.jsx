import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  PenTool,
  Shield,
  ArrowRight,
  Mail,
  CheckCircle,
  Target,
  Heart
} from "lucide-react";

export default function Prisons() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/512e43cd1_411f275f-83c9-437d-8dea-d1cbd8d7417f.png"
            alt="A book behind prison bars"
            className="w-full max-w-lg mx-auto rounded-lg shadow-2xl mb-12"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Kentish Books-to-Prison Program</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kentish Publishing's Books-to-Prison initiative is designed to provide incarcerated individuals with books published exclusively by Kentish Publishing. Our mission is to support literacy, creativity, and self-expression through reading and writing.
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How Our Program Operates</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Kentish Publishing sends books directly from our company to incarcerated individuals - there are no third-party distributors involved.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Facilities can submit requests for our books, either by genre or specific titles from our catalog.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">We aim to maintain a direct, personal connection with the individuals receiving the books and participating in workshops.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-cream-50 p-8 rounded-2xl">
              <Target className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                In addition to providing books, we offer creative writing workshops on-site, giving prisoners hands-on guidance from our interns and team members, fostering personal growth through storytelling and creative expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Types */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BookOpen className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Types of Books Do We Send?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All books are published by Kentish Publishing and carefully curated to inspire and educate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Fiction & Nonfiction</h3>
                <p className="text-sm text-gray-600">Engaging stories and educational content</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <PenTool className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Poetry</h3>
                <p className="text-sm text-gray-600">Expressive poetry collections and anthologies</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Anthologies</h3>
                <p className="text-sm text-gray-600">Collections of diverse voices and experiences</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Creative Writing Guides</h3>
                <p className="text-sm text-gray-600">Educational materials for self-expression</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Badge variant="outline" className="text-gray-600 border-gray-400">
              Note: We do not accept outside books or donations - all materials are curated by our company.
            </Badge>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
              <CardTitle className="text-3xl font-bold text-gray-900 text-center flex items-center justify-center">
                <Shield className="w-8 h-8 mr-3" />
                How We Ensure Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Careful Preparation</h3>
                    <p className="text-gray-700">All books are carefully prepared and inspected by our team of interns before leaving our office.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Facility Compliance</h3>
                    <p className="text-gray-700">Packages are verified to meet facility guidelines for content and security.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multiple Checks</h3>
                    <p className="text-gray-700">Multiple staff/intern checks ensure that all shipments are compliant and safe.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workshops & Programs */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <PenTool className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Workshops & Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our on-site programs are designed to build skills, foster empathy, and provide a platform for creative expression.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <PenTool className="w-5 h-5 text-purple-600" />
                  Creative Writing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Learn storytelling, develop writing techniques, and find your unique voice with guidance from our team.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  Empathic Letter Writing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Enroll in classes to learn the art of empathic letter writing. Completed letters can be submitted for review and potential inclusion in special projects.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Anthology Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Receive guidance on preparing and submitting your work for potential inclusion in a future Kentish anthology.</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Badge variant="outline">Workshops are coordinated directly with facility staff to ensure compliance and safety.</Badge>
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">How Can Your Facility Participate?</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Submit Your Request</h3>
                <p className="text-gray-700">Submit your request via our online request form or by emailing kentishpublishing@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Provide Details</h3>
                <p className="text-gray-700">Include the inmate's full name, ID number, and facility address, along with requested titles or genres.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Optional Workshops</h3>
                <p className="text-gray-700">Facilities may also request on-site creative writing workshops, coordinated directly by our team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl font-bold mb-6">Contact & Partnership</h2>
          <p className="text-xl text-gray-300 mb-8">
            For questions or to arrange book shipments or workshops, contact us today. Our goal is to connect directly with incarcerated readers, providing curated books and meaningful educational experiences while fostering creativity and literacy.
          </p>
          <div className="mb-8">
            <p className="text-lg">
              <strong>Email:</strong>{" "}
              <a href="mailto:kentishpublishing@gmail.com" className="text-red-400 hover:underline">
                kentishpublishing@gmail.com
              </a>
            </p>
          </div>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
