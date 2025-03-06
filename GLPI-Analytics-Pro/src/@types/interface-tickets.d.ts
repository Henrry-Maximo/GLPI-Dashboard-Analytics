export type Ticket = {
  id: number;
  entities_id: number;
  name: string;
  date_creation: string;
  solvedate: string | null;
  date_mod: string;
  location: string;
  applicant: string;
  technical: string;
  status: string;
  priority: string;
};

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

interface PropsLevelIcons {
  veryLow: JSX.Element;
  low: JSX.Element;
  average: JSX.Element;
  high: JSX.Element;
  veryHigh: JSX.Element;
}

interface PropsLevelBackground {
  veryLow: string;
  low: string;
  average: string;
  high: string;
  veryHigh: string;
}
