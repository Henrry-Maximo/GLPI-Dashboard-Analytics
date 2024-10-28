type PropsTicketsStateStatus = [
  {
    tickets_total: number
    tickets_open: number
    tickets_assigned: number
    tickets_pending: number
    tickets_solved: number
    tickets_closed: number
  },
]

type PropsTicketsStateUrgency = [
  {
    tickets_very_low: number
    tickets_low: number
    tickets_medium: number
    tickets_high: number
    tickets_very_high: number
  },
]

type PropsTicketsStateCategories = [
  {
    tickets_total: number
    tickets_open: number
    tickets_assigned: number
    tickets_pending: number
    tickets_solved: number
    tickets_closed: number
  },
]

type PropsTicketsState =
  | PropsTicketsStateStatus
  | PropsTicketsStateUrgency
  | PropsTicketsStateCategories

export async function fetchTicketsState(): Promise<PropsTicketsState> {
  const response = await fetch('http://localhost:5000/api-glpi/tickets/state')
  const data = await response.json()

  return data
}
