import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function Mentorship() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Mentorship & Guidance</h2>
        <Card className="border-amber-200 shadow-lg">
          <CardContent className="p-10 text-center">
            <Lightbulb className="w-14 h-14 mx-auto text-amber-600 mb-4" />
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Each intern is paired with experienced publishing professionals who provide guidance, feedback, and support throughout the program - fostering both personal and professional development.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
