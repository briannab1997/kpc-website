import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function Highlights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Program Highlights</h2>
        <div className="text-center py-12 text-gray-500">
          <Award className="w-16 h-16 mx-auto mb-4 text-amber-300" />
          <p className="text-lg">Key achievements and milestones from our intern cohort.</p>
        </div>
      </div>
    </section>
  );
}
