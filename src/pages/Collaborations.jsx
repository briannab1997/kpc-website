import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, GraduationCap, Users, ArrowRight } from 'lucide-react';

const academicCollaborations = [
  {
    name: "Columbia University Medical School (USA)",
    description: "Hosted a reflective writing and narrative medicine workshop for medical students using The Emotional Healing Behind Words, exploring emotional processing, patient narratives, and creative engagement.",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/94ab017df_2023-logo-blue.jpg",
  },
  {
    name: "UCL Medical Students (UK)",
    description: "Delivered a hands-on poetry and reflective writing session to medical students, focusing on burnout, empathy, and narrative medicine techniques.",
    icon: GraduationCap,
  },
  {
    name: "University of Texas at Arlington (USA)",
    description: "Facilitated a workshop connecting literature and medical humanities, emphasizing storytelling, patient narratives, and the therapeutic potential of creative writing.",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/7f776af0e_University_of_Texas_at_Arlington_sealsvg.png",
  },
  {
    name: "University of Leicester Medical School (UK)",
    description: "Contributed to the planning stages of creative outputs in narrative medicine, guiding program structure, content, and student engagement strategies.",
    icon: GraduationCap,
  },
];

const communityCollaborations = [
  {
    name: "Kentish Books-to-Prison Program",
    description: "Kentish Publishing's Books-to-Prison initiative is designed to provide incarcerated individuals with books published exclusively by Kentish Publishing. Our mission is to support literacy, creativity, and self-expression through reading and writing.",
    icon: Users,
    details: [
      "Books sent directly from our company - no third-party distributors",
      "Facilities can request books by genre or specific titles from our catalog",
      "All books carefully prepared and inspected by our team before shipping",
      "On-site creative writing workshops led by our interns and team members",
      "Focus on storytelling, creative expression, and writing techniques",
      "Guidance on potentially submitting work for inclusion in Kentish anthologies"
    ],
    expandedInfo: {
      bookTypes: [
        "Fiction, nonfiction, and poetry",
        "Anthologies from our catalog",
        "Educational and creative writing guides",
        "Workshop materials designed to encourage self-expression"
      ],
      howToParticipate: [
        "Submit requests via online form or email kentishpublishing@gmail.com",
        "Include inmate's full name, ID number, and facility address",
        "Specify requested titles or preferred genres",
        "Facilities may also request on-site creative writing workshops"
      ],
      safetyMeasures: [
        "All books carefully prepared and inspected by our intern team",
        "Packages verified to meet facility guidelines for content and security",
        "Multiple staff/intern checks ensure compliance and safety"
      ]
    }
  }
];

const logos = [
  { name: "Columbia University", src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/94ab017df_2023-logo-blue.jpg" },
  { name: "University of Texas at Arlington", src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/7f776af0e_University_of_Texas_at_Arlington_sealsvg.png" },
  { name: "TEDx King's College London", src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/6767a2220_326328230_906613350346091_5310054320213876665_n.jpg" }
];

const CollaborationCard = ({ item }) => (
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
        <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-gray-600 mb-4">{item.description}</p>
      {item.details && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Program Features:</h4>
          <ul className="space-y-1">
            {item.details.map((detail, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.expandedInfo && (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Types of Books We Send:</h4>
            <ul className="space-y-1">
              {item.expandedInfo.bookTypes.map((type, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {type}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2 italic">
              Note: We do not accept outside books or donations - all materials are curated by our company.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">How to Participate:</h4>
            <ul className="space-y-1">
              {item.expandedInfo.howToParticipate.map((step, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Safety & Security:</h4>
            <ul className="space-y-1">
              {item.expandedInfo.safetyMeasures.map((measure, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {measure}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Contact & Partnership</h4>
            <p className="text-sm text-gray-700 mb-2">
              For questions or to arrange book shipments or workshops:
            </p>
            <p className="text-sm">
              <strong>Email:</strong>{' '}
              <a href="mailto:kentishpublishing@gmail.com" className="text-red-600 hover:underline">
                kentishpublishing@gmail.com
              </a>
            </p>
            <p className="text-xs text-gray-600 mt-2 italic">
              Our goal is to connect directly with incarcerated readers, providing curated books and meaningful educational experiences while fostering creativity and literacy.
            </p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function Collaborations() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Handshake className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Partnerships & Collaborations</h1>
          <div className="text-xl text-gray-600 leading-relaxed space-y-6">
            <p>
              Kentish Publishing Company actively collaborates with leading academic institutions and community programs to deliver workshops, lectures, and creative initiatives. These collaborations reflect our commitment to promoting reflective writing, narrative engagement, and emotional well-being through literature and the arts.
            </p>
            <p>
              Our partnerships include formal engagements with academic institutions and medical schools, such as Columbia University, UCL, UT Arlington, and the University of Leicester, where we have delivered workshops and guided students in exploring patient narratives, poetry, and creative expression.
            </p>
            <p>
              Through these collaborations, Kentish Publishing Company ensures that our work reaches diverse audiences, fosters interdisciplinary learning, and supports the development of both professional and personal skills in the fields of literature and the creative arts.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Wall */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Esteemed Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {logos.map(logo => (
              <img key={logo.name} src={logo.src} alt={logo.name} className="h-16 lg:h-20 object-contain" />
            ))}
          </div>
        </div>
      </section>

      {/* Academic & Medical Collaborations */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-3 mb-4">
              <GraduationCap className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Academic Collaborations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Engaging with the next generation of professionals to integrate humanities and narrative practice into various fields.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {academicCollaborations.map(item => (
              <CollaborationCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-3 mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Engagement</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bringing the healing power of narrative to incarcerated individuals and underserved communities.
            </p>
          </div>
          <div className="space-y-8">
            {communityCollaborations.map(item => (
              <CollaborationCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you're looking to partner with us for a workshop, lecture, or consultation, or you're an author interested in submitting your work, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/Contact">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                Request a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/Submission">
              <Button size="lg" variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-red-600 border-2 px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                Submit Your Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
