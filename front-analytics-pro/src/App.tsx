import { BrowserRouter } from "react-router-dom";
import { Routers } from "./routes";
import { TooltipProvider } from "./components/ui/tooltip";

export const App = () => {
  return (
    
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};
