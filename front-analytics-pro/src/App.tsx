import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Sidebar } from "./components/ui/sidebar"

export const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button>Enviar</Button>
      <Input />
      <Sidebar />
    </div>
  );
}
