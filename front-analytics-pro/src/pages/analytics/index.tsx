import {
  HeaderButton,
  HeaderIcon,
  HeaderRoot,
} from "@/components/interface/main/Header";
import { ChartLine } from "lucide-react";

export const Analytics = () => {
  return (
    <main className="flex h-full w-full flex-col">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Análises
        </HeaderIcon>

        <HeaderButton>Relatório</HeaderButton>
      </HeaderRoot>
    </main>
  );
};
