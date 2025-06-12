import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

export default function AuthWrapper({ children }: PropsWithChildren<object>) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        }
    }, []);

    return <>{children}</>;
}