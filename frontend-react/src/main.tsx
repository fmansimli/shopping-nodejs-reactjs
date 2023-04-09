import ReactDOM from "react-dom/client";
import App from "./App";

import { RecoilRoot } from "recoil";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
