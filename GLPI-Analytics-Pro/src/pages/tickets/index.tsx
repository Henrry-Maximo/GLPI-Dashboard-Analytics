import type { Ticket } from '@/@types/interface-tickets'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchTicketsAll } from '@/http/fetch-tickets-all'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CircleNotch, WarningCircle } from 'phosphor-react'

export default function Tickets() {
  const statusTicketsOperation = [
    { 
      status: "Novo", className: "bg-green-100 text-green-700" },
    { 
      status: "Pendente", className: "bg-yellow-100 text-yellow-700" },
    { 
      status: "Em Atendimento (atribuído)", className: "bg-blue-100 text-blue-700" },
    { 
      status: "Em Atendimento (planejado)", className: "bg-pink-100 text-pink-700" },
    { 
      status: "Fechado", className: "bg-gray-200 text-gray-700" },
    { 
      status: "Solucionado", className: "bg-green-500 text-white" },
  ];

  const priorityTicketsOperations = [
    {
      priority: "Muito alta", className: "bg-red-600 text-red-100",
    },
    {
      priority: "Alta", className: "bg-red-500 text-red-100",
    },
    {
      priority: "Média", className: "bg-orange-500 text-red-100",
    },
    {
      priority: "Baixa", className: "bg-blue-600 text-red-100",
    },
    {
      priority: "Muito baixa", className: "bg-blue-400 text-red-100",
    },
  ]

  const { data, isLoading, isError } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: fetchTicketsAll,
    staleTime: 1000 * 300, // 5 minutos
    refetchInterval: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: true, // reconsultar janela em foco
  })

  if (isLoading) {
    return (
      <p
        className="flex flex-col flex-1 justify-center items-center  
  text-red-600"
      >
        <CircleNotch className="text-zinc-800 animate-spin size-10" />
      </p>
    )
  }

  if (isError) {
    return (
      <p className="flex flex-col flex-1 justify-center items-center m-auto animate-pulse">
        <WarningCircle className="text-zinc-800 size-10" />
        Erro ao carregar os chamados.
      </p>
    )
  }

  return (
    <section className="w-full space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-700">
          Gerenciamento de Chamadas
        </h1>
        <p className="text-gray-600 mt-2">
          Acompanhe todos os chamadas abertos, em andamento e resolvidos.
        </p>
      </header>

      <ScrollArea className="h-[calc(95vh-200px)] border rounded-md bg-gray-100">
        <ul className="divide-y divide-gray-300">
          {data?.map(data => (
            <li
              key={data.id}
              className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h2 className="font-semibold text-lg text-slate-800">
                  {data.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Requerente: {data.applicant} | Técnico: {data.technical}
                </p>
                <p className="text-xs text-gray-400">
                  Criado em: {data.date_creation} ({dayjs(data.date_creation).fromNow()})
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  // className={`${
                  //   data.status === "Pendente"
                  //     ? "bg-yellow-100 text-yellow-700"
                  //     : data.status === "Resolvido"
                  //     ? "bg-green-100 text-green-700"
                  //     : "bg-gray-100 text-gray-700"
                  // }`}
                  className={`${
                    statusTicketsOperation.find((item) => item.status === data.status)?.className || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {data.status}
                </Badge>

                <Badge
                  variant="outline"
                  className={`${
                    priorityTicketsOperations.find((row) => row.priority === data.priority)?.className || "bg-gray-100 text-gray-700"
                  }`}
                  // className={`${
                  //   data.priority === "Alta"
                  //     ? "bg-red-100 text-red-700"
                  //     : data.priority === "Média"
                  //     ? "bg-orange-100 text-orange-700"
                  //     : "bg-blue-100 text-blue-700"
                  // }`}
                >
                  {data.priority}
                </Badge>
                {data.location ? (<Badge
                  variant="outline"
                >
                  {data.location}
                </Badge>) : (null)}
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  )
}
