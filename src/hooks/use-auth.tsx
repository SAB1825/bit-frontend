import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '@/lib/queries';
import { AuthStatus } from '@/types/authTypes';

export const useAuth = () => {
  return useQuery<AuthStatus, Error>({
    queryKey: ['auth'],
    queryFn: checkAuth,
    refetchOnWindowFocus: true,
    retry: false
  });
};