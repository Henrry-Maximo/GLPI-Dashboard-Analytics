import type { PropsTicketsResponse } from "@/@types/interface-tickets";

export const dataTicketsHomeResponse: PropsTicketsResponse = {
	type: [
		{
			id: 1,
			level: "request",
			name: "Requisição",
			amount: 15,
		},
		{
			id: 2,
			level: "incident",
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