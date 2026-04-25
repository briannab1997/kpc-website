import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Lightbulb,
  Filter,
  ArrowRight,
  FileCheck,
  CreditCard,
  HandHeart,
  Calendar,
  Target,
  BookOpen,
  Clock,
  Edit3,
  CheckCircle,
  Palette,
  Camera,
  Sparkles,
  Settings,
  FileImage,
  Globe,
  ThumbsUp,
  Printer,
  MessageSquare,
  Truck,
  MapPin,
  Rocket,
  Star,
  BarChart3,
  Archive,
  Mic,
  Workflow,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const businessLifecycle = [
  {
    phase: "Lead Generation & Intake",
    color: "blue",
    icon: FileText,
    description: "We begin by understanding your vision and manuscript through our comprehensive intake process.",
    steps: [
      { name: "Pre-questionnaire", icon: FileText, description: "Complete our detailed questionnaire about your manuscript and goals" },
      { name: "Interview", icon: MessageSquare, description: "One-on-one discussion with our team about your project" },
      { name: "Initial Consultation", icon: Lightbulb, description: "Professional assessment and recommendation session" },
      { name: "Application/Referral Filtering", icon: Filter, description: "Review and qualification of your submission" }
    ]
  },
  {
    phase: "Contract & Onboarding",
    color: "green",
    icon: FileCheck,
    description: "Once approved, we formalize our partnership and begin the onboarding process.",
    steps: [
      { name: "Contract Issued & Signed", icon: FileCheck, description: "Legal agreement outlining terms and expectations" },
      { name: "Payment Verification", icon: CreditCard, description: "Secure payment processing and verification" },
      { name: "Welcome Packet / Orientation", icon: HandHeart, description: "Comprehensive guide to our process and team introductions" },
      { name: "Scheduling of First Session", icon: Calendar, description: "Book your first working session with our editorial team" }
    ]
  },
  {
    phase: "Planning & Strategy",
    color: "purple",
    icon: Target,
    subtitle: "(Development Phase)",
    description: "We work with you to create a comprehensive plan for your book's development and market positioning.",
    steps: [
      { name: "Visioning Session / Manuscript Blueprint", icon: Target, description: "Define your book's core message and structure" },
      { name: "Genre Positioning & Goals", icon: BookOpen, description: "Strategic positioning within your target market" },
      { name: "Timeline Development", icon: Clock, description: "Create realistic milestones and deadlines" },
      { name: "Package Confirmation", icon: CheckCircle, description: "Finalize services and deliverables" }
    ]
  },
  {
    phase: "Manuscript Development & Editing",
    color: "orange",
    icon: Edit3,
    description: "Our professional editors work closely with you to refine and perfect your manuscript.",
    steps: [
      { name: "Developmental Editing", icon: Edit3, description: "Big-picture structural improvements and content development" },
      { name: "Line & Copyediting", icon: FileText, description: "Sentence-level editing for clarity and flow" },
      { name: "Structural Edits or Rewrites", icon: BookOpen, description: "Major revisions and restructuring as needed" },
      { name: "Author Approval & Revisions", icon: CheckCircle, description: "Your review and approval of all changes" }
    ]
  },
  {
    phase: "Visual & Graphic Design",
    color: "pink",
    icon: Palette,
    description: "Professional design team creates stunning visuals that bring your book to life.",
    steps: [
      { name: "Internal Formatting (interior layout)", icon: FileImage, description: "Professional typesetting and page layout" },
      { name: "Cover Design & Branding", icon: Palette, description: "Eye-catching cover that reflects your book's essence" },
      { name: "Author Photo & Visual Asset Collection", icon: Camera, description: "Professional photography and asset gathering" },
      { name: "Image Licensing or Custom Illustration", icon: Sparkles, description: "Legal image sourcing or custom artwork creation" }
    ]
  },
  {
    phase: "Pre-Publication Setup",
    color: "indigo",
    icon: Settings,
    description: "Technical preparation for publication across multiple platforms and formats.",
    steps: [
      { name: "ISBN Assignment & Metadata Entry", icon: Settings, description: "Official registration and cataloging information" },
      { name: "Final Manuscript Formatting (PDF, EPUB, etc.)", icon: FileImage, description: "Multi-format file preparation" },
      { name: "Platform Setup (Amazon, IngramSpark, etc.)", icon: Globe, description: "Distribution channel configuration" },
      { name: "Final Author Approval", icon: ThumbsUp, description: "Your final sign-off on all materials" }
    ]
  },
  {
    phase: "Printing & Proof Review",
    color: "cyan",
    icon: Printer,
    description: "Quality control through professional printing and comprehensive review process.",
    steps: [
      { name: "Proof Copy Ordered & Reviewed", icon: Printer, description: "Physical proof copies for quality inspection" },
      { name: "Author Feedback Incorporated", icon: MessageSquare, description: "Implementation of your final feedback" },
      { name: "Final Print Files Approved", icon: CheckCircle, description: "Approval of print-ready files" },
      { name: "Print Run Initiated", icon: Settings, description: "Full-scale printing begins" }
    ]
  },
  {
    phase: "Shipping & Fulfillment",
    color: "emerald",
    icon: Truck,
    description: "Reliable delivery and distribution to you and your target markets.",
    steps: [
      { name: "Author Copy Shipment", icon: Truck, description: "Your personal copies shipped directly to you" },
      { name: "Bookstore or Vendor Fulfillment", icon: Globe, description: "Distribution to retail partners" },
      { name: "Address Verification & Delivery", icon: MapPin, description: "Secure delivery confirmation" }
    ]
  },
  {
    phase: "Launch Support & Client Survey",
    color: "red",
    icon: Rocket,
    description: "Marketing support and feedback collection to ensure your book's successful launch.",
    steps: [
      { name: "Marketing Assets Delivered", icon: BarChart3, description: "Professional marketing materials and campaigns" },
      { name: "Launch Day Coordination", icon: Rocket, description: "Strategic launch support and promotion" },
      { name: "Client Feedback Survey", icon: MessageSquare, description: "Your experience feedback collection" },
      { name: "Optional Testimonial or Review Campaign", icon: Star, description: "Help building initial reviews and testimonials" }
    ]
  },
  {
    phase: "Contract Close-Out & Archive",
    color: "gray",
    icon: Archive,
    description: "Proper project completion with secure file archiving and rights documentation.",
    steps: [
      { name: "Close-Out Form Completed", icon: FileCheck, description: "Final project documentation and sign-off" },
      { name: "Digital Files Archived", icon: Archive, description: "Secure storage of all project assets" },
      { name: "Rights Clarification", icon: FileText, description: "Clear documentation of ownership and usage rights" },
      { name: "Final Invoice (if outstanding)", icon: CreditCard, description: "Settlement of any remaining payments" },
      { name: "Future Referrals or Partnership Invite", icon: HandHeart, description: "Opportunities for ongoing collaboration" }
    ]
  },
  {
    phase: "Book Signing or Speaking Events",
    color: "amber",
    icon: Mic,
    subtitle: "(Optional)",
    description: "Optional promotional events and speaking opportunities to promote your published work.",
    steps: [
      { name: "Event Coordination (if in package)", icon: Calendar, description: "Professional event planning and management" },
      { name: "Shipping of Inventory", icon: Truck, description: "Book delivery for signing events" },
      { name: "Author Media Coaching or Prep", icon: Mic, description: "Professional coaching for media appearances" }
    ]
  }
];

