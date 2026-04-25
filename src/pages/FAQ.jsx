import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, Book, Gift, CheckCircle } from "lucide-react";

const faqData = [
  {
    question: "Can I publish more than one book for free?",
    answer: "No. Each author is entitled to publish only one free e-book with 100% royalties. Any additional books will require a new contract under standard pricing."
  },
  {
    question: "Does the free e-book include physical copies?",
    answer: "No. The free contract covers digital e-book only. If you want physical prints (paperback or hardcover), this will require a separate print contract."
  },
  {
    question: "Can I print or distribute my book on my own?",
    answer: "No. Authors may not independently print or distribute their contracted book. Doing so would be a breach of contract and will result in a contractual fee."
  },
  {
    question: "Is marketing included in the free contract?",
    answer: "Yes. We provide free marketing for your e-book, including a listing on our website and a dedicated author marketing page. To maintain this service, there is a small £5/month subscription fee (minimum 6 months)."
  },
  {
    question: "Is translation included?",
    answer: "No. Translation is not included in the free contract. However, translation services can be arranged under a separate agreement."
  },
  {
    question: "What happens if I want to publish a second e-book or another project?",
    answer: "That's wonderful! Any additional e-books, physical books, or translations will be handled under new contracts with separate costs."
  }
];

export default function FAQ() {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <HelpCircle className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our No Upfront Cost Program and publishing process.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-red-100">
            <CardContent className="p-8 lg:p-12">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center">
                <Gift className="w-8 h-8 mr-3" />
                In Summary: Your Free E-Book Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 lg:p-12">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>1 free e-book (digital only)</strong> — 100% royalties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>£5/month marketing subscription</strong> (minimum 6 months) — for that e-book only</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>All other services</strong> (print, translation, more books) — separate contracts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team is here to help. Contact us for any further clarification or to discuss your publishing goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                Contact Us
                <MessageSquare className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Submission")}>
              <Button variant="outline" size="lg" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Submit Your Book
                <Book className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
