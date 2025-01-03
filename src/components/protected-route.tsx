"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/auth';

interface AuthResponse {
  user: {
    role: string;
  };
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then((response: AuthResponse) => {
        if (response.user.role !== 'staff' && response.user.role !== 'admin') {
          router.push('/unauthorized');
          return;
        }
        setIsLoading(false);
      })
      .catch(() => {
        router.push('/sign-in');
      });
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}