import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { Loader2, LayoutDashboard, Users, BookOpen, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

const navItems = [
  { label: "Dashboard", to: createPageUrl("StaffDashboard"), icon: LayoutDashboard },
  { label: "Authors (CRM)", to: createPageUrl("StaffCRM"), icon: Users },
  { label: "Content", to: createPageUrl("ContentManagement"), icon: FileText },
  { label: "Books", to: createPageUrl("Books"), icon: BookOpen },
];

export default function StaffLayout({ children }) {
  const { user, isLoadingAuth, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingAuth && (!user || user?.user_metadata?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, isLoadingAuth]);

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-red-600">Staff Portal</h2>
          <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-red-600" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
