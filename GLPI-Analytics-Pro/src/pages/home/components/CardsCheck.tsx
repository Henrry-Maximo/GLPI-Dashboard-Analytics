import { Card } from '@/components/Card/Card'
import {
  Bug,
  CheckCircle,
  Circle,
  CircleHalf,
  ClipboardText,
  Clock,
  Flame,
  Hourglass,
  ShieldCheck,
  UserCirclePlus,
  Warning,
  WarningCircle,
} from 'phosphor-react'

interface PropsStatusTickets {
  data: {
    tickets_total: number
    tickets_open: number
    tickets_assigned: number
    tickets_pending: number
    tickets_solved: number
    tickets_closed: number
  }
}

interface PropsPriorityAndTypeTickets {
  type: {
    incident: number
    request: number
  }

  data: {
    tickets_very_low: number
    tickets_low: number
    tickets_medium: number
    tickets_high: number
    tickets_very_high: number
  }
}

export function CardStatusTickets({ data }: PropsStatusTickets) {
  // https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
  // const arrayWithStatusFormatting = [];
  // for (let [key, value] of Object.entries(statusTicketsAmount)) {
  //   const formattedStatusOnObject = { status: key, value };
  //   arrayWithStatusFormatting.push(formattedStatusOnObject);
  // }

  return (
    <section className="mb-4">
      <div className="grid md:grid-cols-5 gap-4">
        <Card
          icon={Clock}
          quantity={data?.tickets_open}
          title="Chamados Abertos"
          className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
        />
        <Card
          icon={UserCirclePlus}
          quantity={data?.tickets_assigned}
          title="Chamados Atribuídos"
          className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2 border border-blue-500"
        />
        <Card
          icon={Hourglass}
          quantity={data?.tickets_pending}
          title="Chamados Pendentes"
          className="h-10 w-10 bg-orange-100 text-orange-500 rounded-md p-2 border border-orange-500"
        />
        <Card
          icon={CheckCircle}
          quantity={data?.tickets_solved}
          title="Chamados Solucionados"
          className="h-10 w-10 bg-green-200 text-green-600 rounded-md p-2 border border-green-500"
        />
        <Card
          icon={ShieldCheck}
          quantity={data?.tickets_closed}
          title="Chamados Fechados"
          className="h-10 w-10 bg-green-700 text-green-100 rounded-md p-2 border border-green-500"
        />
      </div>
    </section>
  )
}

export function CardPriorityAndTypeTickets({
  data,
  type,
}: PropsPriorityAndTypeTickets) {
  return (
    <section className="mb-4 flex gap-4">
      {/* <div className="h-auto border-l-4 border-orange-400 rounded-lg" /> */}

      {/* Cards de Prioridade */}
      <div className="grid md:grid-cols-5 gap-4 flex-grow">
        <Card
          icon={Circle}
          quantity={data?.tickets_very_low}
          title="Muito baixa"
          className="h-10 w-10 bg-blue-600 text-blue-100 rounded-md p-2 border border-blue-700"
        />
        <Card
          icon={CircleHalf}
          quantity={data?.tickets_low}
          title="Baixa"
          className="h-10 w-10 bg-blue-400 text-blue-100 rounded-md p-2 border border-blue-700"
        />
        <Card
          icon={WarningCircle}
          quantity={data?.tickets_medium}
          title="Média"
          className="h-10 w-10 bg-orange-400 text-orange-100 rounded-md p-2 border border-orange-500"
        />
        <Card
          icon={Warning}
          quantity={data?.tickets_high}
          title="Alta"
          className="h-10 w-10 bg-yellow-400 text-yellow-100 rounded-md p-2 border border-yellow-500"
        />
        <Card
          icon={Flame}
          quantity={data?.tickets_very_high}
          title="Muito Alta"
          className="h-10 w-10 bg-red-600 text-red-100 rounded-md p-2 border border-red-700"
        />
      </div>

      <div className="h-auto border-l-4 border-orange-400 rounded-lg" />

      {/* Cards de Requisição/Incidente */}
      <div className="flex gap-2">
        <Card
          icon={ClipboardText}
          quantity={type?.request}
          title="Requisição"
          className="size-10 bg-blue-600 text-blue-100 rounded-md p-2 border border-blue-700 flex-grow"
        />
        <Card
          icon={Bug}
          quantity={type?.incident}
          title="Incidente"
          className="size-10 bg-red-600 text-blue-100 rounded-md p-2 border border-red-700 flex-grow"
        />
      </div>
    </section>
  )
}
