import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  GraduationCap,
  Heart,
  ArrowRight,
  Feather,
  Star
} from "lucide-react";

const imprints = [
  {
    name: "Creative Imprint",
    tagline: "Where Imagination Meets Faith",
    description: "Our Creative Imprint celebrates the power of storytelling through fiction, poetry, and creative non-fiction. We champion diverse voices that weave Christian values into compelling narratives, fostering both artistic excellence and spiritual depth.",
    icon: Palette,
    color: "purple",
    genres: ["Fiction", "Poetry", "Creative Non-Fiction", "Children's Literature", "Young Adult"],
    features: [
      "Professional developmental editing",
      "Creative cover design",
      "Poetry workshop support",
      "Literary award submissions",
      "Reading series opportunities"
    ],
    sampleAuthors: ["Contemporary fiction writers", "Christian poets", "Children's book authors"],
    bgGradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Academic Imprint",
    tagline: "Scholarly Excellence with Purpose",
    description: "Our Academic Imprint publishes rigorous scholarly works that bridge faith and academia. From medical humanities to theological studies, we support researchers and educators who contribute meaningfully to their fields while maintaining Christian integrity.",
    icon: GraduationCap,
    color: "blue",
    genres: ["Medical Humanities", "Theology", "Education", "Philosophy", "Research Monographs"],
    features: [
      "Peer review coordination",
      "Academic citation formatting",
      "Conference presentation support",
      "University library distribution",
      "Research collaboration network"
    ],
    sampleAuthors: ["University professors", "Medical researchers", "Theological scholars"],
    bgGradient: "from-blue-500 to-indigo-500"
  },
  {
    name: "Inspirational Imprint",
    tagline: "Stories That Transform Lives",
    description: "Our Inspirational Imprint focuses on works that uplift, encourage, and transform. From devotionals to memoirs, we publish books that help readers navigate life's challenges with faith, hope, and practical wisdom.",
    icon: Heart,
    color: "red",
    genres: ["Devotionals", "Memoirs", "Christian Living", "Self-Help", "Spiritual Growth"],
    features: [
      "Devotional formatting expertise",
      "Life story development",
      "Inspirational marketing campaigns",
      "Church and ministry distribution",
      "Speaking engagement coordination"
    ],
    sampleAuthors: ["Pastors and ministers", "Life coaches", "Survivors sharing testimonies"],
    bgGradient: "from-red-500 to-orange-500"
  }
];

const colorClasses = {
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    hover: "hover:bg-purple-50"
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    hover: "hover:bg-blue-50"
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    hover: "hover:bg-red-50"
  }
};

export default function Imprints() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Publishing Imprints</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kentish Publishing Company operates three distinct imprints, each designed to serve
            different audiences while maintaining our commitment to inclusive, Christian-rooted excellence.
          </p>
        </div>
      </section>

      {/* Imprints Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {imprints.map((imprint, index) => (
              <Card key={imprint.name} className={`overflow-hidden shadow-2xl ${colorClasses[imprint.color].border}`}>
                <div className={`h-2 bg-gradient-to-r ${imprint.bgGradient}`}></div>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${colorClasses[imprint.color].bg} rounded-full flex items-center justify-center mr-4`}>
                        <imprint.icon className={`w-8 h-8 ${colorClasses[imprint.color].text}`} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{imprint.name}</h2>
                        <p className={`text-lg font-medium ${colorClasses[imprint.color].text}`}>
                          {imprint.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {imprint.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Genres We Publish:</h3>
                      <div className="flex flex-wrap gap-2">
                        {imprint.genres.map((genre) => (
                          <Badge
                            key={genre}
                            variant="secondary"
                            className={`${colorClasses[imprint.color].bg} ${colorClasses[imprint.color].text} border ${colorClasses[imprint.color].border}`}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link to={createPageUrl("Submission")}>
                      <Button className={`bg-gradient-to-r ${imprint.bgGradient} hover:shadow-lg text-white`}>
                        Submit to {imprint.name}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  <div className={`${colorClasses[imprint.color].bg} p-8 lg:p-12`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer:</h3>
                    <ul className="space-y-3 mb-8">
                      {imprint.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Star className={`w-5 h-5 ${colorClasses[imprint.color].text} mt-0.5 mr-3 flex-shrink-0`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Perfect For:</h4>
                      <ul className="space-y-2">
                        {imprint.sampleAuthors.map((author) => (
                          <li key={author} className="flex items-center">
                            <Feather className={`w-4 h-4 ${colorClasses[imprint.color].text} mr-2`} />
                            <span className="text-gray-700 text-sm">{author}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Imprint?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Not sure which imprint is right for your work? Our submission process will help
            you find the perfect fit for your manuscript and publishing goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Submission")}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                Start Your Submission
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Authors")}>
              <Button variant="outline" size="lg" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Meet Our Authors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
