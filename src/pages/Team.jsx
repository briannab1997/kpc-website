import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Gamepad2,
  Palette,
  ArrowRight,
  Star,
  User,
  Target,
  BookOpen
} from "lucide-react";

const teamRoles = [
  {
    icon: Gamepad2,
    title: "Game Designers",
    description: "Creative developers who bring interactive storytelling expertise to our publications and digital projects.",
    skills: ["Interactive Narrative", "User Experience", "Creative Development"],
    color: "purple"
  },
  {
    icon: Palette,
    title: "Creative Developers",
    description: "Multi-talented individuals who contribute to design, content creation, and innovative publishing solutions.",
    skills: ["Visual Design", "Content Creation", "Digital Innovation"],
    color: "blue"
  }
];

const betaReaders = [
  {
    name: "Talia Nichols",
    photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/95524c3e5_1744696286850.jpg",
    biography: "Talia Nichols is an emerging writer, editor, and creative professional with a strong foundation in storytelling, language, and audience engagement. She earned her Bachelor of Arts in English with a Creative Writing concentration and a Minor in Marketing from Georgia College & State University (GCSU) in 2025. Throughout her academic career, she consistently demonstrated academic excellence, earning both Dean's List and President's List honors.\n\nA dedicated and versatile creative, Talia has developed a wide range of skills across writing, freelancing, and beta reading. She is particularly passionate about helping writers refine their work and elevate their narratives, which led her to join the Kentish Publishing Company as a Beta Reader and Freelance Editor in the 2025-2026 publishing cycle. Her editorial insights are grounded in a deep understanding of narrative structure, character development, and reader engagement.\n\nBefore entering the publishing world, Talia gained valuable leadership and interpersonal experience as a Community Advisor at GCSU. In this role, she cultivated a welcoming environment for students, planned community-building events, and served as a reliable source of support for residents navigating university life. Earlier, she worked at Papa Johns, where she strengthened her customer service, teamwork, and training skills.\n\nTalia is the author of Dying to Meet You and remains committed to expanding her body of work while supporting other writers through thoughtful, constructive literary collaboration. With a unique blend of creative talent and marketing awareness, she is excited to see where her passion for storytelling will lead as she continues growing as a writer and editor."
  }
];

const colorClasses = {
  purple: { bg: "bg-purple-100", text: "text-purple-600", gradient: "from-purple-600 to-purple-700" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", gradient: "from-blue-600 to-blue-700" },
  green: { bg: "bg-green-100", text: "text-green-600", gradient: "from-green-600 to-green-700" }
};

export default function Team() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet the Team</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover the dedicated professionals and talented interns who bring creativity,
            innovation, and expertise to Kentish Publishing Company.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
              <CardTitle className="text-3xl font-bold text-gray-900 text-center">Our Community-Based Approach</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our team is made up primarily of dedicated interns, including game designers and creative developers,
                who gain real-world work experience while contributing to our projects. This community-based approach
                allows us to stay flexible, innovative, and closely connected with the writers and creators we support.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <Target className="w-12 h-12 mx-auto text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexibility</h3>
                  <p className="text-gray-600 text-sm">Our intern-focused structure keeps us agile and responsive to new ideas</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <Star className="w-12 h-12 mx-auto text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600 text-sm">Fresh perspectives from emerging professionals drive our creative solutions</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <Users className="w-12 h-12 mx-auto text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Connection</h3>
                  <p className="text-gray-600 text-sm">Close relationships with writers and creators inform everything we do</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Intern Specialties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our interns bring diverse expertise from various fields, enriching our publishing capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {teamRoles.map((role) => (
              <Card key={role.title} className="hover:shadow-xl transition-shadow duration-300 border-red-100 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${colorClasses[role.color].gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${colorClasses[role.color].bg} rounded-full flex items-center justify-center mr-4`}>
                      <role.icon className={`w-8 h-8 ${colorClasses[role.color].text}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{role.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <Badge key={skill} className={`${colorClasses[role.color].bg} ${colorClasses[role.color].text} border border-gray-200`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Beta Readers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our beta readers provide invaluable feedback and editorial insights to help authors refine their manuscripts.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {betaReaders.map((reader) => (
              <Card key={reader.name} className="hover:shadow-xl transition-shadow duration-300 border-red-100 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${colorClasses.green.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {reader.photo && (
                      <img
                        src={reader.photo}
                        alt={reader.name}
                        className="w-48 h-48 object-cover rounded-lg shadow-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 ${colorClasses.green.bg} rounded-full flex items-center justify-center mr-4`}>
                          <BookOpen className={`w-8 h-8 ${colorClasses.green.text}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{reader.name}</h3>
                      </div>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {reader.biography}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <User className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">Leadership</h2>
              <p className="text-xl text-red-100 leading-relaxed mb-6">
                Our team is guided by our Founder and CEO, Esther Ruth Kentish, whose interdisciplinary expertise
                and passion for empowering writers shapes our company culture and mission.
              </p>
              <Link to={createPageUrl("Founder")}>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
                  Meet Our Founder
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in Joining Our Team?</h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for passionate individuals who share our vision for inclusive,
            innovative publishing. Check out our current opportunities and internship programs.
          </p>
          <Link to={createPageUrl("Careers")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Explore Opportunities
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
