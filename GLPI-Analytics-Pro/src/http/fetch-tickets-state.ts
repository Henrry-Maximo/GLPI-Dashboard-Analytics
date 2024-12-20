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

export async function fetchTicketsState() {
  const userJWT = sessionStorage.getItem("jwt");

  const response = await fetch(
    "http://10.10.2.93:5000/api-glpi/tickets/state",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJWT}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar os dados dos chamados");
  }

  const data = await response.json();
  console.log(data);

  // Certifique-se de que o retorno tenha o formato correto
  if (!data.type || !data.data) {
    throw new Error("Resposta da API fora do formato esperado");
  }

  return data;
}
