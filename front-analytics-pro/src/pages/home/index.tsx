import {
  HeaderRoot,
  HeaderIcon,
  HeaderButton,
} from "@/components/interface/main/Header";
import { ChartLine } from "lucide-react";

export const Home = () => {
  return (
    <main className="flex h-full w-full flex-col">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Home
        </HeaderIcon>

        <HeaderButton>Relatório</HeaderButton>
      </HeaderRoot>
    </main>
  );
};
