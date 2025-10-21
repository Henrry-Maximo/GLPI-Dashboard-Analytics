import {
  HeaderRoot,
  HeaderIcon,
  HeaderButton,
} from "@/components/interface/main/header";
import { ChartLine } from "lucide-react";

export const Statistics = () => {
  return (
    <main className="flex h-full w-full flex-col">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Estatísticas
        </HeaderIcon>

        <HeaderButton>Relatório</HeaderButton>
      </HeaderRoot>
    </main>
  );
};