const colorClasses = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", accent: "bg-blue-600", hover: "hover:bg-blue-100" },
  green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", accent: "bg-green-600", hover: "hover:bg-green-100" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", accent: "bg-purple-600", hover: "hover:bg-purple-100" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", accent: "bg-orange-600", hover: "hover:bg-orange-100" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", accent: "bg-pink-600", hover: "hover:bg-pink-100" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", accent: "bg-indigo-600", hover: "hover:bg-indigo-100" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", accent: "bg-cyan-600", hover: "hover:bg-cyan-100" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", accent: "bg-emerald-600", hover: "hover:bg-emerald-100" },
  red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", accent: "bg-red-600", hover: "hover:bg-red-100" },
  gray: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", accent: "bg-gray-600", hover: "hover:bg-gray-100" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", accent: "bg-amber-600", hover: "hover:bg-amber-100" }
};

export default function OurProcess() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState({});

  const toggleStep = (phaseIndex, stepIndex) => {
    const key = phaseIndex + "-" + stepIndex;
    setExpandedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const phase = businessLifecycle[activePhase];
  const colors = colorClasses[phase.color];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <Workflow className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">Our Complete Publishing Process</h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            From initial consultation to book launch and beyond, we guide you through every step of your publishing journey with expertise, care, and Christian integrity.
          </p>
        </div>
      </section>

      {/* Interactive Process Timeline */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Publishing Timeline</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click through each phase to explore the detailed steps in our comprehensive publishing process.
            </p>
          </div>

          {/* Phase Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {businessLifecycle.map((p, index) => {
                const isActive = activePhase === index;
                const c = colorClasses[p.color];
                return (
                  <Button
                    key={index}
                    variant={isActive ? "default" : "outline"}
                    className={"text-sm px-4 py-2 " + (
                      isActive
                        ? c.accent + " text-white hover:opacity-90"
                        : "border-2 " + c.border + " " + c.text + " " + c.hover
                    )}
                    onClick={() => setActivePhase(index)}
                  >
                    <span className="mr-2">{index + 1}</span>
                    {p.phase}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Details */}
          <Card className={"shadow-2xl border-2 " + colors.border}>
            <div className={"h-2 " + colors.accent}></div>
            <CardHeader className={colors.bg + " border-b " + colors.border}>
              <div className="flex items-center space-x-4">
                <div className={"w-16 h-16 rounded-full flex items-center justify-center shadow-lg " + colors.accent}>
                  {React.createElement(phase.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                  <Badge className={colors.text + " " + colors.bg + " mb-2"}>Phase {activePhase + 1}</Badge>
                  <CardTitle className={"text-3xl font-bold " + colors.text}>{phase.phase}</CardTitle>
                  {phase.subtitle && <p className={"text-lg opacity-80 " + colors.text}>{phase.subtitle}</p>}
                </div>
              </div>
              <p className={"text-lg mt-4 " + colors.text}>{phase.description}</p>
            </CardHeader>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Steps in This Phase:</h3>
              <div className="space-y-4">
                {phase.steps.map((step, stepIndex) => {
                  const stepKey = activePhase + "-" + stepIndex;
                  const isExpanded = expandedSteps[stepKey];
                  return (
                    <Card
                      key={stepIndex}
                      className={"border cursor-pointer transition-all duration-200 " + colors.border + " " + colors.hover}
                      onClick={() => toggleStep(activePhase, stepIndex)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={"w-10 h-10 rounded-lg flex items-center justify-center " + colors.bg}>
                              {React.createElement(step.icon, { className: "w-5 h-5 " + colors.text })}
                            </div>
                            <span className="font-medium text-gray-900">{step.name}</span>
                          </div>
                          {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                        </div>
                        {isExpanded && step.description && (
                          <div className="mt-3 pl-13">
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
              disabled={activePhase === 0}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Previous Phase
            </Button>
            <Button
              onClick={() => setActivePhase(Math.min(businessLifecycle.length - 1, activePhase + 1))}
              disabled={activePhase === businessLifecycle.length - 1}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Next Phase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Publishing Journey</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our structured approach ensures quality at every stage, transparency in communication, and a final product that exceeds your expectations.
          </p>
          <div className="bg-gradient-to-r from-red-50 to-cream-50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Our Process?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Comprehensive Support</h4>
                  <p className="text-gray-600 text-sm">From manuscript to market-ready book</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
                  <p className="text-gray-600 text-sm">Multiple review and approval stages</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <HandHeart className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Personal Touch</h4>
                  <p className="text-gray-600 text-sm">Christian values and personal attention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Publishing Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Take the first step by submitting your manuscript. Our team will guide you through every phase of this comprehensive process.
          </p>
          <Link to={createPageUrl("Submission")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
