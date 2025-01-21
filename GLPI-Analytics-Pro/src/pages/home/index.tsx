("use client");

import { useQuery } from "@tanstack/react-query";
import { fetchTicketsState } from "../../http/fetch-tickets-state";

import { BarChartsTickets } from "./components/BarCharts";
import {
  CardPriorityAndTypeTickets,
  CardStatusTickets,
} from "./components/CardsCheck";
import { Header } from "./components/Header";
import { SpinnerBall, WarningOctagon } from "@phosphor-icons/react";

// import { SettingsTabs } from '../../components/SettingsTabs'

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["state"],
    queryFn: fetchTicketsState,
    staleTime: 1000 * 60, // 1 minuto
    refetchInterval: 1000 * 5, // 10 segundos
    refetchOnWindowFocus: true,
  });

  if (isError) {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <WarningOctagon className="text-red-500 animate-bounce size-10" />
        <span className="text-xs font-light">Erro na consulta de dados.</span>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <SpinnerBall className="text-zinc-700 animate-spin size-10" />
        <span className="text-xs font-light">Loading...</span>
      </div>
    );
  }

  const statusTicketsAmount = data?.status;
  const priorityTicketsAmount = data?.priority;
  const typeTicketsAmount = data?.type;
  const categoriesTicketsAmount = data?.categories;

  return (
    <main className="w-full h-[max-content]">
      <Header />

      <CardStatusTickets data={statusTicketsAmount} />

      <CardPriorityAndTypeTickets data={priorityTicketsAmount} type={typeTicketsAmount} />

      <BarChartsTickets
        data={categoriesTicketsAmount}
        priority={priorityTicketsAmount}
      />
    </main>
  );
}
