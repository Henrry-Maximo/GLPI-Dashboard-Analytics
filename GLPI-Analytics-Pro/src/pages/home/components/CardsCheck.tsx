import { Card } from "@/components/Card/Card";
import {
  CheckCircle,
  Circle,
  CircleHalf,
  Clock,
  Flame,
  Hourglass,
  ShieldCheck,
  UserCirclePlus,
  Warning,
  WarningCircle,
  XCircle,
} from "phosphor-react";

interface PropsStatusTickets {
  data: {
    tickets_total: number;
    tickets_open: number;
    tickets_assigned: number;
    tickets_pending: number;
    tickets_solved: number;
    tickets_closed: number;
  };
}

interface PropsPriorityAndTypeTickets {
  data: {
    tickets_very_low: number;
		tickets_low: number;
		tickets_medium: number;
		tickets_high: number;
		tickets_very_high: number;
  };
}

export function CardStatusTickets({ data }: PropsStatusTickets) {
  return (
    <section className="mb-4">
      <div className="grid md:grid-cols-5 gap-4">
        <Card
          icon={Clock}
          quantity={data ? data.tickets_open : 0}
          title="Chamados Abertos"
          className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
        />
        <Card
          icon={UserCirclePlus}
          quantity={data ? data.tickets_assigned : 0}
          title="Chamados Atribuídos"
          className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2 border border-blue-500"
        />
        <Card
          icon={Hourglass}
          quantity={data ? data.tickets_pending : 0}
          title="Chamados Pendentes"
          className="h-10 w-10 bg-orange-100 text-orange-500 rounded-md p-2 border border-orange-500"
        />
        <Card
          icon={CheckCircle}
          quantity={data ? data.tickets_solved : 0}
          title="Chamados Solucionados"
          className="h-10 w-10 bg-green-200 text-green-600 rounded-md p-2 border border-green-500"
        />
        <Card
          icon={ShieldCheck}
          quantity={data ? data.tickets_closed : 0}
          title="Chamados Fechados"
          className="h-10 w-10 bg-green-700 text-green-100 rounded-md p-2 border border-green-500"
        />
      </div>
    </section>
  );
}

export function CardPriorityAndTypeTickets({ data }: PropsPriorityAndTypeTickets) {
  return (
    <section className="mb-4 flex gap-4">
        <div className="h-auto border-l-4 border-orange-400 rounded-lg" />

        {/* Cards de Prioridade */}
        <div className="grid md:grid-cols-5 gap-4 flex-grow">
          <Card
            icon={Circle}
            quantity={data?.tickets_very_low || 0}
            title="Muito baixa"
            className="h-10 w-10 bg-blue-600 text-blue-100 rounded-md p-2 border border-blue-700"
          />
          <Card
            icon={CircleHalf}
            quantity={data?.tickets_low || 0}
            title="Baixa"
            className="h-10 w-10 bg-blue-400 text-blue-100 rounded-md p-2 border border-blue-700"
          />
          <Card
            icon={WarningCircle}
            quantity={data?.tickets_medium || 0}
            title="Média"
            className="h-10 w-10 bg-orange-400 text-orange-100 rounded-md p-2 border border-orange-500"
          />
          <Card
            icon={Warning}
            quantity={data?.tickets_high || 0}
            title="Alta"
            className="h-10 w-10 bg-yellow-400 text-yellow-100 rounded-md p-2 border border-yellow-500"
          />
          <Card
            icon={Flame}
            quantity={data?.tickets_very_high || 0}
            title="Muito Alta"
            className="h-10 w-10 bg-red-600 text-red-100 rounded-md p-2 border border-red-700"
          />
        </div>

        {/* Separador */}
        <div className="h-auto border-l-4 border-orange-400 rounded-lg" />

        {/* Cards de Requisição/Incidente */}
        <div className="flex gap-2">
          <Card
            icon={CheckCircle}
            quantity={1565}
            title="Requisição"
            className="size-10 bg-blue-600 text-blue-100 rounded-md p-2 border border-blue-700 flex-grow"
          />
          <Card
            icon={XCircle}
            quantity={560}
            title="Incidente"
            className="size-10 bg-red-600 text-blue-100 rounded-md p-2 border border-red-700 flex-grow"
          />
        </div>
      </section>
  );
}
