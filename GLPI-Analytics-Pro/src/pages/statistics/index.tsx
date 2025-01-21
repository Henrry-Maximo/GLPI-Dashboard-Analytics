import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Statistics() {
  // const ticketsByTechnicians = [
  //   { name: 'Técnico A', tickets: 120 },
  //   { name: 'Técnico B', tickets: 95 },
  //   { name: 'Técnico C', tickets: 140 },
  //   { name: 'Técnico D', tickets: 75 },
  // ]

  // const ticketsByRequesters = [
  //   { name: 'Requerente X', tickets: 200 },
  //   { name: 'Requerente Y', tickets: 180 },
  //   { name: 'Requerente Z', tickets: 150 },
  //   { name: 'Requerente W', tickets: 130 },
  // ]

  // const ticketsOverTime = [
  //   { date: '2023-12-01', tickets: 50 },
  //   { date: '2023-12-02', tickets: 65 },
  //   { date: '2023-12-03', tickets: 45 },
  //   { date: '2023-12-04', tickets: 80 },
  //   { date: '2023-12-05', tickets: 100 },
  // ]

  return (
    <div className="w-full space-y-6">
      {/* Título e Resumo Geral */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">
          Estatísticas Gerais
        </h1>
        <p className="text-sm text-gray-500">
          Visualize dados detalhados sobre técnicos, requerentes e chamados.
        </p>
      </header>

      {/* Cards Resumidos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-500">1,234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Técnicos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">45</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Média de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-500">3h 15m</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chamados Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">67</p>
          </CardContent>
        </Card>
      </section>

      {/* Gráficos */}
      <section className="space-y-6">
        {/* Gráfico de Barras - Chamados por Técnico */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Chamados por Técnico</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketsByTechnicians}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <ChartLegend />
                <Bar dataKey="tickets" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* Gráfico de Barras Horizontais - Chamados por Requerente */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Chamados por Requerente</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={ticketsByRequesters}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <ChartTooltip />
                <ChartLegend />
                <Bar dataKey="tickets" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* Gráfico de Linhas - Chamados ao Longo do Tempo */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Tendência de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ticketsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip />
                <ChartLegend />
                <Line type="monotone" dataKey="tickets" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </section>
    </div>
  )
}
