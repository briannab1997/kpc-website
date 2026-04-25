import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Lightbulb,
  Target,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  User,
  Eye
} from "lucide-react";

const pitchDeckItems = [
  {
    icon: Lightbulb,
    title: "Problem",
    description: "Traditional publishing is inaccessible, especially for marginalized voices and new authors.",
    color: "red"
  },
  {
    icon: Target,
    title: "Solution",
    description: "A Christian-rooted, inclusive publishing house that empowers creatives through editorial support, self-publishing consulting, and imprint diversity.",
    color: "green"
  },
  {
    icon: Package,
    title: "Product",
    description: "Print and digital publishing, academic and creative imprints, self-publishing packages, and writing consultations.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Market",
    description: "Independent authors, academics, poets, faith-based creatives, and underserved writers.",
    color: "purple"
  },
  {
    icon: DollarSign,
    title: "Business Model",
    description: "Service fees, royalties, book sales, and consulting packages.",
    color: "yellow"
  },
  {
    icon: TrendingUp,
    title: "Traction",
    description: "Websites launched, imprints named (Creative, Academic, Inspirational), partnerships forming.",
    color: "teal"
  },
  {
    icon: User,
    title: "Team",
    description: "Esther Ruth Kentish (solo founder).",
    color: "indigo"
  },
  {
    icon: Eye,
    title: "Vision",
    description: "Democratize publishing while maintaining spiritual and educational rigor.",
    color: "pink"
  }
];

const colorClasses = {
  red: { bg: "bg-red-100", text: "text-red-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" }
};

export default function Partnerships() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Vision & Partnerships</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join us in our mission to democratize publishing and empower diverse voices.
            We are seeking passionate partners to help shape the future of inclusive, Christian-rooted literature.
          </p>
        </div>
      </section>

      {/* Startup Brief Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Startup Brief</h2>
              <blockquote className="text-xl leading-relaxed">
                Kentish Publishing Company is an umbrella publishing house with creative, academic, and inspirational imprints.
                It specializes in culturally responsive, spiritually rooted literature, offering self-publishing support,
                distribution, and consulting for emerging authors.
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pitch Deck Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Pitch Deck</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A summary of our vision, strategy, and mission to transform the publishing landscape.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pitchDeckItems.map((item) => (
              <Card key={item.title} className="hover:shadow-xl transition-shadow duration-300 border-red-100 group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${colorClasses[item.color].bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-8 h-8 ${colorClasses[item.color].text}`} />
                  </div>
                  <h3 className={`text-xl font-semibold text-center mb-3 ${colorClasses[item.color].text}`}>{item.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open to Investors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Open to Investors</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Kentish Publishing Company is actively seeking strategic investors who share our vision of democratizing publishing while maintaining Christian values and supporting diverse voices. We invite investment partners who believe in the transformative power of literature and want to help us expand our global reach and impact.
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
                  Explore Investment Opportunities
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Shape the Future of Publishing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            If our vision resonates with you, we invite you to connect with us.
            Let's build a more inclusive and inspiring literary world together.
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
