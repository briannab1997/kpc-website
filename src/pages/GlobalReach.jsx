import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Languages, Briefcase, Clock, Users, MapPin } from 'lucide-react';

const locationsByContinent = {
  "Africa": [
    { name: "Uyo, Nigeria" },
    { name: "Lagos, Nigeria" },
    { name: "Ibadan, Nigeria" },
    { name: "Cape Town, South Africa" },
  ],
  "Europe": [
    { name: "Saint-Jean-de-la-Ruelle, France" },
    { name: "Uusikaupunki, Finland" },
    { name: "Tehran, Iran" },
  ],
  "Asia": [
    { name: "Karachi, Pakistan" },
    { name: "Chennai, India" },
    { name: "Ho Chi Minh City, Vietnam" },
  ],
  "North America": [
    { name: "Fort Lee, NJ, USA" },
    { name: "Reno, NV, USA" },
    { name: "Leavenworth, KS, USA" },
    { name: "Spartanburg, SC, USA" },
    { name: "Escondido, CA, USA" },
    { name: "Birmingham, AL, USA" },
    { name: "Los Angeles, CA, USA" },
  ],
  "South America": [
    { name: "Lima, Peru" },
    { name: "Franca, SP, Brazil" },
    { name: "Sacramento, MG, Brazil" },
    { name: "Guayaquil, Ecuador" },
  ],
  "Caribbean": [
    { name: "Camagüey, Cuba" },
  ],
};

const continentColors = {
  "Africa": "bg-amber-50 border-amber-200 text-amber-700",
  "Europe": "bg-blue-50 border-blue-200 text-blue-700",
  "Asia": "bg-green-50 border-green-200 text-green-700",
  "North America": "bg-red-50 border-red-200 text-red-700",
  "South America": "bg-purple-50 border-purple-200 text-purple-700",
  "Caribbean": "bg-cyan-50 border-cyan-200 text-cyan-700",
};

const demographicHighlights = [
  {
    icon: Languages,
    title: "Cultural & Linguistic Diversity",
    content: "Our authors and partners come from diverse cultural backgrounds, speaking languages including English, French, Spanish, Portuguese, Urdu, Hindi, Vietnamese, and Persian. This requires multilingual capability and deep cultural understanding."
  },
  {
    icon: Briefcase,
    title: "Professional & Organizational Spread",
    content: "We collaborate with individual writers, professional creatives, journalists, and institutional partners like ICC Flushing, reflecting a broad professional mix."
  },
  {
    icon: Clock,
    title: "Global Time Zone Flexibility",
    content: "Our operations span a 15-hour spread, from GMT-8 to GMT+7. We maintain flexible scheduling to accommodate clients across North America, Europe, Africa, Asia, and South America."
  },
  {
    icon: Users,
    title: "Urban & Regional Focus",
    content: "While many of our partners are in major urban centers like Lagos, Chennai, and Los Angeles, we are proud to serve clients in broader regions and smaller towns, ensuring we are accessible to all."
  }
];

export default function GlobalReach() {
  const totalLocations = Object.values(locationsByContinent).reduce((sum, locs) => sum + locs.length, 0);

  return (
    <div className="bg-gradient-to-br from-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Globe className="w-20 h-20 mx-auto text-red-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Global Reach</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kentish Publishing Company is proud to be a truly international press, engaging with authors, creatives, and organizations across all inhabited continents. Below is a snapshot of the geographic spread of our valued partners and collaborators.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-5 py-2 rounded-full font-semibold">
            <MapPin className="w-5 h-5" />
            {totalLocations}+ Partner Locations Worldwide
          </div>
        </div>
      </section>

      {/* Locations by Continent */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Connecting Voices Across Continents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(locationsByContinent).map(([continent, locations]) => (
              <Card key={continent} className={`border ${continentColors[continent].split(' ')[1]} hover:shadow-lg transition-shadow`}>
                <CardHeader className={`${continentColors[continent].split(' ')[0]} rounded-t-lg pb-3`}>
                  <CardTitle className={`flex items-center gap-2 ${continentColors[continent].split(' ')[2]}`}>
                    <MapPin className="w-5 h-5" />
                    {continent}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-1">
                    {locations.map((loc, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {loc.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demographic Highlights */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">A Closer Look at Our Demographics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our global presence brings a rich diversity of cultures, professions, and perspectives.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {demographicHighlights.map(item => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow duration-300 border-red-100">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 text-center">Implications of Our Global Reach</h2>
              <p className="text-xl text-red-100 leading-relaxed text-center">
                This diverse demographic allows for international publications, multilingual projects, and rich cross-cultural collaboration, positioning Kentish Publishing Company as a globally inclusive and adaptable publishing service.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
