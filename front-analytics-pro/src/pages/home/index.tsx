import { CardStatus } from "@/components/interface/main/CardStatus";
import {
  HeaderRoot,
  HeaderIcon,
  HeaderButton,
} from "@/components/interface/main/Header";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftRight,
  Bug,
  ChartLine,
  Circle,
  CircleAlert,
  CircleDot,
  CircleEllipsis,
  Clipboard,
  FileText,
  Flag,
  Maximize,
  Timer,
} from "lucide-react";
import { ChartAreaInteractive } from "@/components/interface/main/AreaChart";
import { ChartLineLabel } from "@/components/interface/main/LineChart";
import { ChartPieDonutText } from "@/components/interface/main/PieChart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// API
const type = [
  {
    id: 0,
    name: "request",
    count: 10,
  },
  {
    id: 1,
    name: "incident",
    count: 20,
  },
];

const status = [
  {
    id: 1,
    name: "veryLow",
    count: 1,
  },
  {
    id: 2,
    name: "low",
    count: 2,
  },
  {
    id: 3,
    name: "average",
    count: 2,
  },
  {
    id: 4,
    name: "high",
    count: 2,
  },
  {
    id: 5,
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
  low: CircleDot,
  average: CircleEllipsis,
  high: CircleAlert,
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

        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <HeaderButton>
                <Maximize size={16} />
              </HeaderButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tela Cheia</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <HeaderButton>
                <FileText size={16} />
              </HeaderButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Relatório</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </HeaderRoot>

      <Separator />

      <div className="mb-4 mt-4 flex flex-row items-center gap-4">
        <div className="flex w-44 flex-col gap-4">
          {type.map((row) => (
            <CardStatus
              key={row.id}
              title={row.name}
              count={row.count}
              className="flex gap-4 p-4"
              iconClassName={levelTypeStyle[row.name]}
              icon={levelTypeIcons[row.name]}
            />
          ))}
        </div>

        <CardStatus
          key={1}
          title={"pending"}
          count={30}
          className="flex-2 flex h-3/5 gap-8 pl-8 pr-8"
          iconClassName="bg-yellow-400 border border-yellow-600 text-4xl"
          icon={Timer}
          size={40}
        />

        <div className="teanimate-pulse h-9 rounded-md border bg-gray-50 p-2 shadow-lg">
          <ArrowLeftRight className="animate-pulse text-orange-600" />
        </div>

        <div className="flex flex-1 gap-2">
          {status.map((row) => (
            <CardStatus
              key={row.id}
              title={row.name}
              count={row.count}
              className="w-full gap-4 p-4"
              iconClassName={levelPriorityStyle[row.name]}
              icon={dataStatusIcons[row.name]}
            />
          ))}
        </div>
      </div>

      <Separator className="mb-4" />

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 ">
        <ChartLineLabel />
        <ChartAreaInteractive />
        <ChartPieDonutText />
      </div>
    </main>
  );
};
