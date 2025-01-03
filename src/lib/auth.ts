const API_BASE_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL;

export const checkAuth = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/check`, {
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  return response.json();
};