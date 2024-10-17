import { DetailsTickets } from '../@types/interface-details-tickets'

export async function getDetailsTickets(): Promise<DetailsTickets> {
  const response = await fetch(
    'http://10.10.2.93:5000/api-glpi/tickets/tickets-line-time',
  )
  const data = await response.json()

  return data
}
