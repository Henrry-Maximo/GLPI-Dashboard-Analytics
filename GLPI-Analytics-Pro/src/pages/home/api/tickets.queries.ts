import { fetchTicketsPending } from "@/http/fetch-tickets-pending";
import { fetchTicketsTechnician } from "@/http/fetch-tickets-technician";
import { useQuery } from "@tanstack/react-query";

export function useTicketsTechnician() {
  return useQuery({
    queryKey: ["ticketsTechnician"],
    queryFn: fetchTicketsTechnician,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 5,
    refetchOnWindowFocus: true,
  });
}

export function useTicketsPending() {
  return useQuery({
    queryKey: ["ticketsPending"],
    queryFn: fetchTicketsPending,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 5,
    refetchOnWindowFocus: true,
  });
}
