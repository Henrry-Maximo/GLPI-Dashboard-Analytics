import { dataTicketsHomeResponse } from "@/data/ticketsData";

import {
	CardFlash,
	CardIcon,
	CardInformations,
	CardRoot,
	CardWrapperCol,
	CardWrapperRow,
} from "./components/Card";

import {
	ArrowsLeftRight, Timer
} from "phosphor-react";

import { Header } from "./header";
import {
	levelPriorityIcons,
	levelPriorityStyle,
	levelTypeIcons,
	levelTypeStyle,
} from "./definitions";

export default function Home() {
	return (
		<main className="flex flex-col w-full h-[max-content] flex-1">
			<Header name="Dashboard" />

			<CardRoot>
				{/* style default: but add style custom */}
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

				<CardWrapperCol>
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
				</CardWrapperCol>

				<CardIcon className="bg-white p-2 teanimate-pulse">
					<ArrowsLeftRight className="text-orange-600 animate-pulse" />
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
