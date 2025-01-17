("use client");

import {
  ChartLine,
  CheckCircle,
  Clock,
  Hourglass,
  ShieldCheck,
  UserCirclePlus,
} from "phosphor-react";

import { useQuery } from "@tanstack/react-query";
import { fetchTicketsState } from "../../http/fetch-tickets-state";

import { Card } from "@/components/Card/Card";
// import { SettingsTabs } from '../../components/SettingsTabs'

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardRoot,
  CardTitle,
} from "@/components/ui/card";
// biome-ignore lint/style/useImportType: <explanation>
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

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

const chartConfigPie = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const urgencyData = [
  { urgency: "Muito baixa", tickets: 30 },
  { urgency: "Baixa", tickets: 120 },
  { urgency: "Médio", tickets: 523 },
  { urgency: "Alta", tickets: 340 },
  { urgency: "Muito Alta", tickets: 90 },
];

const chartData = [
  { browser: "Amanda", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "Natalha", visitors: 200, fill: "var(--color-safari)" },
  { browser: "Karina", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "Priscila", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const urgencyConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const chartDataLabel = [
  { technician: "Washington.Dantas", tickets: 186 },
  { technician: "Henrique.Maximo", tickets: 305 },
  { technician: "Bruno.Camargo", tickets: 237 },
  { technician: "Luis.Santos", tickets: 73 },
];
const chartConfigLabel = {
  tickets: {
    label: "tickets",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
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

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <main className="w-full h-[max-content] mt-6">
      {/* header */}
      <div className="flex flex-row bg-gray-50 justify-between mb-4 items-center py-2 px-2 rounded-md shadow-md">
        <h1 className="text-2xl font-light text-zinc-800 flex gap-2 items-center">
          <ChartLine size={30} />
          Dashboard
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

      <div className="grid grid-cols-2 gap-4">
        <CardRoot className="shadow-lg bg-gray-50">
          <CardHeader>
            <CardTitle>Chamados por Categoria</CardTitle>
            <CardDescription>
              Resumo das Categorias por Chamados
            </CardDescription>
            {/* 
            <DropdownMenu>
              <DropdownMenuTrigger>...</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
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
            <div className="leading-none text-muted-foreground">
              Mostrar contagem de chamados por categoria
            </div>
          </CardFooter>
        </CardRoot>

        <CardRoot className="shadow-lg bg-gray-50">
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
            <div className="leading-none text-muted-foreground">
              Mostrar chamados distribuidos por urgência.
            </div>
          </CardFooter>
        </CardRoot>

        <CardRoot>
          <CardHeader>
            <CardTitle>Chamados por Técnico</CardTitle>
            <CardDescription>Total de Chamados por Técnico</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigLabel}>
              <BarChart
                accessibilityLayer
                data={chartDataLabel}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="technician"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="tickets" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="tickets"
                  layout="vertical"
                  fill="var(--color-tickets)"
                  radius={4}
                >
                  <LabelList
                    dataKey="technician"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="tickets"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Mostrar total de chamados atribuídos por técnico
            </div>
          </CardFooter>
        </CardRoot>
      </div>

      {/* <div className="flex gap-4 mt-6">
        <CardRoot className="shadow-lg bg-gray-50 w-1/2">
          <CardHeader>
            <CardTitle>Chamados Atrasados</CardTitle>
            <CardDescription>Resumo dos Chamados Por Atraso</CardDescription>
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
            <div className="leading-none text-muted-foreground">
              Exibir chamados atrasados quanto ao prazo do SLA.
            </div>
          </CardFooter>
        </CardRoot>

        <CardRoot className="grid shadow-lg bg-gray-50 w-1/4">
          <CardHeader className="items-center pb-0">
            <CardTitle>Últimos Chamados</CardTitle>
            <CardDescription>Período Completo</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigPie}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Usuários
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Exibir últimos 10 chamados por categoria.
            </div>
          </CardFooter>
        </CardRoot>

        <CardRoot className="grid shadow-lg bg-gray-50 w-1/4">
          <CardHeader className="items-center pb-0">
            <CardTitle className="flex items-center gap-2">
              Chamados Por Usuários
              <div className="flex flex-row items-center justify-between">
                <DotsThree
                  size={24}
                  className="hover:text-orange-500 hover:bg-white p-1 cursor-pointer rounded-xl border border-transparent hover:border-orange-400 transition duration-300 ease-in-out"
                />
              </div>
            </CardTitle>
            <CardDescription>Período Completo</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigPie}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Usuários
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Exibir quantiade de chamados por usuários.
            </div>
          </CardFooter>
        </CardRoot>
      </div> */}

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
