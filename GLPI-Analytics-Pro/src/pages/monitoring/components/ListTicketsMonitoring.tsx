import { getStatusColor } from '../../../utils/monitoring-status-color'

interface Ticket {
  id: number
  applicant: string
  title: string
  status: string
  technical: string
  location: string
  priority: string
}

interface PropsListTickets {
  dataTickets: Ticket[]
}

export function ListTicketsMonitoring({ dataTickets }: PropsListTickets) {
  return (
    <div className="mt-2 overflow-y-auto">
      <table className="bg-white border-separate w-full">
        <thead className="bg-orange-500 text-white sticky top-0 left-0 right-0">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              ID
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              Requerente
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              Título
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              Status
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              Técnico
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              Local
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
              Urgência
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 font-light">
          {dataTickets.map((ticket) => {
            return (
              <tr
                key={ticket.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-4 text-left text-sm">{ticket.id}</td>
                <td className="py-3 px-4 text-left text-sm">
                  {ticket.applicant}
                </td>
                <td className="py-3 px-4 text-left text-sm">{ticket.title}</td>
                <td className="py-3 px-4 text-left text-sm">{ticket.status}</td>
                <td className="py-3 px-4 text-left text-sm">
                  {ticket.technical}
                </td>
                <td className="py-3 px-4 text-left text-sm">
                  {ticket.location}
                </td>
                <td
                  className={`py-3 px-4 text-left text-sm font-semibold ${getStatusColor(ticket.priority)}`}
                >
                  {ticket.priority}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
