import { ArrowCircleLeft } from 'phosphor-react'
import { NavItem } from '../../components/Header/NavItem/NavItem'
import { useEffect, useState } from 'react'

interface TicketResponse {
  id: number
  title: string
  date_creation: string
  status: string
  priority: string
  location: string
  firstname: string
  realname: string
}

export default function MonitoringTicket() {
  const [ticketLastData, setTicketLastData] = useState<TicketResponse[]>([])
  useEffect(() => {
    fetch('http://192.168.0.101:5000/api-glpi/ticket/last')
      .then((response) => {
        return response.json()
      })
      .then((data: TicketResponse[]) => {
        setTicketLastData(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const ticket = ticketLastData[0]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row text-center items-center gap-4 justify-between bg-orange-500 p-4 text-slate-100">
        <div className="">
          <NavItem icon={ArrowCircleLeft} route="/home" />
        </div>
        <h2 className="text-3xl font-medium">Painel de Alerta</h2>
        <p className="flex flex-col">
          <span className="text-xs">01/07/2024</span>
          <span className="text-2xl font-semibold">14:37:51</span>
        </p>
      </header>
      <main className="bg-slate-100 flex flex-col flex-grow h-full text-center justify-center">
        <div className="mb-8">
          <h2 className="font-bold flex flex-row gap-2 text-3xl justify-center text-gray-600">
            <span className="text-orange-500">
              [{ticket ? ticket.id : null}]
            </span>
            Último Chamado
          </h2>
          <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
            Prioridade:
            <span className="text-blue-500">
              {ticket ? ticket.priority : null}
            </span>
          </p>
          <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
            Status:
            <span className="text-blue-500">
              {ticket ? ticket.status : null}
            </span>
          </p>
        </div>
        <div className="mb-8">
          <h1 className="mb-2 font-bold flex flex-col gap-2 text-5xl justify-center text-gray-600">
            {ticket ? ticket.firstname : null} {ticket ? ticket.realname : null}
          </h1>
          <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
            Local de Atendimento:{' '}
            <span className="text-orange-500">
              {ticket ? ticket.location : null}
            </span>
          </p>
          {/* <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
            Equipamento: <span className="text-orange-500">DSKSP139</span>
          </p> */}
        </div>
        <div>
          <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
            Descrição do Chamado:
            <span className="text-orange-500">
              {ticket ? ticket.title : null}
            </span>
          </p>
          <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
            Data de Criação:
            <span className="text-orange-500">
              {ticket ? ticket.date_creation : null}
            </span>
          </p>
        </div>
      </main>
    </div>
  )
}
