import { BrowserRouter } from "react-router-dom";
import { Routers } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};
