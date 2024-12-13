import type { DetailsTicketsResponse } from "../@types/interface-monitoring";

export async function fetchDetailsTickets(): Promise<DetailsTicketsResponse> {
  const response = await fetch(
    "http://10.10.2.93:5000/api-glpi/tickets/tickets-line-time"
  );
  const data = await response.json();

  return data;
}
