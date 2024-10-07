import type { MonitoringResponse } from '../@types/interface-monitoring'

export async function getMonitoring(): Promise<MonitoringResponse> {
  const response = await fetch('http://localhost:5000/api-glpi/tickets/last')
  const data = await response.json()

  return data
}
