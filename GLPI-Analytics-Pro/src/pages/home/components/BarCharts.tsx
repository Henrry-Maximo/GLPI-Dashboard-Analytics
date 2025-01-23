import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardRoot,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

// const ticketData = [
//   { category: "Anfe", count: 7 },
//   { category: "BI", count: 23 },
//   { category: "Instalar Programas", count: 15 },
//   { category: "Configuração", count: 12 },
//   { category: "Criar Acesso", count: 75 },
//   { category: "Liberar Acesso", count: 35 },
// ];
// const chartData = [
//   { browser: "Amanda", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "Natalha", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "Karina", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "Priscila", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ];
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
// const chartConfigPie = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333']

const urgencyData = [
  { urgency: "Muito baixa", tickets: 30 },
  { urgency: "Baixa", tickets: 120 },
  { urgency: "Médio", tickets: 523 },
  { urgency: "Alta", tickets: 340 },
  { urgency: "Muito Alta", tickets: 90 },
];

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

interface PropsBarChartsTickets {
  priority: {
    tickets_very_low: number;
    tickets_low: number;
    tickets_medium: number;
    tickets_high: number;
    tickets_very_high: number;
  };
  categorie: [
    {
      completename: string;
      count: number;
    }
  ];
  concludes: [
    {
      date_creation: string;
      status: string;
      count: number;
    }
  ];
  delayed: [
    {
      id: number;
      date_creation: string;
      time_to_resolve: string;
      status: number;
      name: string;
    }
  ];
  technician: {
    ticketsAmountTechnician: [
      {
        technician: string;
        quantity_tickets: number;
      }
    ];
    ticketsAmountTechnicianSolution: [
      {
        technician: string;
        group: string;
        count: number;
      }
    ];
  };
}

export function BarChartsTickets({
  categorie,
  priority,
  concludes,
  delayed,
  technician,
}: PropsBarChartsTickets) {
  // associando a uma chave para uso posterior
  const transformedData = [
    { urgency: "Muito Baixa", tickets: priority.tickets_very_low },
    { urgency: "Baixa", tickets: priority.tickets_low },
    { urgency: "Média", tickets: priority.tickets_medium },
    { urgency: "Alta", tickets: priority.tickets_high },
    { urgency: "Muito Alta", tickets: priority.tickets_very_high },
  ];

  const chartConfig = {
    tickets: {
      label: "chamados",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const totalTickets = React.useMemo(
    () => concludes.reduce((acc, curr) => acc + curr.count, 0),
    []
  );

  const dataTicketsTechnicianSolution =
    technician.ticketsAmountTechnicianSolution;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <CardRoot className="shadow-lg bg-gray-50">
          <CardHeader>
            <CardTitle>Chamados por Categoria</CardTitle>
            <CardDescription>
              Resumo das Categorias por Chamados
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={categorie}>
                <CartesianGrid vertical={true} />

                <XAxis
                  dataKey="completename" // rotular pontos no eixo
                  tickLine={false} // corta-os e adiciona `...`
                  tickMargin={10} // Adiciona margem aos rótulos
                  axisLine={false} // Remove a linha do eixo
                  tickFormatter={
                    (value) =>
                      value.length > 10 ? `${value.slice(0, 10)}...` : value // Encurta rótulos longos
                  }
                />

                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent indicator="line" />}
                />

                <Bar
                  dataKey="amount" // Usa "count" para definir altura das barras
                  fill="var(--color-tickets)" // Cor dinâmica do chartConfig
                  radius={4} // Borda arredondada nas barras
                >
                  <LabelList
                    dataKey="amount" // Adicionado dataKey para mostrar os valores
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
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
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={transformedData}>
                <CartesianGrid vertical={true} />

                <XAxis
                  dataKey="urgency" // Usa "urgency" como rótulo
                  tickLine={false} // Remove linhas menores
                  tickMargin={10}
                  axisLine={true} // Remove a linha do eixo
                />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="tickets" fill="var(--color-tickets)" radius={4}>
                  <LabelList
                    dataKey="tickets" // Adicionado dataKey para mostrar os valores
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
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
            <CardTitle>Chamados Solucionados por Técnico</CardTitle>
            <CardDescription>Total de Chamados por Técnico</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigLabel}>
              <BarChart
                accessibilityLayer
                data={dataTicketsTechnicianSolution}
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
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="count"
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
                    dataKey="count"
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

        <CardRoot className="shadow-lg bg-gray-50 ">
          <CardHeader>
            <CardTitle>Chamados Atrasados</CardTitle>
            <CardDescription>Resumo dos Chamados Por Atraso</CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={delayed}
                margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date_creation"
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })
                  }
                />
                <ChartTooltip
                  cursor={true}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const { date_creation, name, status, time_to_resolve } =
                        payload[0].payload;

                      return (
                        <div className="bg-white p-2 rounded shadow-md text-sm">
                          <p>
                            <strong>Data de Criação:</strong>{" "}
                            {new Date(date_creation).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p>
                            <strong>Prazo de Resolução:</strong>{" "}
                            {new Date(time_to_resolve).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p>
                            <strong>Nome:</strong> {name}
                          </p>
                          <p>
                            <strong>Status:</strong> {status}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  dataKey="id"
                  fill="var(--color-tickets)"
                  fillOpacity={0.4}
                  stroke="#d36d00"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Exibir chamados atrasados quanto ao prazo do SLA.
            </div>
          </CardFooter>
        </CardRoot>
      </div>

      <CardRoot>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Chamados Fechados</CardTitle>
            <CardDescription>
              Exibindo o total de chamados fechados por dia
            </CardDescription>
          </div>
          <div className="flex">
            <button
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              data-active={true}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig.tickets.label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {totalTickets}
              </span>
            </button>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={concludes.map((d) => ({
                date: new Date(d.date_creation).toISOString(),
                count: d.count,
              }))}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={true}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="count"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="count" fill="var(--color-tickets)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </CardRoot>

      {/* <CardRoot className="grid shadow-lg bg-gray-50 w-1/4">
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
                  data={priorityTicketsAmount}
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
        </CardRoot> */}

      {/* <CardRoot className="grid shadow-lg bg-gray-50 w-1/4">
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
        </CardRoot> */}
    </div>
  );
}
