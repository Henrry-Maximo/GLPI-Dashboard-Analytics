import type { DetailsMonitoringResponse } from "../@types/interface-monitoring";
import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

export async function fetchTicketsMonitoring(): Promise<DetailsMonitoringResponse> {
  const response = await fetchWithAuth(
    "http://192.168.0.100:5000/api-glpi/tickets/last",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  
  const data = await response.json();

  return data;
}
