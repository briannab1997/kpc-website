import Hero from "@/components/showcase/Hero";
import Overview from "@/components/showcase/Overview";
import Profiles from "@/components/showcase/Profiles";
import Highlights from "@/components/showcase/Highlights";
import Mentorship from "@/components/showcase/Mentorship";
import FooterCTA from "@/components/showcase/FooterCTA";

export default function InternshipShowcase() {
  return (
    <div className="bg-cream-50 font-sans text-gray-800">
      <style>{`
        .showcase-button {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%);
          border: none;
          position: relative;
          overflow: hidden;
        }
        .showcase-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        .showcase-button:hover::before {
          left: 100%;
        }
      `}</style>
      <Hero />
      <main>
        <Overview />
        <Profiles />
        <Highlights />
        <Mentorship />
        <FooterCTA />
      </main>
    </div>
  );
}
