import { CardRoot } from '@/components/Card/Card';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, XAxis, Bar, LabelList, BarChart } from 'recharts';

interface StatusType {
  tickets_total: number;
  tickets_open: number;
  tickets_assigned: number;
  tickets_pending: number;
  tickets_solved: number;
  tickets_closed: number;
}

interface PriorityType {
  tickets_very_low: number;
  tickets_low: number;
  tickets_medium: number;
  tickets_high: number;
  tickets_very_high: number;
}

interface CategorieType {
  completename: string;
  count: number;
}

interface ConcludesType {
  date_creation: string;
  status: string;
  count: number;
}

interface DelayedType {
  id: number;
  date_creation: string;
  time_to_resolve: string;
  status: number;
  name: string;
}

interface BarChartsTicketsProps {
  priority: PriorityType;
  status: StatusType;
  categorie: CategorieType[];
  concludes: ConcludesType[];
  delayed: DelayedType[];
}

export function BarChartsTickets({
  priority,
  categorie,
  concludes,
  delayed,
}: BarChartsTicketsProps) {
  const [summary, setSummary] = useState<PriorityType>(priority);

  useEffect(() => {
    setSummary(priority);
  }, [priority]);

  if (!summary) {
    return 'Carregando...';
  }

  // associando a uma chave para uso posterior
  const transformedData = [
    { urgency: 'Muito Baixa', tickets: summary.tickets_very_low },
    { urgency: 'Baixa', tickets: summary.tickets_low },
    { urgency: 'Média', tickets: summary.tickets_medium },
    { urgency: 'Alta', tickets: summary.tickets_high },
    { urgency: 'Muito Alta', tickets: summary.tickets_very_high },
  ];

  // const chartConfigLabel = {
  //   tickets: {
  //     label: 'tickets',
  //     color: 'hsl(var(--chart-1))',
  //   },
  //   label: {
  //     color: 'hsl(var(--background))',
  //   },
  // } satisfies ChartConfig;

  const chartConfig = {
    tickets: {
      label: 'chamados',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  const totalTickets = React.useMemo(
    () => concludes.reduce((acc, curr) => acc + curr.count, 0),
    [concludes]
  );

  // const dataTicketsTechnicianSolution =
  // 	technician.ticketsAmountTechnicianSolution;

  return (
    <div className="flex flex-col gap-4 h-screen">
      <div className="grid grid-cols-2 gap-4 ">
        <Card>
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
                type="button"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig.tickets.label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {totalTickets}
                </span>
              </button>

              {/* <div
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              data-active={true}
            >
              <span className="text-xs text-muted-foreground">média</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                55%
              </span>
            </div> */}
            </div>
          </CardHeader>

          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={concludes.map(d => ({
                  date: new Date(d.date_creation).toISOString(),
                  count: d.count,
                }))}
                margin={{
                  left: 4,
                  right: 4,
                }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={value => {
                    const date = new Date(value);
                    return date.toLocaleDateString('pt-br', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="count"
                      labelFormatter={value => {
                        return new Date(value).toLocaleDateString('pt-br', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        });
                      }}
                    />
                  }
                />
                <Bar dataKey="count" fill="var(--color-tickets)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <section className="bg-white flex flex-col shadow-sm h-[25rem]">
          <header className="bg-white py-5 px-6 border-t-2 border-l-2 border-r-2 border-b-0">
            <h1 className="font-semibold">Chamados Atrasados</h1>
            <span className="text-sm text-gray-500">
              Resumo Chamados Atrasados (SLA)
            </span>
          </header>
          <ScrollArea className="overflow-y-auto bg-white border shadow-sm">
            <table className="table-auto h-full w-full border rounded-b-md">
              <thead className=" font-light text-center">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                    Título
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                    Criado
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold uppercase">
                    Prazo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white font-light shadow-md">
                {delayed.map(ticket => {
                  return (
                    <tr
                      key={ticket.id}
                      className="border-b hover:bg-gray-100 transition duration-200"
                    >
                      <td className="py-3 px-4 text-left text-sm">
                        {ticket.id}
                      </td>
                      <td className="py-3 px-4 text-left text-sm">
                        {ticket.name}
                      </td>
                      <td className="py-3 px-4 text-left text-sm">
                        {new Date(ticket.date_creation).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="py-3 px-4 text-left text-sm">
                        {new Date(ticket.time_to_resolve).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </ScrollArea>

          {/* <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              // disabled={currentPage === 1}
              // onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border rounded bg-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </Button>

            <span>Página {currentPage} de {totalPages}</span>

            <Button
              // disabled={currentPage === totalPages}
              // onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 border rounded bg-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
              Próxima
            </Button>
          </div> */}
        </section>
      </div>

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
                    value =>
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

        {/* <CardRoot>
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
                  tickFormatter={value => value.slice(0, 3)}
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
        </CardRoot> */}

        {/* <CardRoot className="shadow-lg bg-gray-50 ">
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
                  tickFormatter={value =>
                    new Date(value).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                    })
                  }
                />
                <ChartTooltip
                  cursor={true}
                  content={({ payload }) => {
                    if (!payload) return null;

                    if (payload && payload.length > 0) {
                      const { date_creation, name, status, time_to_resolve } =
                        payload[0].payload;

                      return (
                        <div className="bg-white p-2 rounded shadow-md text-sm">
                          <p>
                            <strong>Data de Criação:</strong>{' '}
                            {new Date(date_creation).toLocaleDateString(
                              'pt-BR',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </p>
                          <p>
                            <strong>Prazo de Resolução:</strong>{' '}
                            {new Date(time_to_resolve).toLocaleDateString(
                              'pt-BR',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
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
        </CardRoot> */}
      </div>

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
