import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/AuthContext';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Beliefs from './pages/Beliefs';
import BookSignings from './pages/BookSignings';
import Books from './pages/Books';
import Authors from './pages/Authors';
import Careers from './pages/Careers';
import Collaborations from './pages/Collaborations';
import CommunityPartnerships from './pages/CommunityPartnerships';
import Contact from './pages/Contact';
import ContentManagement from './pages/ContentManagement';
import Dashboard from './pages/Dashboard';
import DisabilityChronicIllness from './pages/DisabilityChronicIllness';
import EnvironmentalClimateJustice from './pages/EnvironmentalClimateJustice';
import Events from './pages/Events';
import FairnessStatement from './pages/FairnessStatement';
import FaithCommunities from './pages/FaithCommunities';
import FAQ from './pages/FAQ';
import FeaturedAuthors from './pages/FeaturedAuthors';
import Founder from './pages/Founder';
import GeniusMentorshipNetwork from './pages/GeniusMentorshipNetwork';
import GlobalReach from './pages/GlobalReach';
import History from './pages/History';
import HospitalsAndHealthcare from './pages/HospitalsAndHealthcare';
import Imprints from './pages/Imprints';
import InternManuscriptDetail from './pages/InternManuscriptDetail';
import InternshipShowcase from './pages/InternshipShowcase';
import ManuscriptDetail from './pages/ManuscriptDetail';
import MediaPress from './pages/MediaPress';
import MentalHealthSupport from './pages/MentalHealthSupport';
import MentorProfileDetail from './pages/MentorProfileDetail';
import NarrativeBloom from './pages/NarrativeBloom';
import News from './pages/News';
import NHSDoctors from './pages/NHSDoctors';
import NursingHomes from './pages/NursingHomes';
import OurProcess from './pages/OurProcess';
import Partnerships from './pages/Partnerships';
import Prisons from './pages/Prisons';
import RapeCrisisCenters from './pages/RapeCrisisCenters';
import RefugeeMigrant from './pages/RefugeeMigrant';
import StaffCRM from './pages/StaffCRM';
import StaffDashboard from './pages/StaffDashboard';
import StaffManuscriptDetail from './pages/StaffManuscriptDetail';
import Submission from './pages/Submission';
import SubmissionGuidelines from './pages/SubmissionGuidelines';
import Team from './pages/Team';
import Veterans from './pages/Veterans';
import YouthAtRisk from './pages/YouthAtRisk';
import ApprovalPending from './pages/ApprovalPending';
import AuthorPortal from './pages/AuthorPortal';
import AuthorProfile from './pages/AuthorProfile';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
            <Route path="/Home" element={<Layout currentPageName="Home"><Home /></Layout>} />
            <Route path="/About" element={<Layout currentPageName="About"><About /></Layout>} />
            <Route path="/Beliefs" element={<Layout currentPageName="Beliefs"><Beliefs /></Layout>} />
            <Route path="/BookSignings" element={<Layout currentPageName="BookSignings"><BookSignings /></Layout>} />
            <Route path="/Books" element={<Layout currentPageName="Books"><Books /></Layout>} />
            <Route path="/Authors" element={<Layout currentPageName="Authors"><Authors /></Layout>} />
            <Route path="/Careers" element={<Layout currentPageName="Careers"><Careers /></Layout>} />
            <Route path="/Collaborations" element={<Layout currentPageName="Collaborations"><Collaborations /></Layout>} />
            <Route path="/CommunityPartnerships" element={<Layout currentPageName="CommunityPartnerships"><CommunityPartnerships /></Layout>} />
            <Route path="/Contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
            <Route path="/ContentManagement" element={<ContentManagement />} />
            <Route path="/Dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
            <Route path="/DisabilityChronicIllness" element={<Layout currentPageName="DisabilityChronicIllness"><DisabilityChronicIllness /></Layout>} />
            <Route path="/EnvironmentalClimateJustice" element={<Layout currentPageName="EnvironmentalClimateJustice"><EnvironmentalClimateJustice /></Layout>} />
            <Route path="/Events" element={<Layout currentPageName="Events"><Events /></Layout>} />
            <Route path="/FairnessStatement" element={<Layout currentPageName="FairnessStatement"><FairnessStatement /></Layout>} />
            <Route path="/FaithCommunities" element={<Layout currentPageName="FaithCommunities"><FaithCommunities /></Layout>} />
            <Route path="/FAQ" element={<Layout currentPageName="FAQ"><FAQ /></Layout>} />
            <Route path="/FeaturedAuthors" element={<Layout currentPageName="FeaturedAuthors"><FeaturedAuthors /></Layout>} />
            <Route path="/Founder" element={<Layout currentPageName="Founder"><Founder /></Layout>} />
            <Route path="/Submission" element={<Layout currentPageName="Submission"><Submission /></Layout>} />
            <Route path="/ApprovalPending" element={<Layout currentPageName="ApprovalPending"><ApprovalPending /></Layout>} />
            <Route path="/AuthorPortal" element={<Layout currentPageName="AuthorPortal"><AuthorPortal /></Layout>} />
            <Route path="/AuthorProfile" element={<Layout currentPageName="AuthorProfile"><AuthorProfile /></Layout>} />
            <Route path="/GeniusMentorshipNetwork" element={<Layout currentPageName="GeniusMentorshipNetwork"><GeniusMentorshipNetwork /></Layout>} />
            <Route path="/GlobalReach" element={<Layout currentPageName="GlobalReach"><GlobalReach /></Layout>} />
            <Route path="/History" element={<Layout currentPageName="History"><History /></Layout>} />
            <Route path="/HospitalsAndHealthcare" element={<Layout currentPageName="HospitalsAndHealthcare"><HospitalsAndHealthcare /></Layout>} />
            <Route path="/Imprints" element={<Layout currentPageName="Imprints"><Imprints /></Layout>} />
            <Route path="/InternManuscriptDetail" element={<Layout currentPageName="InternManuscriptDetail"><InternManuscriptDetail /></Layout>} />
            <Route path="/InternshipShowcase" element={<Layout currentPageName="InternshipShowcase"><InternshipShowcase /></Layout>} />
            <Route path="/ManuscriptDetail" element={<Layout currentPageName="ManuscriptDetail"><ManuscriptDetail /></Layout>} />
            <Route path="/MediaPress" element={<Layout currentPageName="MediaPress"><MediaPress /></Layout>} />
            <Route path="/MentalHealthSupport" element={<Layout currentPageName="MentalHealthSupport"><MentalHealthSupport /></Layout>} />
            <Route path="/MentorProfileDetail" element={<Layout currentPageName="MentorProfileDetail"><MentorProfileDetail /></Layout>} />
            <Route path="/NarrativeBloom" element={<Layout currentPageName="NarrativeBloom"><NarrativeBloom /></Layout>} />
            <Route path="/News" element={<Layout currentPageName="News"><News /></Layout>} />
            <Route path="/NHSDoctors" element={<Layout currentPageName="NHSDoctors"><NHSDoctors /></Layout>} />
            <Route path="/NursingHomes" element={<Layout currentPageName="NursingHomes"><NursingHomes /></Layout>} />
            <Route path="/OurProcess" element={<Layout currentPageName="OurProcess"><OurProcess /></Layout>} />
            <Route path="/Partnerships" element={<Layout currentPageName="Partnerships"><Partnerships /></Layout>} />
            <Route path="/Prisons" element={<Layout currentPageName="Prisons"><Prisons /></Layout>} />
            <Route path="/RapeCrisisCenters" element={<Layout currentPageName="RapeCrisisCenters"><RapeCrisisCenters /></Layout>} />
            <Route path="/RefugeeMigrant" element={<Layout currentPageName="RefugeeMigrant"><RefugeeMigrant /></Layout>} />
            <Route path="/StaffCRM" element={<StaffCRM />} />
            <Route path="/StaffDashboard" element={<StaffDashboard />} />
            <Route path="/StaffManuscriptDetail" element={<StaffManuscriptDetail />} />
            <Route path="/SubmissionGuidelines" element={<Layout currentPageName="SubmissionGuidelines"><SubmissionGuidelines /></Layout>} />
            <Route path="/Team" element={<Layout currentPageName="Team"><Team /></Layout>} />
            <Route path="/Veterans" element={<Layout currentPageName="Veterans"><Veterans /></Layout>} />
            <Route path="/YouthAtRisk" element={<Layout currentPageName="YouthAtRisk"><YouthAtRisk /></Layout>} />
            <Route path="*" element={<Layout currentPageName="NotFound"><div className="p-20 text-center"><h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1></div></Layout>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
