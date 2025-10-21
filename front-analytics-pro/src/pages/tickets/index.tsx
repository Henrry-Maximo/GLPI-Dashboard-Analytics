import {
  HeaderButton,
  HeaderIcon,
  HeaderRoot,
} from "@/components/interface/main/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  BookDown,
  BookOpen,
  Building,
  Calendar,
  ChartLine,
  CheckCircle,
  Clock,
  Filter,
  Hash,
  MessageSquare,
  Pause,
  Plus,
  Search,
  Ticket,
  TrendingUp,
  User,
  X,
  XCircle
} from "lucide-react";

const mockTickets = [
  {
    id: "001",
    title: "Problema com impressora do setor financeiro",
    description: "Impressora HP LaserJet não está imprimindo documentos",
    requester: "Maria Silva",
    sector: "Financeiro",
    technician: "João Santos",
    status: "Em Andamento",
    priority: "Alta",
    createdAt: "06/10/2025",
    updatedAt: "06/10/2025 14:30",
    location: "Sala 201",
    category: "Hardware",
    comments: 3,
  },
  {
    id: "002",
    title: "Instalação de software contábil",
    description: "Necessário instalar sistema contábil na estação de trabalho",
    requester: "Carlos Oliveira",
    sector: "Contabilidade",
    technician: "Ana Costa",
    status: "Pendente",
    priority: "Média",
    createdAt: "05/10/2025",
    updatedAt: "05/10/2025 09:15",
    location: "Sala 105",
    category: "Software",
    comments: 1,
  },
  {
    id: "003",
    title: "Computador não liga",
    description: "Estação de trabalho não inicializa após queda de energia",
    requester: "Pedro Alves",
    sector: "RH",
    technician: "Henrique Maximo",
    status: "Resolvido",
    priority: "Crítica",
    createdAt: "04/10/2025",
    updatedAt: "04/10/2025 16:45",
    location: "Sala 302",
    category: "Hardware",
    comments: 5,
  },
  {
    id: "004",
    title: "Acesso negado ao sistema ERP",
    description: "Usuário não consegue acessar módulo de vendas",
    requester: "Ana Beatriz",
    sector: "Vendas",
    technician: "Lucas Ferreira",
    status: "Em Andamento",
    priority: "Alta",
    createdAt: "03/10/2025",
    updatedAt: "06/10/2025 11:20",
    location: "Sala 150",
    category: "Acesso",
    comments: 2,
  },
  {
    id: "005",
    title: "Configuração de email corporativo",
    description: "Configurar conta de email para novo funcionário",
    requester: "Roberto Silva",
    sector: "Marketing",
    technician: "Carla Santos",
    status: "Pendente",
    priority: "Baixa",
    createdAt: "02/10/2025",
    updatedAt: "02/10/2025 08:30",
    location: "Sala 220",
    category: "Email",
    comments: 0,
  },
];

