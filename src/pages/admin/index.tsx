import AdminDashboard from "@/components/AdminDashboard";
import AuthWrapper from "@/components/AuthWrapper";

export default function ProtectedAdminPage() {
    return (
        <AuthWrapper>
            <AdminDashboard />
        </AuthWrapper>
    );
}