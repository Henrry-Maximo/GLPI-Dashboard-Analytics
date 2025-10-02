import {
  HeaderRoot,
  HeaderIcon,
  HeaderButton,
} from "@/components/interface/main/Header";
import { ChartLine } from "lucide-react";

export const Monitoring = () => {
  return (
    <main className="flex h-full w-full flex-col">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Monitoramento
        </HeaderIcon>

        <HeaderButton>Relatório</HeaderButton>
      </HeaderRoot>
    </main>
  );
};
