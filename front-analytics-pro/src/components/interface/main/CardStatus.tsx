import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { ComponentProps } from "react";

interface CardStatusProps extends ComponentProps<"div"> {
  count: number;
  title: string;
  icon: React.ElementType;
  iconClassName: string;
  className?: string;
  size?: number;
}

export function CardStatus({
  count,
  title,
  icon: Icon,
  iconClassName,
  className
}: CardStatusProps) {
  return (
    <Card
      className={`grid grid-cols-[auto_1fr] items-center justify-center rounded-md bg-gray-50 shadow-lg ${className}`}
    >
      <CardHeader className="items-center gap-4 p-0">
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
