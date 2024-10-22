import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ArrowCircleLeft } from 'phosphor-react'
import { NavItem } from '../../components/Header/NavItem/NavItem'
import { getMonitoring } from '../../http/get-monitoring'

import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'
import { getDetailsTickets } from '../../http/get-details-tickets'

import { ListTicketsMonitoring } from './components/ListTicketsMonitoring'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

export default function MonitoringTicket() {
  const [currentTime, setCurrentTime] = useState(dayjs())

  const { data } = useQuery({
    queryKey: ['monitoring'],
    queryFn: getMonitoring,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 5, // 10 segundos
    refetchOnWindowFocus: true, // reconsultar janela em foco
  })

  const { data: ticketDetailsData, dataUpdatedAt } = useQuery({
    queryKey: ['details'],
    queryFn: getDetailsTickets,
    staleTime: 1000 * 300, // 5 minutos
    refetchInterval: 1000 * 10, // 20 minuto
    refetchOnWindowFocus: true,
  })

  const lastUpdatedTicketsDetails =
    dayjs(dataUpdatedAt).format(`DD/MM/YYYY HH:mm`)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (!data) {
    return null
  }

  if (!ticketDetailsData) {
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

      <main className="flex flex-col flex-grow overflow-hidden">
        {/* container último chamado */}
        <div className="flex flex-col flex-1 text-center justify-center bg-white border-b-orange-500">
          <h2 className="font-bold flex flex-row gap-2 text-4xl justify-center text-gray-600">
            <span className="text-orange-400">
              [{data ? data.id : messageWithoutData}]
            </span>
            Novo Chamado
          </h2>
          <div className="mt-4">
            <h1 className="mb-2 font-bold text-6xl text-orange-500">
              {data ? data.firstname : messageWithoutData}{' '}
              {data ? data.realname : messageWithoutData}
            </h1>
            {/* <p className="font-normal text-2xl text-gray-600">
              Status:{' '}
              <span className="font-semibold text-yellow-500">
                {data ? data.status : messageWithoutData}
              </span>
            </p> */}
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
                {data ? date.format('DD/MM/YYYY HH:mm') : messageWithoutData}
                {/* ({data ? date.fromNow() : messageWithoutData}) */}
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
        <section className="flex flex-col h-80 p-4 border-t-2">
          <h2 className="text-2xl font-light text-center p-2">
            Lista de Chamados
          </h2>

          <ListTicketsMonitoring dataTickets={ticketDetailsData} />

          <p className="text-sm font-mono text-end mt-1">
            <span className="font-bold underline">última atualização:</span>
            <span className="text-orange-600 ml-1">
              {lastUpdatedTicketsDetails}
            </span>
          </p>
        </section>
      </main>
    </div>
  )
}
