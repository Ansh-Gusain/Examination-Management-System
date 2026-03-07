import { Navigate, Outlet } from "react-router";
import { useAuth } from "../lib/auth-context";
import { Loader2 } from "lucide-react";
function AuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-background" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-3" }, /* @__PURE__ */ React.createElement(Loader2, { className: "w-8 h-8 animate-spin text-primary" }), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground" }, "Loading...")));
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ React.createElement(Navigate, { to: "/login/admin", replace: true });
  }
  return /* @__PURE__ */ React.createElement(Outlet, null);
}
export {
  AuthGuard
};
