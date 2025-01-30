export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const userJWT = sessionStorage.getItem('jwt');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${userJWT}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    sessionStorage.removeItem('jwt');
    window.location.href = '/';
  }

  return response;
}
