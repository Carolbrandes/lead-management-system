import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthWrapper({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        }
    }, []);

    return <>{children}</>;
}