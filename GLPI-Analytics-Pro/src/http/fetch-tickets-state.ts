import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

type PropsTicketsStateStatus = {
  tickets_total: number;
  tickets_open: number;
  tickets_assigned: number;
  tickets_pending: number;
  tickets_solved: number;
  tickets_closed: number;
};

type PropsTicketsStateUrgency = {
  tickets_very_low: number;
  tickets_low: number;
  tickets_medium: number;
  tickets_high: number;
  tickets_very_high: number;
};

type PropsTicketsStateCategories = PropsTicketsStateStatus;

type TicketsStateResponse = {
  type: "status" | "urgency" | "categories";
  data:
    | PropsTicketsStateStatus
    | PropsTicketsStateUrgency
    | PropsTicketsStateCategories;
};

export async function fetchTicketsState(): Promise<{
  ticketsStateInDatabase: PropsTicketsStateStatus[];
}> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(
    `${API_URL}/api-glpi/tickets/state`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { result } = await response.json();

  const ticketsStateInDatabase = result.ticketsByStatusCount;
  return { ticketsStateInDatabase };

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
