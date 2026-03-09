import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { StoreProvider } from "./lib/store";
import { Toaster } from "sonner";
function App() {
  return /* @__PURE__ */ React.createElement(StoreProvider, null, /* @__PURE__ */ React.createElement(RouterProvider, { router }), /* @__PURE__ */ React.createElement(Toaster, { position: "top-right", richColors: true }));
}
export {
  App as default
};
