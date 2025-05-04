import { RouterProvider } from "react-router";
import { appRouter } from "./router";
import "./app.css";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
