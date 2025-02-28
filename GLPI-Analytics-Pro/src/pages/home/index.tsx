("use client");

import { useQuery } from "@tanstack/react-query";
import { fetchTicketsSummary } from "../../http/fetch-tickets-summary";

// import {
// 	CardPriorityAndTypeTickets,
// 	CardStatusTickets,
// 	CardTicketsPending,
// } from "./components/Card";
import {
	HeaderButton,
	HeaderIcon,
	HeaderRoot,
	HeaderWrapper,
} from "./components/Header";
import { SpinnerBall, WarningOctagon } from "@phosphor-icons/react";
import { fetchTicketsTechnician } from "@/http/fetch-tickets-technician";
import { fetchTicketsPending } from "@/http/fetch-tickets-pending";
import {
	Bug,
	ChartLine,
	Circle,
	CircleHalf,
	Flame,
	Table,
	Timer,
	Warning,
	WarningCircle,
} from "phosphor-react";
import {
	CardRoot,
	CardFlash,
	CardIcon,
	CardInformations,
	CardWrapperCol,
	CardWrapperRow,
} from "./components/Card";

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
	const ticketsPending = dataTicketsPending.pending;

	const typeTicketsAmount = data?.type;

	const priorityTicketsAmount = data?.priority;
	const categoriesTicketsAmount = data?.categories;

	const concludesTicketsAmount = data?.concludes;
	const delayedTicketsAmount = data?.delayed;

	const ticketsTechnician = dataTicketsTechnician;

	const dataTicketsTypeInMemory = [
		{
			id: 1,
			name: "Requisição",
			count: 2140,
		},
		{
			id: 2,
			name: "Incidente",
			count: 847,
		},
	];

	const dataTicketsStatusInMemory = {
		very_low: [
			{
				id: 1,
				name: "Muito baixa",
				amount: 2,
			},
		],
		low: [
			{
				id: 1,
				name: "Baixa",
				amount: 6,
			},
		],
		average: [
			{
				id: 1,
				name: "Média",
				amount: 10,
			},
		],
		high: [
			{
				id: 1,
				name: "Alta",
				amount: 0,
			},
		],
		very_high: [
			{
				id: 1,
				name: "Muito alta",
				amout: 2,
			},
		],
	};

	const countTicketsStatusInMemory = {
		pending: [
			{
				id: 1,
				name: "Pendente",
				number: "20",
			},
		],
	};

	// const dataTicketsPriorityInMemory = {
	// 	count:
	// };

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

			{/* Type || Status || Priority */}
			<CardRoot>
				<CardWrapperCol>
					{dataTicketsTypeInMemory.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon aria-label="Timer">
								{row.name === "Requisição" ? (
									<Table size={22} />
								) : (
									<Bug size={22} />
								)}
							</CardIcon>

							<CardInformations count={row.count} name={row.name} />
						</CardFlash>
					))}
				</CardWrapperCol>

				<CardWrapperRow>
					{countTicketsStatusInMemory.pending.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon>
								<Timer />
							</CardIcon>

							<CardInformations count={20} name="Pendente" />
						</CardFlash>
					))}
				</CardWrapperRow>

				<CardWrapperRow>
					{dataTicketsStatusInMemory.low.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon>
								<Circle />
							</CardIcon>

							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}

					{dataTicketsStatusInMemory.very_low.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon>
								<CircleHalf />
							</CardIcon>
							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}

					{dataTicketsStatusInMemory.average.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon>
								<WarningCircle />
							</CardIcon>
							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}

					{dataTicketsStatusInMemory.high.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon>
								<Warning />
							</CardIcon>
							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}

					{dataTicketsStatusInMemory.very_high.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon>
								<Flame />
							</CardIcon>
							<CardInformations count={row.amout} name={row.name} />
						</CardFlash>
					))}
				</CardWrapperRow>
			</CardRoot>

			{/* <CardTicketsPending data={ticketsPending} />
			<CardStatusTickets data={statusTicketsAmount} /> */}
			{/* <CardPriorityAndTypeTickets
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
