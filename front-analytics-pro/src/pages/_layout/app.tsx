import { Footer } from "@/components/interface/footer";
import { Header } from "@/components/interface/header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header />

      <div>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
