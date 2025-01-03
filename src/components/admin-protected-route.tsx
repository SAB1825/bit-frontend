"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/auth';

interface AuthResponse {
  user: {
    role: string;
  };
}

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then((response: AuthResponse) => {
        if (response.user.role !== 'admin') {
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
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return <>{children}</>;
}