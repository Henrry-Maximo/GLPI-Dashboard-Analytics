import type { Ticket } from "@/@types/interface-tickets";
import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

export async function fetchTicketsAll(): Promise<Ticket[]> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/search`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  return response.json();
}
