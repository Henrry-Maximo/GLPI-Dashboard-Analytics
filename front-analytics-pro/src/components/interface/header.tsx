import { Bell, HelpCircle, LucideSidebar, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export const Header = ({ onOpenSidebar }: any) => {
  return (
    <div className="flex h-16 items-center justify-between border border-b-orange-500 bg-gray-50 p-8 text-slate-900">
      <div>
        <Button
          onClick={onOpenSidebar}
          type="button"
          className="group flex items-center gap-2 rounded border border-white bg-slate-100 p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
        >
          <LucideSidebar className="h-5 w-5 text-gray-700 transition duration-300 ease-in-out group-hover:text-orange-500" />
        </Button>
      </div>

      <img src={logo} alt="Logo" className="h-18 w-24" />

      <div className="flex flex-row items-center gap-4">
        <Popover>
          <PopoverTrigger className="group flex items-center gap-2 rounded border border-white bg-slate-100 p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white">
            <Bell className="h-5 w-5 text-gray-700 transition duration-300 ease-in-out group-hover:text-orange-500" />
          </PopoverTrigger>
          <PopoverContent>Você não tem novas notificações</PopoverContent>
        </Popover>

        <Link
          className="group flex items-center gap-2 rounded border border-white bg-slate-100 p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Help"
          to="/home/help"
        >
          <HelpCircle className="h-5 w-5 text-gray-700 transition duration-300 ease-in-out group-hover:text-orange-500" />
        </Link>
        <Link
          className="group flex items-center gap-2 rounded border border-white bg-slate-100 p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Settings"
          to="/home/settings"
        >
          <Settings className="h-5 w-5 text-gray-700 transition duration-300 ease-in-out group-hover:text-orange-500" />
        </Link>
      </div>
    </div>
  );
};
