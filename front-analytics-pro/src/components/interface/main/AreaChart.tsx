"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "Gráfico de área interativo de tickets"

const chartData = [
  { date: "2024-04-01", incidentes: 15, requisicoes: 8 },
  { date: "2024-04-02", incidentes: 12, requisicoes: 12 },
  { date: "2024-04-03", incidentes: 18, requisicoes: 6 },
  { date: "2024-04-04", incidentes: 22, requisicoes: 14 },
  { date: "2024-04-05", incidentes: 28, requisicoes: 16 },
  { date: "2024-04-06", incidentes: 25, requisicoes: 18 },
  { date: "2024-04-07", incidentes: 20, requisicoes: 10 },
  { date: "2024-04-08", incidentes: 32, requisicoes: 22 },
  { date: "2024-04-09", incidentes: 8, requisicoes: 5 },
  { date: "2024-04-10", incidentes: 19, requisicoes: 11 },
  { date: "2024-04-11", incidentes: 26, requisicoes: 19 },
  { date: "2024-04-12", incidentes: 23, requisicoes: 13 },
  { date: "2024-04-13", incidentes: 27, requisicoes: 21 },
  { date: "2024-04-14", incidentes: 14, requisicoes: 9 },
  { date: "2024-04-15", incidentes: 11, requisicoes: 7 },
  { date: "2024-04-16", incidentes: 13, requisicoes: 8 },
  { date: "2024-04-17", incidentes: 35, requisicoes: 25 },
  { date: "2024-04-18", incidentes: 29, requisicoes: 23 },
  { date: "2024-04-19", incidentes: 21, requisicoes: 12 },
  { date: "2024-04-20", incidentes: 9, requisicoes: 6 },
  { date: "2024-04-21", incidentes: 12, requisicoes: 9 },
  { date: "2024-04-22", incidentes: 17, requisicoes: 11 },
  { date: "2024-04-23", incidentes: 13, requisicoes: 15 },
  { date: "2024-04-24", incidentes: 31, requisicoes: 20 },
  { date: "2024-04-25", incidentes: 18, requisicoes: 14 },
  { date: "2024-04-26", incidentes: 7, requisicoes: 4 },
  { date: "2024-04-27", incidentes: 30, requisicoes: 28 },
  { date: "2024-04-28", incidentes: 10, requisicoes: 8 },
  { date: "2024-04-29", incidentes: 24, requisicoes: 16 },
  { date: "2024-04-30", incidentes: 36, requisicoes: 26 },
  { date: "2024-05-01", incidentes: 16, requisicoes: 12 },
  { date: "2024-05-02", incidentes: 23, requisicoes: 18 },
  { date: "2024-05-03", incidentes: 19, requisicoes: 11 },
  { date: "2024-05-04", incidentes: 30, requisicoes: 24 },
  { date: "2024-05-05", incidentes: 38, requisicoes: 27 },
  { date: "2024-05-06", incidentes: 39, requisicoes: 32 },
  { date: "2024-05-07", incidentes: 31, requisicoes: 20 },
  { date: "2024-05-08", incidentes: 12, requisicoes: 9 },
  { date: "2024-05-09", incidentes: 18, requisicoes: 10 },
  { date: "2024-05-10", incidentes: 23, requisicoes: 19 },
  { date: "2024-05-11", incidentes: 26, requisicoes: 17 },
  { date: "2024-05-12", incidentes: 15, requisicoes: 13 },
  { date: "2024-05-13", incidentes: 15, requisicoes: 8 },
  { date: "2024-05-14", incidentes: 35, requisicoes: 29 },
  { date: "2024-05-15", incidentes: 37, requisicoes: 25 },
  { date: "2024-05-16", incidentes: 27, requisicoes: 22 },
  { date: "2024-05-17", incidentes: 39, requisicoes: 28 },
  { date: "2024-05-18", incidentes: 25, requisicoes: 19 },
  { date: "2024-05-19", incidentes: 18, requisicoes: 11 },
  { date: "2024-05-20", incidentes: 14, requisicoes: 12 },
  { date: "2024-05-21", incidentes: 6, requisicoes: 4 },
  { date: "2024-05-22", incidentes: 6, requisicoes: 3 },
  { date: "2024-05-23", incidentes: 20, requisicoes: 16 },
  { date: "2024-05-24", incidentes: 23, requisicoes: 14 },
  { date: "2024-05-25", incidentes: 16, requisicoes: 13 },
  { date: "2024-05-26", incidentes: 17, requisicoes: 9 },
  { date: "2024-05-27", incidentes: 33, requisicoes: 26 },
  { date: "2024-05-28", incidentes: 18, requisicoes: 11 },
  { date: "2024-05-29", incidentes: 6, requisicoes: 4 },
  { date: "2024-05-30", incidentes: 27, requisicoes: 18 },
  { date: "2024-05-31", incidentes: 14, requisicoes: 12 },
  { date: "2024-06-01", incidentes: 14, requisicoes: 10 },
  { date: "2024-06-02", incidentes: 37, requisicoes: 28 },
  { date: "2024-06-03", incidentes: 8, requisicoes: 6 },
  { date: "2024-06-04", incidentes: 34, requisicoes: 25 },
  { date: "2024-06-05", incidentes: 7, requisicoes: 5 },
  { date: "2024-06-06", incidentes: 23, requisicoes: 16 },
  { date: "2024-06-07", incidentes: 25, requisicoes: 21 },
  { date: "2024-06-08", incidentes: 30, requisicoes: 19 },
  { date: "2024-06-09", incidentes: 34, requisicoes: 28 },
  { date: "2024-06-10", incidentes: 12, requisicoes: 9 },
  { date: "2024-06-11", incidentes: 7, requisicoes: 5 },
  { date: "2024-06-12", incidentes: 39, requisicoes: 29 },
  { date: "2024-06-13", incidentes: 6, requisicoes: 4 },
  { date: "2024-06-14", incidentes: 33, requisicoes: 24 },
  { date: "2024-06-15", incidentes: 24, requisicoes: 19 },
  { date: "2024-06-16", incidentes: 29, requisicoes: 18 },
  { date: "2024-06-17", incidentes: 37, requisicoes: 31 },
  { date: "2024-06-18", incidentes: 8, requisicoes: 7 },
  { date: "2024-06-19", incidentes: 27, requisicoes: 17 },
  { date: "2024-06-20", incidentes: 32, requisicoes: 26 },
  { date: "2024-06-21", incidentes: 13, requisicoes: 10 },
  { date: "2024-06-22", incidentes: 25, requisicoes: 16 },
  { date: "2024-06-23", incidentes: 38, requisicoes: 32 },
  { date: "2024-06-24", incidentes: 10, requisicoes: 8 },
  { date: "2024-06-25", incidentes: 11, requisicoes: 9 },
  { date: "2024-06-26", incidentes: 34, requisicoes: 23 },
  { date: "2024-06-27", incidentes: 35, requisicoes: 29 },
  { date: "2024-06-28", incidentes: 12, requisicoes: 9 },
  { date: "2024-06-29", incidentes: 8, requisicoes: 6 },
  { date: "2024-06-30", incidentes: 35, requisicoes: 24 },
]

const chartConfig = {
  tickets: {
    label: "Tickets",
  },
  incidentes: {
    label: "Incidentes",
    color: "hsl(0, 84%, 60%)",
  },
  requisicoes: {
    label: "Requisições",
    color: "hsl(221, 83%, 53%)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0 bg-gray-50">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-orange-700">Tickets por Tipo - Evolução Diária</CardTitle>
          <CardDescription>
            Mostrando incidentes e requisições dos últimos 3 meses
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncidentes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-incidentes)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-incidentes)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRequisicoes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-requisicoes)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-requisicoes)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="requisicoes"
              type="natural"
              fill="url(#fillRequisicoes)"
              stroke="var(--color-requisicoes)"
              stackId="a"
            />
            <Area
              dataKey="incidentes"
              type="natural"
              fill="url(#fillIncidentes)"
              stroke="var(--color-incidentes)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
