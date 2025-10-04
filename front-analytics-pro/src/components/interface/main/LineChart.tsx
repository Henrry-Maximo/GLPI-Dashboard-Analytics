"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "Gráfico de linha com tickets resolvidos"

const chartData = [
  { month: "Janeiro", resolvidos: 45, pendentes: 12 },
  { month: "Fevereiro", resolvidos: 52, pendentes: 18 },
  { month: "Março", resolvidos: 38, pendentes: 8 },
  { month: "Abril", resolvidos: 61, pendentes: 15 },
  { month: "Maio", resolvidos: 49, pendentes: 22 },
  { month: "Junho", resolvidos: 67, pendentes: 9 },
]

const chartConfig = {
  resolvidos: {
    label: "Resolvidos",
    color: "hsl(142, 76%, 36%)",
  },
  pendentes: {
    label: "Pendentes",
    color: "hsl(48, 96%, 53%)",
  },
} satisfies ChartConfig

export function ChartLineLabel() {
  return (
    <Card className="bg-gray-50 border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">Tickets Resolvidos vs Pendentes</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="resolvidos"
              type="natural"
              stroke="var(--color-resolvidos)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-resolvidos)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Line
              dataKey="pendentes"
              type="natural"
              stroke="var(--color-pendentes)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-pendentes)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-green-600">
          Aumento de 12% na resolução este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando tickets dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
