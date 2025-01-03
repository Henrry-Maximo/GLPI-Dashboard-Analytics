import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Statistics() {
  return (
    <div className="w-full space-y-6">
      {/* Título e Resumo Geral */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Estatísticas Gerais</h1>
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
    </div>
  );
}
