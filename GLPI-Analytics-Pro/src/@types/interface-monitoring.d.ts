export type DetailsMonitoringResponse = {
  id: number;
  title: string;
  date_creation: string;
  location: string;
  firstname: string;
  realname: string;
  validation_date: date;
  comment_validation: string;
  status: string;
  priority: string;
  validation_status: string;
};

export type DetailsTicketsResponse = [
  {
    date_creation: string;
    entities: string;
    id: number;
    title: string;
    location: string;
    applicant: string;
    technical: string;
    status: string;
    priority: string;
  },
];


