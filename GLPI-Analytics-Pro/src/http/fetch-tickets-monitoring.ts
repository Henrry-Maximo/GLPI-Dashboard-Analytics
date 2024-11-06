import { DetailsMonitoringResponse } from '../@types/interface-monitoring'

export async function fetchTicketsMonitoring(): Promise<DetailsMonitoringResponse> {
  const response = await fetch('http://localhost:5000/api-glpi/tickets/last')
  const data = await response.json()

  return data
}