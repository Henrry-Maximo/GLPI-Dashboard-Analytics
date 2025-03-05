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
	ChartLine,
	Circle,
	CircleHalf,
	ClipboardText,
	Flame,
	Timer,
	Warning,
	WarningCircle,
} from "phosphor-react";
import type { ReactNode } from "react";

const dataTicketsHomeResponse = {
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
	interface propsLevelIcons {
		veryLow: ReactNode,
		low: ReactNode,
		average: ReactNode,
		high: ReactNode,
		veryHigh: ReactNode
	}
	
	const levelIcons:propsLevelIcons = {
		veryLow: <Circle />,
		low: <CircleHalf />,
		average: <WarningCircle />,
		high: <Warning />,
		veryHigh: <Flame />,
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
						<CardIcon className="bg-yellow-400 border border-yellow-600">
							<Timer size={28} />
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
							<CardIcon>{levelIcons[item.level]}</CardIcon>
							<CardInformations count={item.amount} name={item.name} />
						</CardFlash>
					))}
				</CardWrapperRow>
			</CardRoot>
		</main>
	);
}
