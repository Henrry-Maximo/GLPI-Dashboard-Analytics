import { Header } from "@/components/interface/header";
import { Sidebar } from "@/components/interface/sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <div className="col-span-full">
          <Header />
        </div>

        <Sidebar />

        <div className="flex flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};
