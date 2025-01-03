export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const userJWT = sessionStorage.getItem("jwt");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${userJWT}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Token expirado, redireciona para a área de logout
    sessionStorage.removeItem("jwt"); // Limpa o token
    window.location.href = "/"; // Redireciona para a página de login
  }

  return response;
}
