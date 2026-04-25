import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ApprovalPending() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-cream-50 to-white py-12">
      <Card className="w-full max-w-lg shadow-2xl border-red-100">
        <CardHeader className="text-center">
          <Clock className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-gray-900">Account Pending Approval</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-gray-700 leading-relaxed mb-6">
            Thank you for registering! Your account has been created and is now awaiting approval from our administration team. This is to ensure the security and integrity of our author portal.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            You will receive an email notification once your account has been approved. Please allow 1-2 business days for this process. We appreciate your patience.
          </p>
          <Button variant="outline" onClick={handleLogout}>
            Logout & Return to Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
