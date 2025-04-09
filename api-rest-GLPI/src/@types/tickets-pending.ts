export interface PropsDataTickets {
  data: PropsTickets[];
}

export interface PropsTickets {
  id: number;
  title: string;
  status: TicketStatus;
  date_creation: string;
  solvedate: string;
  location: string;
  applicant: string;
  technical: string;
  type: TicketType;
  priority: PriorityLevel;
}

enum TicketType {
  INCIDENT = 1,
  REQUEST = 2,
}

enum PriorityLevel {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  CRITICAL = 5,
}

export enum TicketStatus {
  NEW = "new",
  PROCESSING_ASSIGNED = "processing (assigned)",
  PROCESSING_PLANNED = "processing (planned)",
  PENDING = "pending",
  SOLVED = "solved",
  CLOSED = "closed",
}