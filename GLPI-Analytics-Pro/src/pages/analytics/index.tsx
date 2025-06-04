import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { useState } from 'react';

export const Analytics = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <section className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Análises e Gráficos</h1>
        <Button variant="outline">Exportar Relatórios</Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex justify-center gap-4">
          <Select>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Selecione o Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mês</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Selecione o Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technicians">Técnicos</SelectItem>
              <SelectItem value="requesters">Requerentes</SelectItem>
              <SelectItem value="tickets">Chamados</SelectItem>
            </SelectContent>
          </Select>
          <Button>Filtrar</Button>
        </div>
      </Card>

      {/* Tabs e Conteúdo */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="flex justify-center space-x-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="technicians">Técnicos</TabsTrigger>
          <TabsTrigger value="requesters">Requerentes</TabsTrigger>
          <TabsTrigger value="tickets">Chamados</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Gráficos de Visão Geral */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex items-center space-x-2">
                {/* <BarChart className="text-blue-500 w-6 h-6" /> */}
                <h2 className="font-semibold text-lg">Chamados por Status</h2>
              </CardHeader>
              <CardContent>
                {/* Substituir pelo componente de gráfico de barras */}
                <p>Gráfico de barras</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center space-x-2">
                {/* <PieChart className="text-green-500 w-6 h-6" /> */}
                <h2 className="font-semibold text-lg">Chamados por Urgência</h2>
              </CardHeader>
              <CardContent>
                {/* Substituir pelo componente de gráfico de pizza */}
                <p>Gráfico de pizza</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center space-x-2">
                {/* <LineChart className="text-orange-500 w-6 h-6" /> */}
                <h2 className="font-semibold text-lg">Tendências Mensais</h2>
              </CardHeader>
              <CardContent>
                {/* Substituir pelo componente de gráfico de linha */}
                <p>Gráfico de linha</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technicians">
          {/* Análises específicas para técnicos */}
          <Card>
            <CardHeader>
              <h2 className="font-bold text-xl">Desempenho dos Técnicos</h2>
            </CardHeader>
            <CardContent>
              <p>Aqui entrará um gráfico ou tabela para os técnicos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requesters">
          {/* Análises específicas para requerentes */}
          <Card>
            <CardHeader>
              <h2 className="font-bold text-xl">
                Estatísticas dos Requerentes
              </h2>
            </CardHeader>
            <CardContent>
              <p>Aqui entrará um gráfico ou tabela para os requerentes.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          {/* Análises específicas para chamados */}
          <Card>
            <CardHeader>
              <h2 className="font-bold text-xl">Análises de Chamados</h2>
            </CardHeader>
            <CardContent>
              <p>Aqui entrará um gráfico ou tabela para os chamados.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
