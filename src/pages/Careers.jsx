import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle,
  Mail,
  AlertTriangle,
  MapPin,
  Calendar,
  UserCheck
} from "lucide-react";

const recentHiresByType = {
  "Internship Positions": [
    {
      title: "Social Media Marketing Intern",
      type: "Internship",
      location: "United States (Remote)",
      closedDate: "4/23/2025",
      applicants: 51
    },
    {
      title: "Non-Paid Game Developer Intern",
      type: "Internship",
      location: "United States (Remote)",
      closedDate: "9/17/2025",
      applicants: 371
    },
    {
      title: "NON-PAID Instructional Design Intern",
      type: "Internship",
      location: "United States (Remote)",
      closedDate: "4/27/2025",
      applicants: 51
    },
    {
      title: "Talent Scouting & Evaluation - Internship Role",
      type: "Internship",
      location: "United States (Remote)",
      closedDate: "4/24/2025",
      applicants: 30
    },
    {
      title: "PAID Game Designer Intern",
      type: "Internship",
      location: "United States (Remote)",
      closedDate: "4/24/2025",
      applicants: 53
    },
    {
      title: "Publisher",
      type: "Internship",
      location: "United States (Remote)",
      closedDate: "4/23/2025",
      applicants: "N/A"
    }
  ],
  "Contract Positions": [
    {
      title: "Sales Recruiter",
      type: "Contract",
      location: "United States (Remote)",
      closedDate: "4/21/2025",
      applicants: 51
    },
    {
      title: "Get Published For FREE",
      type: "Contract",
      location: "Texas, United States (Remote)",
      closedDate: "8/3/2025",
      applicants: 21
    }
  ],
  "Author Opportunities": [
    {
      title: "Call for Authors - Ready to Publish Your Book?",
      type: "Other",
      location: "Texas, United States (Remote)",
      closedDate: "9/17/2025",
      applicants: 27
    }
  ]
};

export default function Careers() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Briefcase className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Careers at Kentish Publishing</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join our mission to democratize publishing and empower diverse voices through Christian-rooted excellence.
          </p>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
                Current Hiring Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                At this time, Kentish Publishing Company is not actively hiring for any positions.
                However, we are always interested in connecting with talented individuals who share our vision
                and values. When new opportunities become available, they will be posted on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Hiring Activity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-4">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Hiring Activity</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While we're not currently hiring, here's a look at our recent recruitment activity, demonstrating our commitment to growing our team with diverse talent.
            </p>
          </div>

          {Object.entries(recentHiresByType).map(([category, positions]) => (
            <div key={category} className="mb-12 last:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                {category}
              </h3>
              <div className="grid gap-4">
                {positions.map((hire, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-green-100">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{hire.title}</h4>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              {hire.type}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {hire.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              Closed {hire.closedDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col lg:items-end gap-2">
                          <div className="flex items-center text-sm font-medium text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Position Filled
                          </div>
                          <div className="text-sm text-gray-500">
                            {hire.applicants !== "N/A" ? `${hire.applicants} applicants` : "Multiple applicants"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Look For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When we do hire, we seek individuals who embody our core values and contribute to our mission.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Christian Values</h3>
                <p className="text-gray-600 text-sm">Commitment to faith-based principles and integrity in all work.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborative Spirit</h3>
                <p className="text-gray-600 text-sm">Ability to work as part of a supportive, author-focused team.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Mindset</h3>
                <p className="text-gray-600 text-sm">Passion for continuous learning and professional development.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-red-100 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600 text-sm">Dedication to quality and professional standards in publishing.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Opportunities */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardTitle className="text-3xl font-bold text-center">Future Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                As Kentish Publishing Company continues to grow, we anticipate opportunities in various areas including:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Editorial & Content</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Developmental Editors</li>
                    <li>• Copy Editors</li>
                    <li>• Proofreaders</li>
                    <li>• Content Reviewers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Design & Production</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Book Cover Designers</li>
                    <li>• Interior Layout Specialists</li>
                    <li>• Marketing Materials Designer</li>
                    <li>• Digital Content Creator</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Business & Operations</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Marketing Coordinator</li>
                    <li>• Author Relations Manager</li>
                    <li>• Distribution Coordinator</li>
                    <li>• Administrative Assistant</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Specialized Roles</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Literary Consultants</li>
                    <li>• Event Coordinators</li>
                    <li>• Research Assistants</li>
                    <li>• Internship Supervisors</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                All positions, when available, will be posted here with detailed job descriptions,
                requirements, and application instructions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl text-gray-300 mb-8">
            Interested in future opportunities? We encourage you to reach out and introduce yourself.
            While we may not have immediate openings, we're always happy to connect with potential future team members.
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
