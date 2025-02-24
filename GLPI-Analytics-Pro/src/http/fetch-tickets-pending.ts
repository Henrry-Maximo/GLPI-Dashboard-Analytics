import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";


export async function fetchTicketsPending() {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/pending`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar os chamados.');
  }

  return response.json();
}