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
  [veryLow: string]: JSX.Element;
  [low: string]: JSX.Element;
  [average: string]: JSX.Element;
  [high: string]: JSX.Element;
  [veryHigh: string]: JSX.Element;
}

export interface PropsLevelPriorityStyle {
  [veryLow: string]: string;
  [low: string]: string;
  [average: string]: string;
  [high: string]: string;
  [veryHigh: string]: string;
}

export interface PropsLevelTypeIcons {
  [request: string]: JSX.Element;
  [incident: string]: JSX.Element;
}

export interface PropsLevelTypeStyle {
  [request: string]: string;
  [incident: string]: string;
}

export interface PropsLevelTypeIcons {
  request: JSX.Element;
  incident: JSX.Element;
}

export interface PropsLevelTypeStyle {
  request: string,
  incident: string
}