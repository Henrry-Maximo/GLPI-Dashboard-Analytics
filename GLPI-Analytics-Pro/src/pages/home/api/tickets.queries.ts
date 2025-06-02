import { useQuery } from "@tanstack/react-query";

import { fetchTicketsPending } from "@/http/fetch-tickets-pending";
import { fetchTicketsSummary } from "@/http/fetch-tickets-summary";

/* 

Funções para realizar fetch no backend utilizando o TanStack

queryKey -> chave única (reusar, refazer ou cachear)
queryFn -> função assíncrona que busca os dados (fetch, axios, graphql)
staleTime -> define quando o dado vira velho (em ms)
refetchInterval -> força o refetch automático a cada intervalo
refetchOnWindowFocus -> muda pra outra aba e volta, deve refazer a query?

*/

// export function useTicketsTechnician() {
//   return useQuery({
//     queryKey: ["ticketsTechnician"],
//     queryFn: fetchTicketsTechnician,
//     staleTime: 1000 * 60,
//     refetchInterval: 1000 * 5, // 5 segundos
//     refetchOnWindowFocus: true,
//   });
// }

export function useTicketsPending() {
  return useQuery({
    queryKey: ["ticketsPending"],
    queryFn: fetchTicketsPending,
    refetchInterval: 1000 * 5, // 5 segundos
    refetchOnWindowFocus: true,
  });
}

export function useTicketsSummary() {
  return useQuery({
    queryKey: ["ticketsSummary"],
    queryFn: fetchTicketsSummary,
    staleTime: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: true,
  });
}
