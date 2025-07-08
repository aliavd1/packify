import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/style.css";
import "./styles/fontawesome.min.css";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
