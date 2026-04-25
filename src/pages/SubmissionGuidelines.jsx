import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  FileText,
  CheckCircle,
  ArrowRight,
  Upload,
  Edit
} from "lucide-react";

const submissionSteps = [
  {
    number: "1",
    title: "Prepare Your Manuscript",
    items: [
      "Completed or in-progress works are welcome",
      "Acceptable formats: PDF or Word (.doc/.docx)",
      "Make sure your manuscript has your name and contact info on the first page"
    ]
  },
  {
    number: "2",
    title: "Write a Short Synopsis",
    items: [
      "1-2 paragraphs summarizing your project",
      "Include the genre and the main idea of your book",
      "Don't worry about perfect grammar - clarity is enough"
    ]
  },
  {
    number: "3",
    title: "Optional Supporting Materials",
    items: [
      "Any notes, outlines, or sketches that help explain your vision",
      "Cover letters or personal statements about your project"
    ]
  },
  {
    number: "4",
    title: "Submit Through Our Portal",
    items: [
      "Use the online submission form to upload your files",
      "Select your project type (Full Manuscript / In-Progress Work / Other)"
    ]
  },
  {
    number: "5",
    title: "Review & Guidance",
    items: [
      "Our team reviews submissions carefully",
      "Selected writers receive guidance and support to build and complete their book",
      "Feedback will be communicated via email or your author portal"
    ]
  },
  {
    number: "6",
    title: "Keep Track of Your Submission",
    items: [
      "After submission, you can track the status through your Author Login",
      "You will be notified once your manuscript is reviewed"
    ]
  }
];

export default function SubmissionGuidelines() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Submission Guidelines</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Ready to share your story with the world? We're here to guide you through every step of the submission process.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
              <CardTitle className="text-3xl font-bold text-gray-900">Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Kentish Publishing, we're passionate about helping writers bring their ideas to life,
                whether your manuscript is fully finished or still in development. We aim to support
                authors from the very first page to the final published work.
              </p>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-semibold text-red-800 mb-4">What to Submit:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center p-4 bg-white rounded-md border">
                    <FileText className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Completed Manuscripts</h4>
                      <p className="text-sm text-gray-600">Full manuscripts in PDF or Word format</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-md border">
                    <Edit className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">In-Progress Work</h4>
                      <p className="text-sm text-gray-600">We help you build from start to finish</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-md border">
                    <BookOpen className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Any Genre</h4>
                      <p className="text-sm text-gray-600">Fiction, non-fiction, poetry, academic work</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-red-100">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Important Notes</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Don't worry if your manuscript isn't polished</strong> - we focus on helping writers grow and complete their work.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Ensure your submission includes</strong> your name, contact information, and a brief synopsis (1-2 paragraphs) describing your project.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>All submissions are reviewed</strong> by our team, and selected writers will receive guidance and support through the publishing process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Submission Checklist: How to Submit Your Manuscript</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to ensure your submission is complete and ready for review.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {submissionSteps.map((step) => (
              <Card key={step.number} className="hover:shadow-xl transition-shadow duration-300 border-red-100">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mr-4 text-white font-bold text-xl">
                      {step.number}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Upload className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl font-bold mb-6">Ready to Submit Your Manuscript?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Take the first step in your publishing journey. Our team is excited to read your work and help you bring your vision to life.
          </p>
          <Link to={createPageUrl("Submission")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Submit Your Work Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
