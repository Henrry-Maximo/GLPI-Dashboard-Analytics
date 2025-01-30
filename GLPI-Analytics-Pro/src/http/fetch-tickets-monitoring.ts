import type { DetailsMonitoringResponse } from '../@types/interface-monitoring';
import { fetchWithAuth } from './middlewares/verify-jwt-authenticate';

export async function fetchTicketsMonitoring(): Promise<DetailsMonitoringResponse> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/last`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
}
