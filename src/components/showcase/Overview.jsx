import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Star } from "lucide-react";

export default function Overview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Program Overview</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-amber-200">
            <CardContent className="p-8">
              <BookOpen className="w-12 h-12 mx-auto text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Editorial Training</h3>
              <p className="text-gray-600">Hands-on experience in manuscript review, editing, and publishing workflows.</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200">
            <CardContent className="p-8">
              <Users className="w-12 h-12 mx-auto text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Author Relations</h3>
              <p className="text-gray-600">Direct collaboration with authors to support their publishing journey.</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200">
            <CardContent className="p-8">
              <Star className="w-12 h-12 mx-auto text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Growth</h3>
              <p className="text-gray-600">Mentorship and real-world publishing industry exposure.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
