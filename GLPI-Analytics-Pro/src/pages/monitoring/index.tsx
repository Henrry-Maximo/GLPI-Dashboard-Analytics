import { useQuery } from '@tanstack/react-query'
import { ArrowCircleLeft } from 'phosphor-react'
import { NavItem } from '../../components/Header/NavItem/NavItem'
import { getMonitoring } from '../../http/get-monitoring'
import dayjs from 'dayjs'

import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState, useEffect } from 'react'

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
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row text-center items-center gap-4 justify-between bg-orange-500 p-4 text-slate-100">
        <NavItem icon={ArrowCircleLeft} route="/home" />
        <h2 className="text-4xl font-medium">Painel de Alerta</h2>
        {/* relógio */}
        <p className="flex flex-col items-end">
          <span className="text-xs">{currentTime.format('DD/MM/YYYY')}</span>
          <span className="text-2xl font-semibold tabular-nums">
            {currentTime.format('HH:mm:ss')}
          </span>
        </p>
      </header>
      <main className="bg-slate-100 flex flex-col flex-grow h-full justify-between">
        {/* container último chamado */}
        <div className="flex flex-col text-center p-16">
          <h2 className="font-bold flex flex-row gap-2 text-3xl justify-center text-gray-600">
            <span className="text-orange-500">
              [{data ? data.id : messageWithoutData}]
            </span>
            Último Chamado
          </h2>
          <div className="mt-4">
            <h1 className="mb-2 font-bold flex flex-col gap-2 text-5xl justify-center text-gray-600">
              {data ? data.firstname : messageWithoutData}{' '}
              {data ? data.realname : messageWithoutData}
            </h1>
            <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
              Status:
              <span className="text-yellow-500">
                {data ? data.status : messageWithoutData}
              </span>
            </p>
            <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
              Prioridade:
              <span className="text-blue-500">
                {data ? data.priority : messageWithoutData}
              </span>
            </p>
            <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
              Local de Atendimento:{' '}
              <span className="text-orange-500">
                {data ? data.location : messageWithoutData}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
              Título do Chamado:
              <span className="text-orange-500">
                {data ? data.title : messageWithoutData}
              </span>
            </p>
            <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
              Data de Criação:
              <span className="text-gray-600">
                {data
                  ? date.format('dddd, D [de] MMMM [de] YYYY')
                  : messageWithoutData}
              </span>
            </p>
            <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
              <span className="text-gray-600">
                {data ? date.format('DD/MM/YYYY HH:mm') : messageWithoutData} (
                {data ? date.fromNow() : messageWithoutData})
              </span>
            </p>
          </div>
        </div>
        {/* lista de chamados */}
        <div className="bg-zinc-200 text-gray-600 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 ml-8">
            ... [Lista de Chamados] ...
          </h2>
          <ul className="list-disc list-inside">
            <li className="mb-2 p-2 bg-orange-500 rounded hover:bg-slate-100 transition duration-200">
              Item 1
            </li>
            <li className="mb-2 p-2 bg-orange-500 rounded hover:bg-slate-100 transition duration-200">
              Item 2
            </li>
            <li className="mb-2 p-2 bg-orange-500 rounded hover:bg-slate-100 transition duration-200">
              Item 3
            </li>
            <li className="mb-2 p-2 bg-orange-500 rounded hover:bg-slate-100 transition duration-200">
              Item 4
            </li>
            <li className="mb-2 p-2 bg-orange-500 rounded hover:bg-slate-100 transition duration-200">
              Item 5
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
