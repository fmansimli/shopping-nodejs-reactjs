import ReactDOM from "react-dom/client";
import App from "./App";

import { RecoilRoot } from "recoil";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import { values } from "./swr";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <SWRConfig value={values}>
      <App />
    </SWRConfig>
  </RecoilRoot>,
);
