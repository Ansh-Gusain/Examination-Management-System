import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useStore } from "../lib/store";
function LoginAdmin() {
  const navigate = useNavigate();
  const { setCurrentRole } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setCurrentRole("admin");
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Please enter valid credentials");
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement(Card, { className: "border border-gray-700 shadow-2xl bg-gray-900 text-white" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "space-y-3 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-full bg-white/10" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-10 h-10 text-white" }))), /* @__PURE__ */ React.createElement(CardTitle, { className: "text-center text-2xl text-white" }, "Admin Login"), /* @__PURE__ */ React.createElement(CardDescription, { className: "text-center text-gray-400" }, "Manage exams, seating, invigilation & attendance")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement(GoogleSignInButton, null)), /* @__PURE__ */ React.createElement("div", { className: "relative mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "w-full border-t border-gray-700" })), /* @__PURE__ */ React.createElement("div", { className: "relative flex justify-center text-xs uppercase" }, /* @__PURE__ */ React.createElement("span", { className: "bg-gray-900 px-2 text-gray-500" }, "OR"))), /* @__PURE__ */ React.createElement("form", { onSubmit: handleLogin, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "email", className: "text-gray-300" }, "Email Address"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
      required: true,
      className: "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "password", className: "text-gray-300" }, "Password"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
      required: true,
      className: "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowPassword(!showPassword),
      className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
    },
    showPassword ? /* @__PURE__ */ React.createElement(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(Eye, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-sm" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-2 cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "rounded bg-gray-800 border-gray-600" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-400" }, "Remember me")), /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-gray-400 hover:text-white hover:underline" }, "Forgot password?")), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full bg-white text-black hover:bg-gray-200", size: "lg" }, "Login to Dashboard")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 pt-6 border-t border-gray-700 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-500" }, "Need help?", " ", /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-gray-400 hover:text-white hover:underline" }, "Contact IT Support"))))), /* @__PURE__ */ React.createElement("p", { className: "text-center text-xs text-gray-600 mt-6" }, "By logging in, you agree to our Terms of Service and Privacy Policy")));
}
export {
  LoginAdmin
};
