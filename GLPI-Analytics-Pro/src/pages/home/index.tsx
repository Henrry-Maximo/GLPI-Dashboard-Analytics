import { dataTicketsHomeResponse } from "@/data/ticketsData";

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
	ArrowFatLinesRight,
	ArrowRight,
	ArrowsLeftRight,
	Bug,
	CaretCircleDoubleUp,
	ChartLine,
	Circle,
	CircleHalf,
	ClipboardText,
	Flame,
	Timer,
	Warning,
} from "phosphor-react";

import type {
	PropsLevelPriorityIcons,
	PropsLevelPriorityStyle,
	PropsLevelTypeIcons,
	PropsLevelTypeStyle,
} from "@/@types/interface-tickets";

export default function Home() {
	const levelTypeIcons: PropsLevelTypeIcons = {
		requisition: <ClipboardText />,
		incident: <Bug />,
	};

	const levelTypeStyle: PropsLevelTypeStyle = {
		requisition: "bg-red-400 border-red-700",
		incident: "bg-blue-400 border-blue-700",
	};

	const levelPriorityIcons: PropsLevelPriorityIcons = {
		veryLow: <Circle />,
		low: <CircleHalf />,
		average: <CaretCircleDoubleUp />,
		high: <Warning />,
		veryHigh: <Flame />,
	};

	const levelPriorityStyle: PropsLevelPriorityStyle = {
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
							<CardIcon className={levelTypeStyle[row.level]}>
								{levelTypeIcons[row.level]}
							</CardIcon>

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

				<CardIcon className="bg-white p-2 teanimate-pulse">
					<ArrowsLeftRight className="text-orange-600 animate-pulse"/>
				</CardIcon>

				<CardWrapperRow>
					{dataTicketsHomeResponse.priority.map((row) => (
						<CardFlash key={row.id}>
							<CardIcon className={levelPriorityStyle[row.level]}>
								{levelPriorityIcons[row.level]}
							</CardIcon>
							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}
				</CardWrapperRow>
			</CardRoot>
		</main>
	);
}
