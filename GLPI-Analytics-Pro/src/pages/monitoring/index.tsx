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
    <div className="h-screen flex flex-col">
      <header className="flex flex-row items-center gap-4 justify-between bg-orange-500 p-4 text-slate-100">
        <NavItem icon={ArrowCircleLeft} route="/home" />
        <h2 className="text-4xl font-medium">MONITORAMENTO GLPI</h2>
        {/* relógio */}
        <p className="flex flex-col items-end">
          <span className="text-xs">{currentTime.format('DD/MM/YYYY')}</span>
          <span className="text-2xl font-semibold tabular-nums">
            {currentTime.format('HH:mm:ss')}
          </span>
        </p>
      </header>

      <main className="flex flex-col flex-grow">
        {/* container último chamado */}
        <div className="flex flex-col flex-1  text-center justify-center rounded-sm bg-white shadow-md">
          <h2 className="font-bold flex flex-row gap-2 text-3xl justify-center text-gray-600">
            <span className="text-orange-500">
              [{data ? data.id : messageWithoutData}]
            </span>
            Último Chamado
          </h2>
          <div className="mt-4">
            <h1 className="mb-2 font-bold text-5xl text-gray-600">
              {data ? data.firstname : messageWithoutData}{' '}
              {data ? data.realname : messageWithoutData}
            </h1>
            <p className="font-medium text-2xl text-gray-600">
              Status: <span>{data ? data.status : messageWithoutData}</span>
            </p>
            <p className="font-medium text-2xl text-gray-600">
              Prioridade:{' '}
              <span>{data ? data.priority : messageWithoutData}</span>
            </p>
            <p className="font-medium text-lg text-gray-600">
              Local de Atendimento:{' '}
              <span>{data ? data.location : messageWithoutData}</span>
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-xl text-gray-600">
              Título do Chamado:{' '}
              <span>{data ? data.title : messageWithoutData}</span>
            </p>
            <p className="font-bold text-xl text-gray-600">
              Data de Criação:
              <span className="text-gray-600">
                {data
                  ? date.format('dddd, D [de] MMMM [de] YYYY')
                  : messageWithoutData}
              </span>
            </p>
            <p className="font-bold text-xl text-gray-600">
              <span className="text-gray-600">
                {data ? date.format('DD/MM/YYYY HH:mm') : messageWithoutData} (
                {data ? date.fromNow() : messageWithoutData})
              </span>
            </p>
          </div>
        </div>

        {/* lista de chamados com altura fixa e scroll */}
        <div className="bg-zinc-200 p-4 shadow-md h-80 overflow-y-auto">
          <h2 className="bg-white text-2xl font-bold mb-4 ml-8 inline-flex p-1 rounded-lg">
            Últimas Chamadas
          </h2>
          <ul className="list-none">
            {/* Exemplo de item da lista */}
            <li className="mb-2 p-4 bg-white rounded shadow hover:bg-slate-100 transition duration-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">ID: 001</span>
              <span className="font-medium text-gray-600">
                Paciente: João Silva
              </span>
              <span className="font-medium text-gray-600">
                Título: Chamado de Teste
              </span>
              <span className="font-medium text-gray-600">
                Local: Financeiro
              </span>
              <span className="font-semibold text-green-500">
                Status: Concluído
              </span>
            </li>
            <li className="mb-2 p-4 bg-white rounded shadow hover:bg-slate-100 transition duration-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">ID: 002</span>
              <span className="font-medium text-gray-600">
                Paciente: Maria Oliveira
              </span>
              <span className="font-medium text-gray-600">
                Título: Erro no Sistema
              </span>
              <span className="font-medium text-gray-600">
                Local: Comercial
              </span>
              <span className="font-semibold text-yellow-500">
                Status: Em andamento
              </span>
            </li>
            <li className="mb-2 p-4 bg-white rounded shadow hover:bg-slate-100 transition duration-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">ID: 003</span>
              <span className="font-medium text-gray-600">
                Paciente: Pedro Lima
              </span>
              <span className="font-medium text-gray-600">
                Título: Solicitação de Acesso
              </span>
              <span className="font-medium text-gray-600">Local: TI</span>
              <span className="font-semibold text-red-500">
                Status: Pendente
              </span>
            </li>
            <li className="mb-2 p-4 bg-white rounded shadow hover:bg-slate-100 transition duration-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">ID: 003</span>
              <span className="font-medium text-gray-600">
                Paciente: Pedro Lima
              </span>
              <span className="font-medium text-gray-600">
                Título: Solicitação de Acesso
              </span>
              <span className="font-medium text-gray-600">Local: TI</span>
              <span className="font-semibold text-red-500">
                Status: Pendente
              </span>
            </li>
            <li className="mb-2 p-4 bg-white rounded shadow hover:bg-slate-100 transition duration-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">ID: 003</span>
              <span className="font-medium text-gray-600">
                Paciente: Pedro Lima
              </span>
              <span className="font-medium text-gray-600">
                Título: Solicitação de Acesso
              </span>
              <span className="font-medium text-gray-600">Local: TI</span>
              <span className="font-semibold text-red-500">
                Status: Pendente
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
