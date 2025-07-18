import type { DetailsTicketsResponse } from "../@types/interface-monitoring";
import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

export async function fetchDetailsTickets(): Promise<DetailsTicketsResponse> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/overview`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
