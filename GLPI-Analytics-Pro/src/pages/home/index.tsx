// import { dataTicketsHomeResponse } from "@/data/ticketsData";

import {
  CardFlash,
  CardIcon,
  CardInformations,
  CardRoot,
  CardWrapper,
} from "@/components/Card/Card";

import { ArrowsLeftRight, Timer } from "phosphor-react";

import { Header } from "./header";

import {
  levelPriorityIcons,
  levelPriorityStyle,
  levelTypeIcons,
  levelTypeStyle,
  priorityTranslations,
  typeTranslations,
} from "./definitions";
import { BarChartsTickets } from "./components/BarCharts";
import { useTicketsPending } from "./api/tickets.queries";
import { useEffect, useState } from "react";
import { SpinnerBall } from "@phosphor-icons/react";

export default function Home() {
  const { data: statusData, isLoading: isLoadingStatus } = useTicketsPending();
  // const { data: technicianData } = useTicketsTechnician();
  const [statusTickets, setStatusTickets] = useState(statusData);

  useEffect(() => {
    setStatusTickets(statusData);
  }, [statusData]);

  if (isLoadingStatus || !statusTickets) {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <SpinnerBall className="text-zinc-700 animate-spin size-10" />
        <span className="text-xs font-light">Loading...</span>
      </div>
    );
  }

  console.log(statusTickets);
  return (
    <main className="flex flex-col w-full h-[max-content] flex-1">
      {statusTickets && (
        <>
          <Header name="Dashboard" />

          <CardRoot>
            {/* style default: but add style custom */}
            <CardWrapper>
              {statusTickets.meta.type.map((row) => (
                <CardFlash key={row.name}>
                  <CardIcon className={levelTypeStyle[row.name]}>
                    {levelTypeIcons[row.name]}
                  </CardIcon>

                  <CardInformations
                    count={row.count}
                    name={typeTranslations[row.name]}
                  />
                </CardFlash>
              ))}
            </CardWrapper>

            <CardWrapper>
              <CardFlash key={statusTickets.meta.total}>
                <CardIcon className="bg-yellow-400 border border-yellow-600 text-4xl">
                  <Timer />
                </CardIcon>
                <CardInformations
                  className="text-5xl"
                  count={statusTickets.meta.total}
                  name={statusTickets.meta.total > 0 ? "Pendente" : "-"}
                />
              </CardFlash>
            </CardWrapper>

            <CardIcon className="bg-white p-2 teanimate-pulse">
              <ArrowsLeftRight className="text-orange-600 animate-pulse" />
            </CardIcon>

            <CardWrapper className="flex flex-row">
              {statusTickets.meta.priority.map((row) => (
                <CardFlash key={row.name}>
                  <CardIcon className={levelPriorityStyle[row.name]}>
                    {levelPriorityIcons[row.name]}
                  </CardIcon>

                  <CardInformations
                    count={row.count}
                    name={priorityTranslations[row.name]}
                  />
                </CardFlash>
              ))}
            </CardWrapper>
          </CardRoot>

          <div className="flex flex-col max-h-screen w-full mt-2">
            {/* <BarChartsTickets
              priority={summaryData.priority}
              status={summaryData.status}
              categorie={summaryData.categories}
              concludes={summaryData.concludes}
              delayed={summaryData.delayed}
              // technician={technicianData}
            /> */}
          </div>
        </>
      )}
    </main>
  );
}
