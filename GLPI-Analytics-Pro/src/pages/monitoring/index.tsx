import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getMonitoring } from '../../http/get-monitoring'

import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getDetailsTickets } from '../../http/get-details-tickets'

import { FooterTicketsMonitoring } from './components/FooterTicketsMonitoring'
import { HeaderTicketsMonitoring } from './components/HeaderTicketsMonitoring'
import { ListTicketsMonitoring } from './components/ListTicketsMonitoring'
import { ViewTicketMonitoring } from './components/ViewTicketsMonitoring'

import { SpinnerLoadinIcon } from './SpinnerLoadingIcon'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

export default function TicketMonitoring() {
  const { data: ticketMonitoringData } = useQuery({
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

  return (
    <div className="h-screen flex flex-col">
      {/* returno / título / relógio + data */}
      <HeaderTicketsMonitoring />

      <main className="flex flex-col flex-grow overflow-hidden">
        {ticketMonitoringData ? (
          <ViewTicketMonitoring data={ticketMonitoringData} />
        ) : (
          <p className="flex flex-col flex-1 justify-center items-center  text-red-600">
            <SpinnerLoadinIcon />
          </p>
        )}

        <section className="flex flex-col h-80 p-4 border-t-2">
          <h2 className="text-2xl font-light text-center p-2">
            Últimos Chamados
          </h2>

          {/* Condicional para ticketDetailsData */}
          {ticketDetailsData ? (
            <>
              <ListTicketsMonitoring dataTickets={ticketDetailsData} />
              <FooterTicketsMonitoring timeCheckUpdate={dataUpdatedAt} />
            </>
          ) : (
            <p className="flex flex-row m-4 justify-center items-center text-yellow-600">
              <SpinnerLoadinIcon />
            </p>
          )}
        </section>
      </main>
    </div>
  )
}
