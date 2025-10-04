"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Gráfico de rosca com status de tickets"

const chartData = [
  { status: "aberto", tickets: 45, fill: "var(--color-aberto)" },
  { status: "andamento", tickets: 32, fill: "var(--color-andamento)" },
  { status: "resolvido", tickets: 89, fill: "var(--color-resolvido)" },
  { status: "fechado", tickets: 156, fill: "var(--color-fechado)" },
  { status: "pendente", tickets: 28, fill: "var(--color-pendente)" },
]

const chartConfig = {
  tickets: {
    label: "Tickets",
  },
  aberto: {
    label: "Aberto",
    color: "hsl(0, 84%, 60%)",
  },
  andamento: {
    label: "Em Andamento",
    color: "hsl(221, 83%, 53%)",
  },
  resolvido: {
    label: "Resolvido",
    color: "hsl(142, 76%, 36%)",
  },
  fechado: {
    label: "Fechado",
    color: "hsl(215, 28%, 17%)",
  },
  pendente: {
    label: "Pendente",
    color: "hsl(48, 96%, 53%)",
  },
} satisfies ChartConfig

export function ChartPieDonutText() {
  const totalTickets = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tickets, 0)
  }, [])

  return (
    <Card className="flex flex-col bg-gray-50 border-orange-200">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-orange-700">Status dos Tickets</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tickets"
              nameKey="status"
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
                          {totalTickets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tickets
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-green-600">
          Resolução aumentou 8.3% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando distribuição de status dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
