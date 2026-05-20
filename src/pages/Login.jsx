import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, BookOpen } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ full_name: "", email: "", password: "", confirm_password: "" });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });
      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_approved, user_type')
        .eq('id', data.user.id)
        .single();

      const userType = profile?.user_type || data.user?.user_metadata?.user_type || "author";
      const isApproved = profile?.is_approved;

      if (userType === "admin" || userType === "Staff" || userType?.startsWith("Intern")) {
        navigate(createPageUrl("StaffDashboard"));
      } else if (isApproved) {
        navigate(createPageUrl("AuthorPortal"));
      } else {
        navigate(createPageUrl("ApprovalPending"));
      }
    } catch (err) {
      setError(err.message || "Sign in failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (signUpData.password !== signUpData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: signUpData.full_name,
            user_type: "author",
            is_approved: false,
          },
        },
      });
      if (error) throw error;
      setSignUpSuccess(true);
    } catch (err) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (signUpSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center p-8">
          <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created</h2>
          <p className="text-gray-600 mb-4">
            Thank you for registering with Kentish Publishing Company. Your account is pending approval. You will be notified once access has been granted.
          </p>
          <Link to={createPageUrl("Home")}>
            <Button className="ribbon-button text-white w-full">Return to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900">Kentish Publishing</h1>
          <p className="text-gray-500 mt-1">Author and staff portal</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="flex w-full mb-8 border-b border-gray-200">
              <button
                onClick={() => { setActiveTab("signin"); setError(""); }}
                className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === "signin" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab("signup"); setError(""); }}
                className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === "signup" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                Create Account
              </button>
            </div>

            {activeTab === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="h-11 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    required
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    placeholder="••••••••"
                    className="h-11 w-full"
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button type="submit" disabled={isLoading} className="w-full ribbon-button text-white h-11">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Sign In
                </Button>
              </form>
            )}

            {activeTab === "signup" && (
              <form onSubmit={handleSignUp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    type="text"
                    required
                    value={signUpData.full_name}
                    onChange={(e) => setSignUpData({ ...signUpData, full_name: e.target.value })}
                    placeholder="Your full name"
                    className="h-11 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="h-11 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    required
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    placeholder="At least 6 characters"
                    className="h-11 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    required
                    value={signUpData.confirm_password}
                    onChange={(e) => setSignUpData({ ...signUpData, confirm_password: e.target.value })}
                    placeholder="••••••••"
                    className="h-11 w-full"
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button type="submit" disabled={isLoading} className="w-full ribbon-button text-white h-11">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Create Account
                </Button>
                <p className="text-xs text-gray-500 text-center pt-1">
                  New accounts are reviewed before access is granted.
                </p>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to={createPageUrl("Home")} className="hover:text-red-600 transition-colors">
            Back to Kentish Publishing Company
          </Link>
        </p>
      </div>
    </div>
  );
}
