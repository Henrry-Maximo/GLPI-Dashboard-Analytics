import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

type PropsTicketsSummary = {
  status: {
    tickets_total: number;
    tickets_open: number;
    tickets_assigned: number;
    tickets_pending: number;
    tickets_solved: number;
    tickets_closed: number;
  };
  priority: {
    tickets_very_low: number;
    tickets_low: number;
    tickets_medium: number;
    tickets_high: number;
    tickets_very_high: number;
  };
  type: {
    incident: number;
    request: number;
  };
  categories: [
    {
      completename: string;
      count: number;
    }
  ];
};

export async function fetchTicketsSummary(): Promise<PropsTicketsSummary> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;

  // if (!response.ok) {
  //   throw new Error("Erro ao buscar os dados dos chamados");
  // }

  // const data = await response.json();
  // console.log(data);

  // // Certifique-se de que o retorno tenha o formato correto
  // if (!data.type || !data.data) {
  //   throw new Error("Resposta da API fora do formato esperado");
  // }

  // return data;
}
