import { CardStatus } from "@/components/interface/main/CardStatus";
import {
  HeaderRoot,
  HeaderIcon,
  HeaderButton,
} from "@/components/interface/main/Header";
import {
  ArrowRightToLine,
  Bug,
  ChartLine,
  Cigarette,
  Circle,
  CircleArrowLeft,
  Clipboard,
  FileWarning,
  Flag,
  Timer,
} from "lucide-react";

// API
const type = [
  {
    name: "request",
    count: 10,
  },
  {
    name: "incident",
    count: 20,
  },
];

const status = [
  {
    name: "veryLow",
    count: 1,
  },
  {
    name: "low",
    count: 2,
  },
  {
    name: "average",
    count: 2,
  },
  {
    name: "high",
    count: 2,
  },
  {
    name: "veryHigh",
    count: 2,
  },
];

export const levelTypeStyle: any = {
  request: "bg-red-400 border-red-700",
  incident: "bg-blue-400 border-blue-700",
};

export const levelTypeIcons: any = {
  request: Clipboard,
  incident: Bug,
};

export const levelPriorityStyle: any = {
  veryLow: "bg-green-400 text-gray-100 border-green-700",
  low: "bg-green-600 text-gray-100 border-green-800",
  average: "bg-yellow-400 text-white border-yellow-700",
  high: "bg-red-400 text-gray-100 border-red-700",
  veryHigh: "bg-red-600 text-gray-100 border-red-800",
};

export const dataStatusIcons: any = {
  veryLow: Circle,
  low: CircleArrowLeft,
  average: Cigarette,
  high: FileWarning,
  veryHigh: Flag,
};

export const Home = () => {
  return (
    <main className="flex  h-full w-full flex-col">
      <HeaderRoot>
        <HeaderIcon>
          <ChartLine size={30} className="text-orange-500" />
          Home
        </HeaderIcon>

        <HeaderButton>Relatório</HeaderButton>
      </HeaderRoot>

      <div>
        {type.map((row) => (
          <CardStatus
            title={row.name}
            count={row.count}
            iconClassName={levelTypeStyle[row.name]}
            icon={levelTypeIcons[row.name]}
          />
        ))}
      </div>

      <CardStatus
        title={"pending"}
        count={30}
        iconClassName="bg-yellow-400 border border-yellow-600 text-4xl"
        icon={Timer}
      />

      <div className="teanimate-pulse rounded-md border bg-gray-50 p-2 shadow-lg ">
        <ArrowRightToLine className="animate-pulse text-orange-600" />
      </div>

      <div>
        {status.map((row) => (
          <CardStatus
            title={row.name}
            count={row.count}
            iconClassName={levelPriorityStyle[row.name]}
            icon={dataStatusIcons[row.name]}
          />
        ))}
      </div>
    </main>
  );
};
