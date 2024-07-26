import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <div
        className=" flex flex-col h-screen"
      >
        <Header />
        <div style={{ display: "flex", flex: "1" }}>
          <Sidebar />
        </div>
        {/* <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", overflow: "auto" }}>MAIN</div> */}
      </div>
    </>
  );
}
