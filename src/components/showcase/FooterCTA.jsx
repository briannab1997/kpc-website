import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FooterCTA() {
  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">Interested in Our Internship Program?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Join a team of passionate publishing professionals and make your mark on the literary world.
        </p>
        <Link to={createPageUrl("Careers")}>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg font-semibold">
            View Opportunities
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
