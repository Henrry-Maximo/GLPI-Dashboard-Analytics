import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Header = () => {
  return (
    <div>
      <h1>Header</h1>
      <Popover>
        <PopoverTrigger>
          <Bell />
        </PopoverTrigger>
        <PopoverContent>Você não tem novas notificações</PopoverContent>
      </Popover>
    </div>
  );
};
