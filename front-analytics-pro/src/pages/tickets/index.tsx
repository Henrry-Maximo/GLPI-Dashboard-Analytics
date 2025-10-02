import {
  HeaderRoot,
  HeaderIcon,
  HeaderButton,
} from "@/components/interface/main/Header";
import { ChartLine } from "lucide-react";

export const Tickets = () => {
  return (
    <main className="flex h-full w-full flex-col">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Chamados
        </HeaderIcon>

        <HeaderButton>Relatório</HeaderButton>
      </HeaderRoot>
    </main>
  );
};
