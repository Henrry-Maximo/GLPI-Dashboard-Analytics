import type { DetailsTicketsResponse } from "../@types/interface-monitoring";
import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

export async function fetchDetailsTickets(): Promise<DetailsTicketsResponse> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(
    `${API_URL}/api-glpi/tickets/tickets-line-time`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  return data;
}
