import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CallsPage() {
  const calls = [
    {
      id: 1,
      title: "Problema no servidor",
      requester: "João Silva",
      technician: "Maria Oliveira",
      status: "Pendente",
      priority: "Alta",
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

      <ScrollArea className="h-[calc(100vh-200px)] border rounded-md">
        <ul className="divide-y divide-gray-200">
          {calls.map((call) => (
            <li
              key={call.id}
              className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h2 className="font-semibold text-lg text-slate-800">
                  {call.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Requerente: {call.requester} | Técnico: {call.technician}
                </p>
                <p className="text-xs text-gray-400">Criado em: {call.createdAt}</p>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={`${
                    call.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-700"
                      : call.status === "Resolvido"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {call.status}
                </Badge>

                <Badge
                  variant="solid"
                  className={`${
                    call.priority === "Alta"
                      ? "bg-red-100 text-red-700"
                      : call.priority === "Média"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {call.priority}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}
