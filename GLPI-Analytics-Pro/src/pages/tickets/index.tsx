import type { Ticket } from "@/@types/interface-tickets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchTicketsAll } from "@/http/fetch-tickets-all";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CircleNotch, Clock, Hand, WarningCircle, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { FooterTicketsMonitoring } from "../monitoring/components/FooterTicketsMonitoring";
import { getStatusDetails } from "@/utils/monitoring-status-icon-color";

const statusTicketsOperation = [
  {
    status: "Novo",
    className: "bg-green-100 text-green-700",
  },
  {
    status: "Em Atendimento (atribuído)",
    className: "bg-blue-100 text-blue-700",
  },
  {
    status: "Em Atendimento (planejado)",
    className: "bg-pink-100 text-pink-700",
  },
  {
    status: "Pendente",
    className: "bg-yellow-50 text-yellow-500",
  },
  {
    status: "Solucionado",
    className: "bg-green-500 text-white",
  },
  {
    status: "Fechado",
    className: "bg-gray-100 text-gray-700",
  },
];

const priorityTicketsOperations = [
  {
    priority: "Muito alta",
    className: "bg-red-600 text-red-100",
  },
  {
    priority: "Alta",
    className: "bg-red-500 text-red-100",
  },
  {
    priority: "Média",
    className: "bg-orange-500 text-red-100",
  },
  {
    priority: "Baixa",
    className: "bg-blue-600 text-red-100",
  },
  {
    priority: "Muito baixa",
    className: "bg-blue-400 text-red-100",
  },
];

export default function Tickets() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState<Ticket[]>([]);

  const { data, isLoading, isError, dataUpdatedAt } = useQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: fetchTicketsAll,
    staleTime: 1000 * 300, // 5 minutos
    refetchInterval: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: true, // reconsultar janela em foco
  });

  useEffect(() => {
    if (data) {
      setCurrentPage(1);

      const filteredItems = data.filter(
        (ticket) =>
          ticket.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          ticket.applicant?.toLowerCase().includes(searchItem.toLowerCase()) ||
          ticket.technical?.toLowerCase().includes(searchItem.toLowerCase()) ||
          ticket.location?.toLowerCase().includes(searchItem.toLowerCase()) ||
          ticket.date_creation
            ?.toLowerCase()
            .includes(searchItem.toLowerCase()) ||
          ticket.priority?.toLowerCase().includes(searchItem.toLowerCase()) ||
          ticket.status?.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  }, [searchItem, data]);

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  if (isLoading) {
    return (
      <p
        className="flex flex-col flex-1 justify-center items-center  
  text-red-600"
      >
        <CircleNotch className="text-zinc-800 animate-spin size-10" />
      </p>
    );
  }

  if (isError) {
    return (
      <p className="flex flex-col flex-1 justify-center items-center m-auto animate-pulse">
        <WarningCircle className="text-zinc-800 size-10" />
        Erro ao carregar os chamados.
      </p>
    );
  }

  function handleClear() {
    setSearchItem("");
  }

  // const dateCreatedTicket = formatDistance;

  return (
    <section className="w-full space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Gerenciamento de Chamados
        </h1>
        <p className="text-gray-600 mt-2">
          Acompanhe todos os chamados abertos, em andamento e resolvidos.
        </p>
      </header>

      {/* Campo de Pesquisa */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-xl">
          <Input
            placeholder="Pesquisar por nome, requerente ou técnico..."
            className="w-full bg-white pr-12"
            type="text"
            value={searchItem}
            onChange={handleInputChange}
          />
          <Button
            onClick={handleClear}
            disabled={!searchItem}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent rounded-full shadow-none text-gray-500 hover:bg-gray-300 hover:text-gray-800 hover:rounded-full p-3"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(90%-200px)] border rounded-md bg-gray-50 shadow-sm">
        <table className="table-auto w-full">
          <tbody className="divide-y divide-gray-300">
            {paginatedData?.map((ticket) => {
              const { icon } = getStatusDetails(ticket.status);
              return (
                <tr
                  key={ticket.id}
                  title={ticket.id.toString()}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4">
                    <h2 className="text-sm text-slate-800">{ticket.name}</h2>
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    Requerente: {ticket.applicant} <br /> Setor:{" "}
                    {ticket.location} <br /> Técnico: {ticket.technical}
                  </td>
                  <td
                    title={dayjs(ticket.date_creation).fromNow()}
                    className="p-4 text-xs text-gray-400"
                  >
                    Criado em: {ticket.date_creation}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      title={ticket.status}
                      className={`min-w-full gap-2 justify-center ${
                        statusTicketsOperation.find(
                          (item) => item.status === ticket.status
                        )?.className || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ticket.status === "Pendente" ? <Hand size={18} /> : icon}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      title={ticket.priority}
                      className={`min-w-full gap-2 justify-center ${
                        priorityTicketsOperations.find(
                          (row) => row.priority === ticket.priority
                        )?.className || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {/* {ticket.priority} */}
                    </Badge>
                  </td>
                  {/* <td className="p-4">
                    {ticket.location ? (
                      <Badge
                        variant="outline"
                        className="min-w-[120px] justify-center"
                      >
                        {ticket.location}
                      </Badge>
                    ) : null}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollArea>

      <FooterTicketsMonitoring timeCheckUpdate={dataUpdatedAt} />

      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded bg-gray-600 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </Button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded bg-gray-600 hover:bg-gray-300 disabled:opacity-50"
        >
          Próxima
        </Button>
      </div>
    </section>
  );
}
