import { dataTicketsHomeResponse } from "@/data/ticketsData";

import {
	CardFlash,
	CardIcon,
	CardInformations,
	CardRoot,
	CardWrapper,
} from "@/components/Card/Card";

import { ArrowsLeftRight, Timer } from "phosphor-react";

import { Header } from "./header";

import {
	levelPriorityIcons,
	levelPriorityStyle,
	levelTypeIcons,
	levelTypeStyle,
} from "./definitions";
import { BarChartsTickets } from "./components/BarCharts";
import { fetchTicketsSummary } from "@/http/fetch-tickets-summary";
import { fetchTicketsTechnician } from "@/http/fetch-tickets-technician";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
	const { data } = useQuery({
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

	const priorityTicketsAmount = data?.priority;
	const categoriesTicketsAmount = data?.categories;

	const concludesTicketsAmount = data?.concludes;
	const delayedTicketsAmount = data?.delayed;

	const ticketsTechnician = dataTicketsTechnician;

	return (
		<main className="flex flex-col w-full h-[max-content] flex-1">
			<Header name="Dashboard" />

			<CardRoot>
				{/* style default: but add style custom */}
				<CardWrapper>
					{dataTicketsHomeResponse.type.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon className={levelTypeStyle[row.level]}>
								{levelTypeIcons[row.level]}
							</CardIcon>

							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}
				</CardWrapper>

				<CardWrapper>
					<CardFlash key={dataTicketsHomeResponse.currentStatus.id}>
						<CardIcon className="bg-yellow-400 border border-yellow-600 text-4xl">
							<Timer />
						</CardIcon>
						<CardInformations
							className="text-5xl"
							count={dataTicketsHomeResponse.currentStatus.amount}
							name={dataTicketsHomeResponse.currentStatus.name}
						/>
					</CardFlash>
				</CardWrapper>

				<CardIcon className="bg-white p-2 teanimate-pulse">
					<ArrowsLeftRight className="text-orange-600 animate-pulse" />
				</CardIcon>

				<CardWrapper className="flex flex-row">
					{dataTicketsHomeResponse.priority.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon className={levelPriorityStyle[row.level]}>
								{levelPriorityIcons[row.level]}
							</CardIcon>
							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}
				</CardWrapper>
			</CardRoot>

			<div className="flex flex-col max-h-screen w-full mt-2">
				<BarChartsTickets
					priority={priorityTicketsAmount}
					categorie={categoriesTicketsAmount}
					concludes={concludesTicketsAmount}
					delayed={delayedTicketsAmount}
					technician={ticketsTechnician}
				/>
			</div>
		</main>
	);
}
