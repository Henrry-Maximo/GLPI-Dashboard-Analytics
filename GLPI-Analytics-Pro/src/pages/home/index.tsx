("use client");

import { useQuery } from "@tanstack/react-query";
import { fetchTicketsSummary } from "../../http/fetch-tickets-summary";

import { BarChartsTickets } from "./components/BarCharts";
import {
	CardPriorityAndTypeTickets,
	CardStatusTickets,
	CardTicketsPending,
} from "./components/CardsCheck";
import {
	HeaderButton,
	HeaderIcon,
	HeaderInformations,
	HeaderRoot,
  HeaderWrapper,
} from "./components/Header";
import { SpinnerBall, WarningOctagon } from "@phosphor-icons/react";
import { fetchTicketsTechnician } from "@/http/fetch-tickets-technician";
import { fetchTicketsPending } from "@/http/fetch-tickets-pending";
import { ChartLine } from "phosphor-react";

// import { SettingsTabs } from '../../components/SettingsTabs'

export default function Home() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["state"],
		queryFn: fetchTicketsSummary,
		staleTime: 1000 * 60, // 1 minuto
		refetchInterval: 1000 * 5, // 10 segundos
		refetchOnWindowFocus: true,
	});

	const { data: dataTicketsTechnician } = useQuery({
		queryKey: ["technician"],
		queryFn: fetchTicketsTechnician,
		staleTime: 1000 * 60, // 1 minuto
		refetchInterval: 1000 * 5, // 10 segundos
		refetchOnWindowFocus: true,
	});

	const { data: dataTicketsPending } = useQuery({
		queryKey: ["pending"],
		queryFn: fetchTicketsPending,
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

	if (isLoading || !data || !dataTicketsTechnician || !dataTicketsPending) {
		return (
			<div className="w-full flex flex-col gap-2 items-center justify-center">
				<SpinnerBall className="text-zinc-700 animate-spin size-10" />
				<span className="text-xs font-light">Loading...</span>
			</div>
		);
	}

	const statusTicketsAmount = data?.status;
	const typeTicketsAmount = data?.type;

	const priorityTicketsAmount = data?.priority;
	const categoriesTicketsAmount = data?.categories;

	const concludesTicketsAmount = data?.concludes;
	const delayedTicketsAmount = data?.delayed;

	const ticketsTechnician = dataTicketsTechnician;
	const ticketsPending = dataTicketsPending.pending;

	return (
		<main className="w-full h-[max-content]">
			<HeaderRoot>
				<HeaderIcon>
					<ChartLine size={30} className="text-orange-500" />
					Dashboard
				</HeaderIcon>

				<HeaderWrapper>
					{/* <HeaderInformations /> */}
					<HeaderButton>Filter</HeaderButton>
				</HeaderWrapper>
			</HeaderRoot>

			{/* <CardTicketsPending data={ticketsPending} />
			<CardStatusTickets data={statusTicketsAmount} />
			<CardPriorityAndTypeTickets
				data={priorityTicketsAmount}
				type={typeTicketsAmount}
			/> */}

			{/* <BarChartsTickets
				priority={priorityTicketsAmount}
				categorie={categoriesTicketsAmount}
				concludes={concludesTicketsAmount}
				delayed={delayedTicketsAmount}
				technician={ticketsTechnician}
			/> */}
		</main>
	);
}
