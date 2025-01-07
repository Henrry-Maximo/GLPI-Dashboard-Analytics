("use client");

import {
  Clock,
  CheckCircle,
  ShieldCheck,
  Hourglass,
  UserCirclePlus,
} from "phosphor-react";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card as CardRoot,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// biome-ignore lint/style/useImportType: <explanation>
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useQuery } from "@tanstack/react-query";
import { fetchTicketsState } from "../../http/fetch-tickets-state";

import { Card } from "@/components/Card/Card";

// import { SettingsTabs } from '../../components/SettingsTabs'

interface TicketResponse {
  tickets_total: number;
  tickets_open: number;
  tickets_assigned: number;
  tickets_pending: number;
  tickets_solved: number;
  tickets_closed: number;
}

const ticketData = [
  { category: "Anfe", count: 7 },
  { category: "BI", count: 23 },
  { category: "Instalar Programas", count: 15 },
  { category: "Configuração", count: 12 },
  { category: "Criar Acesso", count: 75 },
  { category: "Liberar Acesso", count: 35 },
];

const chartConfig = {
  count: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const urgencyData = [
  { urgency: "Muito baixa", tickets: 6 },
  { urgency: "Baixa", tickets: 2 },
  { urgency: "Médio", tickets: 10 },
  { urgency: "Alta", tickets: 3 },
  { urgency: "Muito Alta", tickets: 0 },
];

const urgencyConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// const dataTicketsByCategory = [
//   { category_name: 'Anfe', tickets_count: 7 },
//   { category_name: 'BI', tickets_count: 23 },
//   { category_name: 'Instalar Programas', tickets_count: 15 },
//   { category_name: 'Falha na impressora', tickets_count: 10 },
//   { category_name: 'Criar Acesso', tickets_count: 75 },
// ]

// const dataTicketsByUrgency = [
//   { name: 'Muito Baixa', value: 0 },
//   { name: 'Baixa', value: 5 },
//   { name: 'Média', value: 12 },
//   { name: 'Alta', value: 20 },
//   { name: 'Muito Alta', value: 8 },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333']

export default function Home() {
  const { data } = useQuery({
    queryKey: ["state"],
    queryFn: fetchTicketsState,
    staleTime: 1000 * 60, // 1 minuto
    refetchInterval: 1000 * 5, // 10 segundos
    refetchOnWindowFocus: true,
  });

  const amountStatusTickets = data?.ticketsStateInDatabase[0];
  const nameUserAuth = sessionStorage.getItem("name");

  return (
    <main className="w-full h-[max-content]">
      {/* header */}
      <div className="flex flex-row bg-gray-50 justify-between mb-4 items-center py-2 px-2 rounded-md shadow-md">
        <h1 className="text-2xl font-light text-zinc-800">
          Dashboard Principal
        </h1>
        <span className="text-2 font-light text-zinc-800">
          Olá, {`${nameUserAuth}`}!
        </span>
      </div>

      {/* cards */}
      <section className="mb-4">
        <div className="grid md:grid-cols-5 gap-4">
          <Card
            icon={Clock}
            quantity={
              amountStatusTickets ? amountStatusTickets.tickets_open : 0
            }
            title="Chamados Abertos"
            className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
          />
          <Card
            icon={UserCirclePlus}
            quantity={
              amountStatusTickets ? amountStatusTickets.tickets_assigned : 0
            }
            title="Chamados Atribuídos"
            className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2 border border-blue-500"
          />
          <Card
            icon={Hourglass}
            quantity={
              amountStatusTickets ? amountStatusTickets.tickets_pending : 0
            }
            title="Chamados Pendentes"
            className="h-10 w-10 bg-orange-100 text-orange-500 rounded-md p-2 border border-orange-500"
          />
          <Card
            icon={CheckCircle}
            quantity={
              amountStatusTickets ? amountStatusTickets.tickets_solved : 0
            }
            title="Chamados Solucionados"
            className="h-10 w-10 bg-green-200 text-green-600 rounded-md p-2 border border-green-500"
          />
          <Card
            icon={ShieldCheck}
            quantity={
              amountStatusTickets ? amountStatusTickets.tickets_closed : 0
            }
            title="Chamados Fechados"
            className="h-10 w-10 bg-green-700 text-green-100 rounded-md p-2 border border-green-500"
          />
        </div>
      </section>

      {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      {/* Gráfico de Barras */}
      {/* <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Tickets por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataTicketsByCategory}>
              <XAxis
                dataKey="category_name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets_count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

      {/* Gráfico de Pizza */}
      {/* <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Tickets por Urgência</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataTicketsByUrgency}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dataTicketsByUrgency.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      {/* </section> */}

      <div className="flex gap-4">
        <CardRoot className="w-3/6 shadow-lg bg-gray-50">
          <CardHeader>
            <CardTitle>Chamados por Categoria</CardTitle>
            <CardDescription>
              Resumo das Categorias por Chamados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={ticketData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  tickMargin={2}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value.length > 10 ? `${value.slice(0, 10)}...` : value
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="count" fill="var(--color-tickets)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 12.3% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing ticket counts for major categories
            </div>
          </CardFooter>
        </CardRoot>

        <CardRoot className="w-3/6 shadow-lg bg-gray-50">
          <CardHeader>
            <CardTitle>Chamados Por Urgência</CardTitle>
            <CardDescription>Resumo dos Chamados Por Urgência</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={urgencyConfig}>
              <BarChart accessibilityLayer data={urgencyData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="urgency"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="tickets" fill="var(--color-tickets)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 3% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing tickets distributed by urgency
            </div>
          </CardFooter>
        </CardRoot>
      </div>

      {/* <section className="grid-cols-3 gap-4 grid">
        <CardGraph title="Chamados por Ano" />
        <CardPie title="Chamados por Urgência" />
      </section>

      <section className="grid-cols-3 gap-4 grid mt-4">
        <CardPie title="Chamados por Urgência" />
        <CardGraph title="Chamados por Ano" />
      </section> */}
    </main>
  );
}
