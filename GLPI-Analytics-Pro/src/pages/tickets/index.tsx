import type { Ticket } from "@/@types/interface-tickets";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchTicketsAll } from "@/http/fetch-tickets-all";
import { useQuery } from "@tanstack/react-query";

export default function Tickets() {
  const calls = [
    {
      id: 1,
      title: "Permissão: Requisição de Acesso ao Sistema X.",
      requester: "João Silva",
      technician: "Henrique Maximo",
      status: "Pendente",
      priority: "Alta",
      location: "Almoxarifado",
      createdAt: "2025-01-02 14:32",
    },
    {
      id: 2,
      title: "Solicitação de acesso",
      requester: "Ana Costa",
      technician: "Carlos Lima",
      status: "Resolvido",
      priority: "Média",
      createdAt: "2025-01-01 10:45",
    },
    {
      id: 3,
      title: "Aceso",
      requester: "Ana Costa",
      technician: "Carlos Lima",
      status: "Resolvido",
      priority: "Média",
      createdAt: "2025-01-01 10:45",
    },
    {
      id: 4,
      title: "Aceso",
      requester: "Ana Costa",
      technician: "Carlos Lima",
      status: "Resolvido",
      priority: "Média",
      createdAt: "2025-01-01 10:45",
    },
    {
      id: 5,
      title: "Aceso",
      requester: "Ana Costa",
      technician: "Carlos Lima",
      status: "Resolvido",
      priority: "Média",
      createdAt: "2025-01-01 10:45",
    },
    {
      id: 6,
      title: "Aceso",
      requester: "Ana Costa",
      technician: "Carlos Lima",
      status: "Resolvido",
      priority: "Média",
      createdAt: "2025-01-01 10:45",
    },
  ];

  const { data, isLoading, isError } = useQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: fetchTicketsAll,
    staleTime: 1000 * 300, // 5 minutos
    refetchInterval: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: true, // reconsultar janela em foco
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar os chamados.</p>;
  }

  return (
    <section className="w-full space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-700">
          Gerenciamento de Chamadas
        </h1>
        <p className="text-gray-600 mt-2">
          Acompanhe todos os chamadas abertos, em andamento e resolvidos.
        </p>
      </header>

      <ScrollArea className="h-[calc(95vh-200px)] border rounded-md bg-gray-100">
        <ul className="divide-y divide-gray-300">
          {data?.map((data) => (
            <li
              key={data.id}
              className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h2 className="font-semibold text-lg text-slate-800">
                  {data.name}
                </h2>
                {/* <p className="text-sm text-gray-500">
                  Requerente: {data.requester} | Técnico: {data.technician}
                </p> */}
                <p className="text-xs text-gray-400">Criado em: {data.date_creation}</p>
              </div>

              {/* <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={`${
                    data.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-700"
                      : data.status === "Resolvido"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {data.status}
                </Badge>

                <Badge
                  variant="outline"
                  className={`${
                    data.priority === "Alta"
                      ? "bg-red-100 text-red-700"
                      : data.priority === "Média"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {data.priority}
                </Badge>
                {data.location ? (<Badge
                  variant="outline"
                >
                  {data.location}
                </Badge>) : (null)}
              </div> */}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}
