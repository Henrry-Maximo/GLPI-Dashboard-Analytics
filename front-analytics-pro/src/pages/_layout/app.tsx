import { Header } from "@/components/interface/header";
import { Sidebar } from "@/components/interface/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// 👌 Todo: Adding more state controller content visible (hide sidebar/header, add button)

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  function handlerSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <TooltipProvider>
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <div className="col-span-full">
            <Header onOpenSidebar={handlerSidebar} />
          </div>

          <Sidebar disabled={isOpen} />

          <div className="flex flex-1 overflow-y-auto bg-white p-4">
            <Outlet />
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};
