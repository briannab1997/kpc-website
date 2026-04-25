import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowRight, CheckCircle, Gift } from "lucide-react";

export default function FairnessStatement() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Scale className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Kentish Publishing - Fairness Statement</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our commitment to providing every author with an equal and fair opportunity to share their story.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100 p-8">
              <CardTitle className="text-3xl font-bold text-gray-900">Our Mission: Accessible Publishing for All</CardTitle>
            </CardHeader>
            <CardContent className="p-8 lg:p-12 space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                At Kentish Publishing, our mission is to make publishing accessible to as many voices as possible. To achieve this, we've created our <strong className="text-red-600">No Upfront Cost Program</strong>, which allows every author the chance to publish one e-book completely free of charge and to receive 100% of the royalties from that book.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8">Why This Limit? The Importance of Fairness</h3>
              <p>
                We've put this limit in place for one important reason: <strong>fairness</strong>.
              </p>
              <p>
                By keeping it to one free e-book per author, we can ensure that the same opportunity is available to all writers who come through our doors. If we allowed multiple free books for a few authors, it would reduce the resources we can offer others. This way, everyone gets an equal chance.
              </p>
              <p>
                Beyond that first book, you are always welcome to publish more with us - whether that means additional e-books, physical prints, or translations - but those projects will require separate contracts with standard costs.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8">This Approach Helps Us:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Support more authors fairly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Keep costs sustainable so we can continue offering free entry opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Build a community where every writer has the same chance to succeed</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-8">Looking Forward</h3>
              <p>
                We believe this balance of generosity and fairness is what makes Kentish Publishing unique. Every author gets their start with one free book, and from there, you have the freedom to grow your catalog with us under additional agreements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl font-bold mb-6">Ready to Claim Your Free E-Book Publication?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Take the first step on your publishing journey with our No Upfront Cost Program. We're excited to read your story.
          </p>
          <Link to={createPageUrl("Submission")}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              Submit Your Manuscript
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
