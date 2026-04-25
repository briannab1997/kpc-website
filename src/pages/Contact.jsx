import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  BookOpen,
  User,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-white flex items-center justify-center py-12">
        <Card className="w-full max-w-lg shadow-2xl border-red-100">
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out to us. We have received your message and will respond within 24-48 hours.
            </p>
            <Button onClick={() => setSubmissionStatus(null)} className="ribbon-button text-white">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submissionStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-white flex items-center justify-center py-12">
        <Card className="w-full max-w-lg shadow-2xl border-red-100">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-red-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Failed to Send</h2>
            <p className="text-gray-600 mb-6">
              We're sorry, but there was an issue sending your message. Please try again or contact us directly.
            </p>
            <Button onClick={() => setSubmissionStatus(null)} className="ribbon-button text-white">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MessageSquare className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We'd love to hear from you. Whether you're interested in publishing with us, have questions about our services,
            or want to discuss partnership opportunities, we're here to help.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-2xl border-red-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Send className="w-6 h-6 mr-3 text-red-600" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input name="name" placeholder="Your Full Name" value={formData.name} onChange={handleInputChange} required />
                    <Input name="email" type="email" placeholder="Your Email Address" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <Input name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} required />
                  <Textarea
                    name="message"
                    placeholder="Tell us about your inquiry, manuscript, or how we can help you..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                  />
                  <Button type="submit" className="w-full ribbon-button text-white text-lg py-3" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending Message...</>
                    ) : (
                      <><Send className="mr-2 h-5 w-5" />Send Message</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="shadow-lg border-red-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <User className="w-6 h-6 mr-3 text-red-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Founder & CEO</h3>
                      <p className="text-gray-600">Esther Ruth Kentish</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a href="mailto:contact@kentishpublishingcompany.com" className="text-red-600 hover:underline">
                        contact@kentishpublishingcompany.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <span className="text-gray-600">UK: +44 07385 814888</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">Kentish Town, London, United Kingdom</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-red-100 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center text-white">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Ready to Publish?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-100 mb-4">
                    If you're ready to submit your manuscript for consideration,
                    our submission process is the perfect place to start.
                  </p>
                  <Link to={createPageUrl("Submission")}>
                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600 w-full">
                      Submit Your Manuscript
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Response Times</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">General Inquiries</h3>
              <p className="text-gray-600">24-48 hours</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Manuscript Submissions</h3>
              <p className="text-gray-600">2-4 weeks</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Partnership Inquiries</h3>
              <p className="text-gray-600">1-2 weeks</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
