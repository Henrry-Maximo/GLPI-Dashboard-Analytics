import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ComponentProps } from "react";

interface CardStatusProps extends ComponentProps<"div"> {
  count: number;
  title: string;
  icon: React.ElementType;
  iconClassName: string;
}

export function CardStatus({
  count,
  title,
  icon: Icon,
  iconClassName,
}: CardStatusProps) {
  return (
    <Card className="grid w-full grid-cols-[auto_1fr] rounded-md bg-gray-50 shadow-lg">
      <CardHeader className="items-center gap-4 p-4">
        <div
          className={`flex items-center justify-center rounded-md border p-4 text-2xl text-white shadow-lg ${iconClassName}`}
        >
          <Icon />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center p-0 text-center">
        <span className="font-heading text-2xl font-semibold leading-none text-gray-800">
          {count}
        </span>
        <span className="text-sm font-light">{title}</span>
      </CardContent>
    </Card>
  );
}
