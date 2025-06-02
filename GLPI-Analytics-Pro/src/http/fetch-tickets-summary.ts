import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

interface PropsTicketsSummaryResponse {
  list: Array<{
    date_creation: string;
    status: string;
    count: number;
  }>;
  meta: {
    delayed: Array<{
      id: number;
      date_creation: string;
      time_to_resolve: string;
      status: number;
      name: string;
    }>;
    categories: Array<{
      name: string;
      completename: string;
      count: number;
    }>;
  };
}

// type propsTicketsSummaryResponse = {
//   date_cretion: string;
//   status: string;
//   count: number;
// };

// interface PropsTicketsSummaryResponse {
//   list: propsTicketsSummaryResponse[];
//   meta: {
//     total: number;
//     categories: Array<{ name: string; count: number }>;
//     type: Array<{ name: string; count: number }>;
//   };
// }

export async function fetchTicketsSummary(): Promise<PropsTicketsSummaryResponse> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
