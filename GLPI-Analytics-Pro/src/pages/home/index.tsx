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
	priorityTranslations,
} from "./definitions";
import { BarChartsTickets } from "./components/BarCharts";
import { useTicketsPending, useTicketsSummary } from "./api/tickets.queries";
import { useEffect, useState } from "react";
import { SpinnerBall } from "@phosphor-icons/react";

export default function Home() {
	const { data: summaryData, isLoading: isLoadingSummary } =
		useTicketsSummary();
	// const { data: technicianData } = useTicketsTechnician();
	const { data: statusData, isLoading: isLoadingStatus } = useTicketsPending();

	const [statusTickets, setStatusTickets] = useState(statusData);

	useEffect(() => {
		setStatusTickets(statusData);
	}, [statusData]);

	if (isLoadingStatus || isLoadingSummary || !statusTickets) {
		return (
			<div className="w-full flex flex-col gap-2 items-center justify-center">
				<SpinnerBall className="text-zinc-700 animate-spin size-10" />
				<span className="text-xs font-light">Loading...</span>
			</div>
		);
	}

	const keyName = Object.keys(statusTickets);
	const pendingIndex = keyName.indexOf("list");
	const countFiltered = statusTickets.list.length;

	return (
		<main className="flex flex-col w-full h-[max-content] flex-1">
			{summaryData && statusTickets && (
				<>
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
							<CardFlash key={pendingIndex}>
								<CardIcon className="bg-yellow-400 border border-yellow-600 text-4xl">
									<Timer />
								</CardIcon>
								<CardInformations
									className="text-5xl"
									count={countFiltered}
									name={keyName[1] ? "Pendente" : "-"}
								/>
							</CardFlash>
						</CardWrapper>

						<CardIcon className="bg-white p-2 teanimate-pulse">
							<ArrowsLeftRight className="text-orange-600 animate-pulse" />
						</CardIcon>

						<CardWrapper className="flex flex-row">
							{statusTickets.meta.map((row) => (
								<CardFlash key={row.name}>
									<CardIcon className={levelPriorityStyle[row.name]}>
										{levelPriorityIcons[row.name]}
									</CardIcon>

									<CardInformations count={row.count} name={priorityTranslations[row.name]} />
								</CardFlash>
							))}
						</CardWrapper>
					</CardRoot>

					<div className="flex flex-col max-h-screen w-full mt-2">
						<BarChartsTickets
							priority={summaryData.priority}
							status={summaryData.status}
							categorie={summaryData.categories}
							concludes={summaryData.concludes}
							delayed={summaryData.delayed}
							// technician={technicianData}
						/>
					</div>
				</>
			)}
		</main>
	);
}
