import type { DetailsTicketsResponse } from "../@types/interface-monitoring";
import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

export async function fetchDetailsTickets(): Promise<DetailsTicketsResponse> {
  const response = await fetchWithAuth(
    "http://192.168.0.100:5000/api-glpi/tickets/tickets-line-time",
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
