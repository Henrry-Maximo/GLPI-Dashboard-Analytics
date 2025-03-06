("use client");

import {
	HeaderButton,
	HeaderIcon,
	HeaderRoot,
	HeaderWrapper,
} from "./components/Header";

import {
	CardFlash,
	CardIcon,
	CardInformations,
	CardRoot,
	CardWrapperCol,
	CardWrapperRow,
} from "./components/Card";

import {
	Bug,
	CaretCircleDoubleUp,
	ChartLine,
	Circle,
	CircleHalf,
	ClipboardText,
	Flame,
	Timer,
	Warning,
	WarningCircle,
} from "phosphor-react";

interface PropsTicketsType {
	id: number;
	level: string;
	name: string;
	amount: number;
}

interface PropsTicketsStatus {
	id: number;
	name: string;
	amount: number;
}

type LevelPriority = "veryLow" | "low" | "average" | "high" | "veryHigh";

interface PropsTicketsPriority {
	id: number;
	level: LevelPriority;
	name: string;
	amount: number;
}

interface PropsTicketsResponse {
	type: PropsTicketsType[];
	currentStatus: PropsTicketsStatus;
	priority: PropsTicketsPriority[];
}

const dataTicketsHomeResponse: PropsTicketsResponse = {
	type: [
		{
			id: 1,
			level: "request",
			name: "Requisição",
			amount: 15,
		},
		{
			id: 2,
			level: "Incident",
			name: "Incidente",
			amount: 4,
		},
	],
	currentStatus: {
		id: 1,
		name: "Pendente",
		amount: 20,
	},
	priority: [
		{
			id: 1,
			level: "veryLow",
			name: "Muito baixa",
			amount: 2,
		},
		{
			id: 2,
			level: "low",
			name: "Baixa",
			amount: 6,
		},
		{
			id: 3,
			level: "average",
			name: "Média",
			amount: 10,
		},
		{
			id: 4,
			level: "high",
			name: "Alta",
			amount: 2,
		},
		{
			id: 5,
			level: "veryHigh",
			name: "Muito Alta",
			amount: 0,
		},
	],
};

export default function Home() {
	interface PropsLevelIcons {
		veryLow: JSX.Element;
		low: JSX.Element;
		average: JSX.Element;
		high: JSX.Element;
		veryHigh: JSX.Element;
	}

	const levelIcons: PropsLevelIcons = {
		veryLow: <Circle />,
		low: <CircleHalf />,
		average: <CaretCircleDoubleUp />,
		high: <Warning />,
		veryHigh: <Flame />,
	};

	interface PropsLevelBackground {
		veryLow: string;
		low: string;
		average: string;
		high: string;
		veryHigh: string;
	}

	const levelBackground: PropsLevelBackground = {
		veryLow: "bg-green-400 text-gray-100 border-green-700",
		low: "bg-green-600 text-gray-100 border-green-800",
		average: "bg-yellow-400 text-white border-yellow-700",
		high: "bg-red-400 text-gray-100 border-red-700",
		veryHigh: "bg-red-600 text-gray-100 border-red-800",
	};

	return (
		<main className="flex flex-col w-full h-[max-content]">
			<HeaderRoot>
				<HeaderIcon>
					<ChartLine size={30} className="text-orange-500" />
					Dashboard
				</HeaderIcon>

				<HeaderWrapper>
					<HeaderButton>Filter</HeaderButton>
				</HeaderWrapper>
			</HeaderRoot>

			<CardRoot>
				<CardWrapperCol>
					{dataTicketsHomeResponse.type.map((row) => (
						<CardFlash key={row.id}>
							{row.name === "Requisição" ? (
								<CardIcon
									aria-label="Request"
									className="bg-blue-400 border-blue-700"
								>
									<ClipboardText size={22} />
								</CardIcon>
							) : (
								<CardIcon
									aria-label="Incident"
									className="bg-red-400 border-red-700"
								>
									<Bug size={22} />
								</CardIcon>
							)}

							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}
				</CardWrapperCol>

				<CardWrapperRow>
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
				</CardWrapperRow>

				<CardWrapperRow>
					{dataTicketsHomeResponse.priority.map((item) => (
						<CardFlash key={item.id}>
							<CardIcon className={levelBackground[item.level]}>
								{levelIcons[item.level]}
							</CardIcon>
							<CardInformations count={item.amount} name={item.name} />
						</CardFlash>
					))}
				</CardWrapperRow>
			</CardRoot>
		</main>
	);
}
