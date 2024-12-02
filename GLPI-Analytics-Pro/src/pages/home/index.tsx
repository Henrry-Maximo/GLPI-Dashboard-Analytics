import {
  Clock,
  CheckCircle,
  ShieldCheck,
  Hourglass,
  UserCirclePlus,
} from 'phosphor-react'

import { Card } from '../../components/Card/Card'
import { CardGraph } from '../../components/CardGraph/CardGraph'
import { CardPie } from '../../components/CardPie/CardPie'
import { useEffect, useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { fetchTicketsState } from '../../http/fetch-tickets-state'

// import { SettingsTabs } from '../../components/SettingsTabs'

interface TicketResponse {
  tickets_total: number
  tickets_open: number
  tickets_assigned: number
  tickets_pending: number
  tickets_solved: number
  tickets_closed: number
}

export default function Home() {
  const [tickets, setTickets] = useState<TicketResponse[]>([])
  useEffect(() => {
    fetch('http://10.10.2.93:5000/api-glpi/tickets/state')
      .then((response) => {
        return response.json()
      })
      .then((data: TicketResponse[]) => {
        setTickets(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  // const { data } = useQuery({
  //   queryKey: ['state'],
  //   queryFn: fetchTicketsState,
  //   staleTime: 1000 * 60, // 1 minuto
  //   refetchInterval: 1000 * 5, // 10 segundos
  //   refetchOnWindowFocus: true,
  // })

  const ticket = tickets[0]

  if (!ticket) {
    return null
  }

  return (
    <main className="w-full h-[max-content]">
      <div className="flex flex-row bg-gray-50 justify-between mb-4 items-center py-2 px-2 rounded-md shadow-sm">
        <h1 className="text-2xl font-light text-zinc-800">
          Dashboard Principal
        </h1>
        <span className="text-2 font-light text-zinc-800">Olá, Henrique!</span>
      </div>

      <section className="mb-4">
        <div className="grid md:grid-cols-5 gap-4">
          <Card
            icon={Clock}
            quantity={ticket && ticket.tickets_open}
            title="Chamados Abertos"
            className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
          />
          <Card
            icon={UserCirclePlus}
            quantity={ticket && ticket.tickets_assigned}
            title="Chamados Atribuídos"
            className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2 border border-blue-500"
          />
          <Card
            icon={Hourglass}
            quantity={ticket && ticket.tickets_pending}
            title="Chamados Pendentes"
            className="h-10 w-10 bg-orange-100 text-orange-500 rounded-md p-2 border border-orange-500"
          />
          <Card
            icon={CheckCircle}
            quantity={ticket && ticket.tickets_solved}
            title="Chamados Solucionados"
            className="h-10 w-10 bg-green-200 text-green-600 rounded-md p-2 border border-green-500"
          />
          <Card
            icon={ShieldCheck}
            quantity={ticket && ticket.tickets_closed}
            title="Chamados Fechados"
            className="h-10 w-10 bg-green-700 text-green-100 rounded-md p-2 border border-green-500"
          />
        </div>
      </section>

      <section className="grid-cols-3 gap-4 grid">
        <CardGraph title="Chamados por Ano" />
        <CardPie title="Chamados por Urgência" />
      </section>

      <section className="grid-cols-3 gap-4 grid mt-4">
        <CardPie title="Chamados por Urgência" />
        <CardGraph title="Chamados por Ano" />
      </section>
    </main>
  )
}
