import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/AuthContext';
import Layout from './Layout';
import Home from './pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
            <Route path="*" element={<Layout currentPageName="NotFound"><div className="p-20 text-center"><h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1></div></Layout>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App