const stats = {
  total: mockTickets.length,
  pending: mockTickets.filter((t) => t.status === "Pendente").length,
  inProgress: mockTickets.filter((t) => t.status === "Em Andamento").length,
  resolved: mockTickets.filter((t) => t.status === "Resolvido").length,
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    "Em Andamento": {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Clock,
    },
    Pendente: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: Pause,
    },
    Resolvido: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
    Cancelado: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircle,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig["Pendente"];
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} gap-1`}>
      <Icon size={12} />
      {status}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const priorityConfig = {
    Baixa: "bg-gray-100 text-gray-700 border-gray-200",
    Média: "bg-orange-100 text-orange-700 border-orange-200",
    Alta: "bg-red-100 text-red-700 border-red-200",
    Crítica: "bg-red-200 text-red-900 border-red-300 font-semibold",
  };

  return (
    <Badge
      className={`${priorityConfig[priority as keyof typeof priorityConfig]} gap-1`}
    >
      <AlertCircle size={12} />
      {priority}
    </Badge>
  );
};

export const Tickets = () => {
  return (
    <main className="w-full space-y-6">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Chamados
        </HeaderIcon>

        <div className="flex gap-2">
          <HeaderButton>
            <Plus />
            Novo Chamado
          </HeaderButton>

          <HeaderButton>
            <BookDown />
            Relatório
          </HeaderButton>
        </div>
      </HeaderRoot>

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.total}
                </p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {stats.pending}
                </p>
              </div>
              <Pause className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Em Andamento
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.inProgress}
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Resolvidos</p>
                <p className="text-2xl font-bold text-green-900">
                  {stats.resolved}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div> */}

      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={16}
              />
              <Input
                placeholder="Pesquisar por ID, título, requerente ou técnico..."
                className="bg-white pl-10"
                type="text"
              />
              <Button
                // onClick={() => setSearchItem("")}
                // disabled={!searchItem}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-transparent p-3 text-gray-500 shadow-none hover:rounded-full hover:bg-gray-300 hover:text-gray-800"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="progress">Em Andamento</SelectItem>
                  <SelectItem value="resolved">Resolvido</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="flex h-[calc(100%-300px)] flex-1">
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="cursor-default border-l-4 border-l-transparent bg-gray-50 shadow-md transition-all hover:scale-[0.98] hover:border-l-orange-500 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-gray-50 font-mono font-semibold text-gray-700"
                      >
                        <Hash size={12} />
                        {ticket.id}
                      </Badge>
                      {/* {getStatusBadge(ticket.status)} */}
                      {/* {getPriorityBadge(ticket.priority)} */}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {ticket.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {ticket.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={16} className="text-blue-500" />
                    <div>
                      <span className="font-medium text-gray-500">
                        Requerente
                      </span>
                      <p className="font-medium text-gray-800">
                        {ticket.requester}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Building size={16} className="text-green-500" />
                    <div>
                      <span className="font-medium text-gray-500">Setor</span>
                      <p className="font-medium text-gray-800">
                        {ticket.sector}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={16} className="text-purple-500" />
                    <div>
                      <span className="font-medium text-gray-500">Técnico</span>
                      <p className="font-medium text-gray-800">
                        {ticket.technician}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare size={16} className="text-orange-500" />
                    <div>
                      <span className="font-medium text-gray-500">
                        Comentários
                      </span>
                      <p className="font-medium text-gray-800">
                        {ticket.comments}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Criado: {ticket.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Atualizado: {ticket.updatedAt}</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger>
                      <Button className="border border-orange-500  bg-white text-orange-500 hover:text-white">
                        <BookOpen size={16} className="mr-2" />
                        Pressione para Abrir
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-evenly text-xl font-semibold text-orange-500">
                          <Ticket className="h-10 w-10 rounded-full bg-orange-50 p-2" />
                          {ticket.title}
                        </DialogTitle>
                        <DialogDescription className="flex items-center justify-end">
                          ID do Chamado:
                          <span className="ml-1 text-orange-500">
                            #{ticket.id}
                          </span>
                        </DialogDescription>
                      </DialogHeader>

                      <div className="rounded-lg border border-orange-300 bg-gray-50 p-4 shadow">
                        <h3 className="mb-3 text-lg font-semibold">
                          Informações
                        </h3>
                        <table className="w-full border-collapse text-sm">
                          <tbody>
                            <tr className="border-b">
                              <td className="w-32 font-medium">Descrição:</td>
                              <td>{ticket.description}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="font-medium">Requerente:</td>
                              <td>{ticket.requester}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="font-medium">Setor:</td>
                              <td>{ticket.sector}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="font-medium">Técnico:</td>
                              <td>{ticket.technician}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="font-medium">Status:</td>
                              <td>{ticket.status}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="font-medium">Urgência:</td>
                              <td>{ticket.priority}</td>
                            </tr>
                            <tr>
                              <td className="font-medium">Categoria:</td>
                              <td>{ticket.category}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="mt-3 flex justify-between text-xs text-gray-500">
                          <span>Criado: {ticket.createdAt}</span>
                          <span>Atualizado: {ticket.updatedAt}</span>
                        </div>
                      </div>

                      <Separator />

                      <DialogFooter>
                        <Button
                          variant="secondary"
                          className="border border-orange-500  bg-white text-orange-500 hover:text-orange-500"
                        >
                          Editar
                        </Button>
                        <Button className="bg-orange-500 text-white hover:bg-orange-600">
                          Imprimir
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Mostrando <span className="font-semibold">1-5</span> de{" "}
                <span className="font-semibold">{stats.total}</span> chamados
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp size={14} className="text-green-500" />
                <span>
                  Última atualização:{" "}
                  <span className="font-medium text-orange-600">
                    06/10/2025 16:45
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                // disabled={currentPage === 1}
                className="hover:bg-gray-50"
              >
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  1
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  3
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                // disabled={currentPage === totalPages}
                className="hover:bg-gray-50"
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
