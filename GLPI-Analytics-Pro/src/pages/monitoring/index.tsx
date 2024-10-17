import { useQuery } from '@tanstack/react-query'
import { ArrowCircleLeft } from 'phosphor-react'
import { NavItem } from '../../components/Header/NavItem/NavItem'
import { getMonitoring } from '../../http/get-monitoring'
import dayjs from 'dayjs'

import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState, useEffect } from 'react'
import { getStatusColor } from '../../utils/monitoring-status-color'
// import { getDetailsTickets } from '../../http/get-details-tickets'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

const tickets = [
  {
    id: 2,
    name: 'Ana Clara',
    title: 'Reclamação: Falta de Acesso ao Sistema',
    local: 'Suporte',
    status: 'Alto',
  },
  {
    id: 3,
    name: 'Lucas Silva',
    title: 'Solicitação: Atualização de Software',
    local: 'Desenvolvimento',
    status: 'Médio',
  },
  {
    id: 4,
    name: 'Beatriz Oliveira',
    title: 'Problema: Impressora Não Funciona',
    local: 'Infraestrutura',
    status: 'Baixo',
  },
  {
    id: 5,
    name: 'Fernando Souza',
    title: 'Incidente: Queda de Internet',
    local: 'Rede',
    status: 'Muito alto',
  },
  {
    id: 6,
    name: 'Juliana Lima',
    title: 'Solicitação: Treinamento de Sistema',
    local: 'RH',
    status: 'Médio',
  },
  {
    id: 7,
    name: 'Roberto Alves',
    title: 'Reclamação: Falha no Suporte Técnico',
    local: 'Suporte',
    status: 'Alto',
  },
  {
    id: 8,
    name: 'Patrícia Gomes',
    title: 'Problema: Sistema Lento',
    local: 'TI',
    status: 'Muito alto',
  },
  {
    id: 9,
    name: 'Carlos Martins',
    title: 'Solicitação: Novo Equipamento',
    local: 'Infraestrutura',
    status: 'Médio',
  },
  {
    id: 10,
    name: 'Isabela Ferreira',
    title: 'Incidente: Acesso Indevido',
    local: 'Segurança',
    status: 'Crítico',
  },
]

export default function MonitoringTicket() {
  const [currentTime, setCurrentTime] = useState(dayjs())

  const { data } = useQuery({
    queryKey: ['monitoring'],
    queryFn: getMonitoring,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 5, // 10 segundos
    refetchOnWindowFocus: true, // reconsultar janela em foco
  })

  // const { details } = useQuery({
  //   queryKey: ['details'],
  //   queryFn: getDetailsTickets,
  //   staleTime: 1000 * 60,
  //   refetchInterval: 1000 * 10, // 20 minuto
  //   refetchOnWindowFocus: true, // reconsultar janela em foco
  // })
  // console.log(details)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (!data) {
    return null
  }

  const date = dayjs(data.date_creation)
  const messageWithoutData = '...'

  return (
    <div className="h-screen flex flex-col">
      {/* returno / título / relógio + data */}
      <header className="flex flex-row items-center gap-4 justify-between bg-orange-500 p-4 text-slate-100">
        <div className="mr-24">
          <NavItem icon={ArrowCircleLeft} route="/home" />
        </div>
        <h2 className="text-4xl font-medium">GLPI: MONITORAMENTO CHAMADOS</h2>
        {/* relógio */}
        <p className="flex flex-col items-end">
          <span className="text-base font-bold">
            {currentTime.format('DD/MM/YYYY')}
          </span>
          <span className="text-3xl font-semibold tabular-nums">
            {currentTime.format('HH:mm:ss')}
          </span>
        </p>
      </header>

      <main className="flex flex-col flex-grow">
        {/* container último chamado */}
        <div className="flex flex-col flex-1 text-center justify-center bg-white border-b-orange-500">
          <h2 className="font-bold flex flex-row gap-2 text-4xl justify-center text-gray-600">
            <span className="text-orange-400">
              [{data ? data.id : messageWithoutData}]
            </span>
            Último Chamado
          </h2>
          <div className="mt-4">
            <h1 className="mb-2 font-bold text-6xl text-orange-500">
              {data ? data.firstname : messageWithoutData}{' '}
              {data ? data.realname : messageWithoutData}
            </h1>
            <p className="font-normal text-2xl text-gray-600">
              Status:{' '}
              <span className="font-semibold text-yellow-500">
                {data ? data.status : messageWithoutData}
              </span>
            </p>
            <p className="font-normal text-2xl text-gray-600">
              Prioridade:{' '}
              <span className="font-semibold text-blue-500">
                {data ? data.priority : messageWithoutData}
              </span>
            </p>
            <p className="font-normal text-2xl text-gray-600">
              Local de Atendimento:{' '}
              <span className="font-semibold">
                {data ? data.location : messageWithoutData}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-2xl text-gray-600">
              {data ? data.title : messageWithoutData}
            </p>
            <p className="font-normal text-2xl text-gray-600">
              Data de Criação:
              <span className="text-gray-600 ml-2">
                {data ? date.format('DD/MM/YYYY HH:mm') : messageWithoutData} (
                {data ? date.fromNow() : messageWithoutData})
              </span>
              {/* <span className="text-gray-600 ml-2">
                {data
                  ? date.format('dddd, D [de] MMMM [de] YYYY')
                  : messageWithoutData}
              </span> */}
            </p>
            <p className="font-bold text-2xl text-gray-600"></p>
          </div>
        </div>

        {/* lista de chamados (altura fixa/scroll) */}
        <div className="border-t-2 p-4 shadow-lg h-80 overflow-y-auto flex flex-col">
          <div className="flex flex-row p-2 mb-4 bg-white items-center rounded-sm justify-between">
            <h2 className="text-2xl font-light">Últimas Chamadas</h2>
            <p className="text-sm font-mono">
              <span className="font-bold underline">última atualização:</span>
              <span className="text-orange-600 ml-1">05/10/2024 às 13h50</span>
            </p>
          </div>
          <table className="bg-white border-collapse">
            <thead className="bg-orange-500 text-white">
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
                  Local
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-center bg-gray-50">
              {tickets.map((ticket) => {
                return (
                  <tr
                    key={ticket.id}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 text-left text-sm">{ticket.id}</td>
                    <td className="py-3 px-4 text-left text-sm">
                      {ticket.name}
                    </td>
                    <td className="py-3 px-4 text-left text-sm">
                      {ticket.title}
                    </td>
                    <td className="py-3 px-4 text-left text-sm">
                      {ticket.local}
                    </td>
                    <td
                      className={`py-3 px-4 text-left text-sm font-semibold ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
