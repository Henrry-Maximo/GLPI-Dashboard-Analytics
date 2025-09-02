import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

type propsTicketsPendingResponse = {
  id: number;
  title: string;
  date_cretion: string;
  solvedate: string;
  location: string;
  applicant: string;
  technical: string;
  status: string;
  priority: string;
  type: number;
};

// interface PropsTicketsPendingResponse {
//   list: propsTicketsPendingResponse[];
//   meta: {
//     total: number;
//     priority: Array<{ name: string; count: number }>;
//     type: Array<{ name: string; count: number }>;
//   };
// }

interface PropertiesTicketsSchema {
  id: number;
  title: string;
  date_creation: string;
  solvedate: string;
  location: string;
  applicant: string;
  technical: string;
  status: string;
  priority: number;
  type: number;
}

interface PropertiesTicketsStatus {
  id: number;
  name: string;
  count: number;
}

interface PropertiesTicketsType {
  id: number;
  name: string;
  count: number;
}

export interface PropsTicketsPendingResponse {
  meta: {
    total: number;
    last_ticket_id: number;
    last_ticket_date: string;
  };
  result: {
    list: PropertiesTicketsSchema[];
    priority: PropertiesTicketsStatus[];
    type: PropertiesTicketsType[];
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

export async function fetchTicketsPending(): Promise<PropsTicketsPendingResponse> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetchWithAuth(`${API_URL}/api/tickets/pendings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
