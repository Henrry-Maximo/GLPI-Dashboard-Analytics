import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col h-screen grid-cols-app">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex flex-1 flex-col px-4 pb-12 pt-14 bg-white">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 underline">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded shadow">
                  <h3 className="text-lg font-medium">Métrica 1</h3>
                  <p className="mt-2 text-3xl font-bold">123</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow">
                  <h3 className="text-lg font-medium">Métrica 2</h3>
                  <p className="mt-2 text-3xl font-bold">456</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow">
                  <h3 className="text-lg font-medium">Métrica 3</h3>
                  <p className="mt-2 text-3xl font-bold">789</p>
                </div>
              </div>
            </section>

            <section className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">Detailed Analysis</h2>
              <div className="p-0.5 rounded shadow flex-1">
                <div className="h-64 bg-gray-100 rounded p-1">
                  Chart or Detailed Content Here
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
