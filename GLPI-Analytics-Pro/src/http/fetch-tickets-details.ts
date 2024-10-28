import { DetailsTicketsResponse } from '../@types/interface-monitoring'

export async function getDetailsTickets(): Promise<DetailsTicketsResponse> {
  const response = await fetch(
    'http://localhost:5000/api-glpi/tickets/tickets-line-time',
  )
  const data = await response.json()

  return data
}
