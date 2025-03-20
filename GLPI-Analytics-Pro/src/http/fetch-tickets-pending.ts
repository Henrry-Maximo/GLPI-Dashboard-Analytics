import { fetchWithAuth } from "./middlewares/verify-jwt-authenticate";

type propsTicketsPendingResponse = {
	id: number;
	title: string;
	date_cretion: string;
	solvedate: string;
	location: string;
	applicant: string;
	technical: string;
	status: string;
	priority: string;
	type: number;
};

interface fetchTicketsPendingResponse {
	list: propsTicketsPendingResponse[];
	meta: {
		priority: Array<{ name: string; count: number }>;
		type: Array<{ name: string; count: number }>;
	};
}

export async function fetchTicketsPending(): Promise<fetchTicketsPendingResponse> {
	const API_URL = import.meta.env.VITE_API_URL;

	const response = await fetchWithAuth(`${API_URL}/api/tickets/pending`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erro ao buscar os chamados.");
	}

	return response.json();
}
