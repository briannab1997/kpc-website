import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { createPageUrl } from '@/utils';
import {
  Menu, X, ChevronDown, LogOut,
  Mail, Phone, MapPin, Search
} from 'lucide-react';

const Facebook = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const Twitter = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const Instagram = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Layout({ children, currentPageName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const isActive = (page) => currentPageName === page;

  const handleLogout = async () => {
    await signOut();
    navigate(createPageUrl('Home'));
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navLinkClass = (active) =>
    `font-medium transition-colors text-sm ${active ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`;

  const dropdowns = [
    {
      label: 'About',
      name: 'about',
      items: [
        { label: 'Mission & Vision', page: 'About' },
        { label: 'History', page: 'History' },
        { label: 'Beliefs', page: 'Beliefs' },
        { label: 'Team', page: 'Team' },
      ],
    },
    {
      label: 'News',
      name: 'news',
      items: [
        { label: 'Company Updates', page: 'News' },
        { label: 'Internship Showcase', page: 'InternshipShowcase' },
      ],
    },
    {
      label: 'Founder',
      name: 'founder',
      items: [
        { label: 'Biography', page: 'Founder' },
        { label: 'Media / Press', page: 'MediaPress' },
      ],
    },
    {
      label: 'Authors',
      name: 'authors',
      items: [
        { label: 'Featured Authors', page: 'Authors' },
      ],
    },
    {
      label: 'Our Process',
      name: 'process',
      items: [
        { label: 'Editing & Design', page: 'OurProcess' },
      ],
    },
    {
      label: 'Events',
      name: 'events',
      items: [
        { label: 'Upcoming Events', page: 'Events' },
        { label: 'Past Events', page: 'Events' },
      ],
    },
    {
      label: 'Collaborations',
      name: 'collaborations',
      items: [
        { label: 'The Genius Mentorship Network', page: 'GeniusMentorshipNetwork' },
        { label: 'Schools & Educational Institutions', page: 'Collaborations' },
        { label: 'Prisons & Correctional Facilities', page: 'Prisons' },
        { label: 'Nursing Homes & Elder Care', page: 'NursingHomes' },
        { label: 'Rape Crisis Centers', page: 'RapeCrisisCenters' },
        { label: 'Hospitals & Patients', page: 'HospitalsAndHealthcare' },
        { label: 'NHS Doctors & Medical Professionals', page: 'NHSDoctors' },
        { label: 'Refugee & Migrant Support', page: 'RefugeeMigrant' },
        { label: 'Youth at Risk Programs', page: 'YouthAtRisk' },
        { label: 'Veterans & Armed Forces', page: 'Veterans' },
        { label: 'Mental Health Support Groups', page: 'MentalHealthSupport' },
        { label: 'Faith Communities', page: 'FaithCommunities' },
        { label: 'Disability & Chronic Illness Networks', page: 'DisabilityChronicIllness' },
        { label: 'Environmental & Climate Justice', page: 'EnvironmentalClimateJustice' },
        { label: 'Other Community Organizations', page: 'CommunityPartnerships' },
      ],
    },
    {
      label: 'Submissions',
      name: 'submissions',
      items: [
        { label: 'Guidelines', page: 'SubmissionGuidelines' },
        { label: 'Submit Your Manuscript', page: 'Submission' },
        { label: 'FAQ', page: 'FAQ' },
      ],
    },
    {
      label: 'Contact',
      name: 'contact',
      items: [
        { label: 'General Inquiries', page: 'Contact' },
        { label: 'Media / Press', page: 'MediaPress' },
        { label: 'Partnerships', page: 'Partnerships' },
      ],
    },
    {
      label: 'Technologies',
      name: 'technologies',
      items: [
        { label: 'Narrative Behind Words', page: 'NarrativeBloom' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <style>{`
        .bg-cream-50 { background-color: #fefdfb; }
        .from-cream-50 { --tw-gradient-from: #fefdfb; }
      `}</style>

      <header className="bg-white shadow-sm border-b border-red-100 relative ribbon-decoration">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to={createPageUrl('Home')}>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd024f692e10c58f7bc52c/1784aa37f_Untitleddesign.jpg"
                alt="Kentish Publishing Company"
                className="h-16 w-auto object-contain"
                width="105"
                height="64"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-4 text-sm flex-wrap">
              <Link to={createPageUrl('Home')} className={navLinkClass(isActive('Home'))}>Home</Link>

              {dropdowns.map((d) => (
                <div key={d.name} className="relative">
                  <button
                    className={`flex items-center ${navLinkClass(false)} focus:outline-none`}
                    onClick={() => toggleDropdown(d.name)}
                    aria-expanded={openDropdown === d.name}
                    aria-haspopup="true"
                  >
                    {d.label}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {openDropdown === d.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-md shadow-lg z-50">
                      {d.items.map((item) => (
                        <Link
                          key={item.page}
                          to={createPageUrl(item.page)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link to={createPageUrl('Books')} className={navLinkClass(isActive('Books'))}>Books</Link>
              <Link to={createPageUrl('Imprints')} className={navLinkClass(isActive('Imprints'))}>Imprints</Link>
              <Link to={createPageUrl('FairnessStatement')} className={navLinkClass(isActive('FairnessStatement'))}>Fairness</Link>
              <Link to={createPageUrl('Careers')} className={navLinkClass(isActive('Careers'))}>Careers</Link>

              {!user ? (
                <Link
                  to={createPageUrl('Login')}
                  className="border border-red-200 text-red-600 hover:bg-red-50 text-sm px-3 py-1.5 rounded-md font-medium transition-colors"
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  {user.user_metadata?.role === 'admin' && (
                    <Link to={createPageUrl('StaffDashboard')} className={navLinkClass(isActive('StaffDashboard'))}>Staff Portal</Link>
                  )}
                  <Link to={createPageUrl('Dashboard')} className={navLinkClass(isActive('Dashboard'))}>Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="border border-red-200 text-red-600 hover:bg-red-50 text-sm px-3 py-1.5 rounded-md font-medium flex items-center transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              )}
            </nav>

            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg pb-4 px-4">
            <Link to={createPageUrl('Home')} className="block py-2 text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            {dropdowns.map((d) => (
              <div key={d.name}>
                <button
                  className="w-full text-left py-2 text-gray-900 font-medium flex items-center justify-between"
                  onClick={() => toggleDropdown(d.name)}
                >
                  {d.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === d.name && (
                  <div className="pl-4 pb-2">
                    {d.items.map((item) => (
                      <Link
                        key={item.page}
                        to={createPageUrl(item.page)}
                        className="block py-1.5 text-gray-600 hover:text-red-600 text-sm"
                        onClick={() => { setIsMobileMenuOpen(false); setOpenDropdown(null); }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to={createPageUrl('Books')} className="block py-2 text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Books</Link>
            <Link to={createPageUrl('Imprints')} className="block py-2 text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Imprints</Link>
            <Link to={createPageUrl('FairnessStatement')} className="block py-2 text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Fairness</Link>
            <Link to={createPageUrl('Careers')} className="block py-2 text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-gray-900 text-white relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Kentish Publishing Company is a distinguished professional publishing house
                dedicated to nurturing unique stories from authors worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to={createPageUrl('About')} className="block text-gray-400 hover:text-white text-sm transition-colors">About</Link>
                <Link to={createPageUrl('Authors')} className="block text-gray-400 hover:text-white text-sm transition-colors">Authors</Link>
                <Link to={createPageUrl('Books')} className="block text-gray-400 hover:text-white text-sm transition-colors">Books</Link>
                <Link to={createPageUrl('Events')} className="block text-gray-400 hover:text-white text-sm transition-colors">Events</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <Link to={createPageUrl('Submission')} className="block text-gray-400 hover:text-white text-sm transition-colors">Submit Manuscript</Link>
                <Link to={createPageUrl('OurProcess')} className="block text-gray-400 hover:text-white text-sm transition-colors">Publishing Process</Link>
                <Link to={createPageUrl('Collaborations')} className="block text-gray-400 hover:text-white text-sm transition-colors">Collaborations</Link>
                <Link to={createPageUrl('FAQ')} className="block text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link>
                <Link to={createPageUrl('PrivacyPolicy')} className="block text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link to={createPageUrl('TermsOfService')} className="block text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="mailto:contact@kentishpublishingcompany.com" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@kentishpublishingcompany.com
                </a>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>UK: +44 07385 814888</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Kentish Town, London, United Kingdom
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="https://facebook.com/kentishpublishing" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a href="https://twitter.com/kentishpublishing" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a href="https://instagram.com/kentishpublishing" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm gap-4">
            <p>© 2026 Kentish Publishing Company. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to={createPageUrl('Login')} className="hover:text-white transition-colors">Author Login</Link>
              <Link to={createPageUrl('Login')} className="hover:text-white transition-colors">Staff Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
