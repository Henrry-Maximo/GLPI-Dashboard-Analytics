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
} from "./components/Card";

import { Bug, ChartLine, ClipboardText } from "phosphor-react";

export default function Home() {
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
				amount: 6,
			},
			{
				id: 5,
				level: "veryHigh",
				name: "Muito Alta",
				amount: 4,
			},
		],
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
								<CardIcon aria-label="Request" className="bg-blue-700">
									<ClipboardText size={22} />
								</CardIcon>
							) : (
								<CardIcon aria-label="Incident" className="bg-red-700">
									<Bug size={22} />
								</CardIcon>
							)}

							<CardInformations count={row.amount} name={row.name} />
						</CardFlash>
					))}
				</CardWrapperCol>
			</CardRoot>
		</main>
	);
}
