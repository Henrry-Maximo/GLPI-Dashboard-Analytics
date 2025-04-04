import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

type propsTicketsSummaryResponse = {
  date_cretion: string;
  status: string;
  count: number;
};

interface PropsTicketsSummaryResponse {
  list: Array<{
    date_cretion: string;
    status: string;
    count: number;
  }>;
  meta: {
    delayed: Array<{
      id: number;
      date_cretion: number;
      time_to_resolve: number;
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

  if (!response.ok) {
    throw new Error("Erro ao buscar os chamados.");
  }

  return response.json();
}
