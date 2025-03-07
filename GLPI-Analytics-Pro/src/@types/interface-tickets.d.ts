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

type LevelType = "requisition" | "incident";
type LevelPriority = "veryLow" | "low" | "average" | "high" | "veryHigh";

export interface PropsTicketsType {
	id: number;
	level: LevelType;
	name: string;
	amount: number;
}

interface PropsTicketsStatus {
	id: number;
	name: string;
	amount: number;
}

interface PropsTicketsPriority {
	id: number;
	level: LevelPriority;
	name: string;
	amount: number;
}

export interface PropsTicketsResponse {
	type: PropsTicketsType[];
	currentStatus: PropsTicketsStatus;
	priority: PropsTicketsPriority[];
}

export interface PropsLevelPriorityIcons {
  veryLow: JSX.Element;
  low: JSX.Element;
  average: JSX.Element;
  high: JSX.Element;
  veryHigh: JSX.Element;
}

export interface PropsLevelPriorityStyle {
  veryLow: string;
  low: string;
  average: string;
  high: string;
  veryHigh: string;
}

export interface PropsLevelTypeIcons {
  requisition: JSX.Element;
  incident: JSX.Element;
}

export interface PropsLevelTypeStyle {
  requisition: string,
  incident: string
}