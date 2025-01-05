export type Ticket = {
  id: number;
  entities_id: number;
  name: string;
  date_creation: string;
  solvedate: string | null;
  date_mod: string;
  location: string;
  requerent: string;
  technical: string;
  status: string;
  priority: string;
};
