import { Footer } from "@/components/interface/footer";
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

        <div className="mx-6 mt-6 flex flex-grow overflow-y-auto bg-red-700">
          <Outlet />
        </div>
      </div>
    </>
  );
};
