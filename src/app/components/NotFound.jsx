import React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
function NotFound() {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-16 h-16 text-muted-foreground mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: "mb-2" }, "Page Not Found"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.9rem] mb-6" }, "The page you're looking for doesn't exist."), /* @__PURE__ */ React.createElement(Link, { to: "/" }, /* @__PURE__ */ React.createElement(Button, null, "Back to Dashboard")));
}
export {
  NotFound
};
