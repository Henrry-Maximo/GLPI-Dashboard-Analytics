import { fetchWithAuth } from './middlewares/verify-jwt-authenticate'

type fetchTicketsTechnicianResponse = {
  ticketsAmountTechnician: [
    {
      technician: string
      quantity_tickets: number
    },
  ]
  ticketsAmountTechnicianSolution: [
    {
      technician: string
      group: string
      count: number
    },
  ]
}

export async function fetchTicketsTechnician(): Promise<fetchTicketsTechnicianResponse> {
  const API_URL = import.meta.env.VITE_API_URL

  const response = await fetchWithAuth(
    `${API_URL}/api/tickets/tickets-technician`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const result = await response.json()

  return result
}
