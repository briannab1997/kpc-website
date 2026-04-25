import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookHeart,
  School,
  Building,
  Home,
  ShieldCheck,
  Hospital,
  Stethoscope,
  Globe,
  HandHeart,
  Shield,
  Brain,
  Church,
  Accessibility,
  Leaf,
  ArrowRight,
  Gift
} from "lucide-react";

const partnershipAreas = [
  {
    icon: School,
    title: "Schools & Educational Institutions",
    description: "Free e-book anthologies of student work to encourage literacy, confidence, and creativity. Affordable print copies available.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Building,
    title: "Prisons & Correctional Facilities",
    description: "Writing workshops and free digital anthologies for incarcerated individuals, plus book donations to prison libraries.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Home,
    title: "Nursing Homes & Elder Care Centers",
    description: "Collect and publish residents' memoirs and reflections to preserve life stories for families and communities.",
    image: "https://images.unsplash.com/photo-1618897539343-41a693514a40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: ShieldCheck,
    title: "Rape Crisis Centers & Survivors' Networks",
    description: "Trauma-informed writing workshops and confidential or anonymous anthologies to publish stories of resilience and hope.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Hospital,
    title: "Hospitals & Patients",
    description: "Workshops and anthologies exploring illness, recovery, and caregiving, with free digital editions for communities.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Stethoscope,
    title: "NHS Doctors & Medical Professionals",
    description: "Reflective writing workshops and anthologies for healthcare staff, with books placed in staff rooms and libraries.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Globe,
    title: "Refugee & Migrant Support Organizations",
    description: "Amplify underrepresented voices from displaced and migrant communities to aid advocacy and cross-cultural understanding.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: HandHeart,
    title: "Youth at Risk Programs",
    description: "Support for teens in foster care or youth justice systems, publishing anthologies to help them process identity and belonging.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Shield,
    title: "Veterans & Armed Forces",
    description: "Workshops and anthologies for veterans and military families, focusing on resilience, transition, and storytelling.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Brain,
    title: "Mental Health Support Groups",
    description: "Anthologies of experiences with mental illness, using writing as a form of healing, advocacy, and destigmatization.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Church,
    title: "Faith Communities",
    description: "Church groups and interfaith collaborations can create anthologies of devotionals, sermons, prayers, or collective reflections.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Accessibility,
    title: "Disability & Chronic Illness Networks",
    description: "Anthologies from people living with disabilities and chronic health conditions to promote advocacy, awareness, and representation.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Leaf,
    title: "Environmental & Climate Justice Groups",
    description: "Anthologies centered on nature and climate change to amplify activists and promote ecological awareness.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Users,
    title: "Other Community Organizations",
    description: "We partner with libraries, local nonprofits, and cultural centers who see writing as a way to empower their communities.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
];

const howItWorksSteps = [
  { name: "Workshops (Optional)", description: "We lead writing workshops or support facilitators." },
  { name: "Collection of Work", description: "Submissions are gathered by the organization." },
  { name: "Digital Anthology", description: "Kentish Publishing publishes a free e-book anthology." },
  { name: "Optional Print Editions", description: "Available via separate contract." },
  { name: "Distribution", description: "E-books distributed freely; print copies can be sold, with royalties to the organization or designated fund." }
];

export default function CommunityPartnerships() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookHeart className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Kentish Publishing Company - Community Partnerships Program</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            At Kentish Publishing Company, we believe books are more than products - they are pathways to healing, empowerment, and legacy. Beyond publishing individual authors, we work with organizations and communities to give voices to those often left unheard.
          </p>
        </div>
      </section>

      {/* Core Offer Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <Gift className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-4">Our Core Offer</h2>
              <p className="text-xl text-red-100 leading-relaxed">
                We offer <strong>free digital anthologies</strong> (e-book format) for partner groups, along with optional print editions available under separate contracts. In many cases, we also conduct creative writing workshops to support participants in expressing their stories.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partnership Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Partner With</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with a wide range of organizations to bring their communities' stories to life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipAreas.map((area) => {
              const isPrisonsCard = area.title === "Prisons & Correctional Facilities";
              const isRapeCrisisCard = area.title === "Rape Crisis Centers & Survivors' Networks";
              const isSpecialCard = isPrisonsCard || isRapeCrisisCard;

              const cardContent = (
                <Card className={`hover:shadow-lg transition-shadow duration-300 border-red-100 flex flex-col overflow-hidden h-full ${isSpecialCard ? 'cursor-pointer hover:border-red-300' : ''}`}>
                  <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <area.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className={`text-lg font-bold ${isSpecialCard ? 'text-red-600' : ''}`}>
                      {area.title}
                      {isSpecialCard && <ArrowRight className="w-4 h-4 inline-block ml-2" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm">{area.description}</p>
                    {isSpecialCard && (
                      <div className="mt-4">
                        <Badge className="bg-red-100 text-red-700">Click to Learn More</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );

              if (isSpecialCard) {
                const to = isPrisonsCard ? createPageUrl("Prisons") : createPageUrl("RapeCrisisCenters");
                return (
                  <Link key={area.title} to={to} className="block h-full">
                    {cardContent}
                  </Link>
                );
              }

              return <div key={area.title}>{cardContent}</div>;
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.name} className="text-center">
                <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.name}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Card className="max-w-4xl mx-auto bg-white shadow-xl border-red-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <Gift className="w-6 h-6 mr-3 text-red-600" />
                  In Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Kentish Publishing Company provides free digital anthologies to communities, schools, and organizations, with the option to expand into print editions, marketing, and legacy projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Partner With Us</h2>
          <p className="text-xl text-gray-300 mb-8">
            If your organization is interested in creating a legacy through storytelling, we would love to explore a partnership.
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Contact Us to Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
