import { useQuery } from '@tanstack/react-query'
import { ArrowCircleLeft } from 'phosphor-react'
import { NavItem } from '../../components/Header/NavItem/NavItem'
import { getMonitoring } from '../../http/get-monitoring'
import dayjs from 'dayjs'

import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

export default function MonitoringTicket() {
  const { data } = useQuery({
    queryKey: ['monitoring'],
    queryFn: getMonitoring,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 5, // atualizar a cada 10 segundos
    refetchOnWindowFocus: true, // reconsultar quando a janela ganha foco
  })

  if (!data) {
    return null
  }

  const ticketFormattingCreatingNumbers = dayjs(data.date_creation).format(
    'DD/MM/YYYY HH:mm:ss',
  )

  const ticketFormattingCreatingString = dayjs(data.date_creation).format(
    'dddd, D [de] MMMM [de] YYYY',
  )

  const date = dayjs(data.date_creation)
  const ticketFormattingCreatingRelative = date.fromNow()

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
            <span className="text-orange-500">[{data ? data.id : null}]</span>
            Último Chamado
          </h2>
          <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
            Prioridade:
            <span className="text-blue-500">{data ? data.priority : null}</span>
          </p>
          <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
            Status:
            <span className="text-blue-500">{data ? data.status : null}</span>
          </p>
        </div>
        <div className="mb-8">
          <h1 className="mb-2 font-bold flex flex-col gap-2 text-5xl justify-center text-gray-600">
            {data ? data.firstname : null} {data ? data.realname : null}
          </h1>
          <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
            Local de Atendimento:{' '}
            <span className="text-orange-500">
              {data ? data.location : null}
            </span>
          </p>
          {/* <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
            Equipamento: <span className="text-orange-500">DSKSP139</span>
          </p> */}
        </div>
        <div>
          <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
            Título do Chamado:
            <span className="text-orange-500">{data ? data.title : null}</span>
          </p>
          <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
            Data de Criação:
            <span className="text-orange-500">
              {data ? ticketFormattingCreatingString : null}
            </span>
          </p>
          <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
            <span className="text-orange-500">
              {data ? ticketFormattingCreatingNumbers : null} (
              {data ? ticketFormattingCreatingRelative : null})
            </span>
          </p>
        </div>
      </main>
    </div>
  )
}
