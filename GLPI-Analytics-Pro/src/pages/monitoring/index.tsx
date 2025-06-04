import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import ptBR from 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

import { FooterTicketsMonitoring } from './components/FooterTicketsMonitoring';
import { HeaderTicketsMonitoring } from './components/HeaderTicketsMonitoring';
import { ListTicketsMonitoring } from './components/ListTicketsMonitoring';
import { ViewTicketMonitoring } from './components/ViewTicketsMonitoring';

import { fetchDetailsTickets } from '../../http/fetch-tickets-details';
import { fetchTicketsMonitoring } from '../../http/fetch-tickets-monitoring';
import { SpinnerBall, CircleNotch } from '@phosphor-icons/react';

dayjs.locale(ptBR);
dayjs.extend(relativeTime);

export const Monitoring = () => {
  const { data: ticketMonitoringData } = useQuery({
    queryKey: ['monitoring'],
    queryFn: fetchTicketsMonitoring,
    staleTime: 1000 * 60, // 1 minuto
    refetchInterval: 1000 * 5, // 10 segundos
    refetchOnWindowFocus: true,
  });

  const { data: ticketDetailsData, dataUpdatedAt } = useQuery({
    queryKey: ['details'],
    queryFn: fetchDetailsTickets,
    staleTime: 1000 * 300, // 5 minutos (dados fresco antes de serem buscados)
    refetchInterval: 1000 * 60, // 1 minuto (refaz a requisição)
    refetchOnWindowFocus: true, // reconsultar janela em foco
  });

  return (
    <div className="h-screen flex flex-col">
      {/* retorno / título / relógio + data */}
      <HeaderTicketsMonitoring />

      <main className="flex flex-col flex-grow overflow-hidden">
        {ticketMonitoringData ? (
          <ViewTicketMonitoring data={ticketMonitoringData} />
        ) : (
          <p
            className="flex flex-col flex-1 justify-center items-center  
          text-red-600"
          >
            <CircleNotch className="text-zinc-800 animate-spin size-10" />
          </p>
        )}

        <section className="flex flex-col h-80 p-4 border-t-2 bg-white">
          <h2 className="text-2xl font-normal text-center p-2">
            Últimos Chamados
          </h2>

          {/* Condicional para ticketDetailsData */}
          {ticketDetailsData ? (
            <>
              <ListTicketsMonitoring dataTickets={ticketDetailsData} />
              <FooterTicketsMonitoring timeCheckUpdate={dataUpdatedAt} />
            </>
          ) : (
            <p
              className="flex flex-row m-4 justify-center items-center 
            text-yellow-600"
            >
              <SpinnerBall className="text-zinc-800 animate-spin size-10" />
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
