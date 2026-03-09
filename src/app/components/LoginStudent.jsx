import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useStore } from "../lib/store";
function LoginStudent() {
  const navigate = useNavigate();
  const { students, setCurrentRole, setLoggedInStudentId } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: "",
    password: ""
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.rollNumber && formData.password) {
      const matched = students.find(
        (s) => s.rollNumber.toLowerCase() === formData.rollNumber.toLowerCase()
      );
      const selectedStudent = matched || students[0];
      setCurrentRole("student");
      setLoggedInStudentId(selectedStudent.id);
      toast.success(`Welcome, ${selectedStudent.name}!`);
      navigate("/student");
    } else {
      toast.error("Please enter valid credentials");
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement(Card, { className: "border-2 shadow-xl" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "space-y-3 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-full bg-blue-100" }, /* @__PURE__ */ React.createElement(GraduationCap, { className: "w-10 h-10 text-blue-600" }))), /* @__PURE__ */ React.createElement(CardTitle, { className: "text-center text-2xl" }, "Student Login"), /* @__PURE__ */ React.createElement(CardDescription, { className: "text-center" }, "View your exam schedule and seat allocation")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement(GoogleSignInButton, null)), /* @__PURE__ */ React.createElement("div", { className: "relative mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "w-full border-t" })), /* @__PURE__ */ React.createElement("div", { className: "relative flex justify-center text-xs uppercase" }, /* @__PURE__ */ React.createElement("span", { className: "bg-card px-2 text-muted-foreground" }, "OR"))), /* @__PURE__ */ React.createElement("form", { onSubmit: handleLogin, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "rollNumber" }, "Roll Number"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "rollNumber",
      type: "text",
      placeholder: "e.g., CS3001",
      value: formData.rollNumber,
      onChange: (e) => setFormData({ ...formData, rollNumber: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-muted-foreground" }, "Demo: Enter any roll number (e.g., CS3001, EC3021) with any password")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "password" }, "Password"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowPassword(!showPassword),
      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    },
    showPassword ? /* @__PURE__ */ React.createElement(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(Eye, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-sm" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-2 cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "rounded" }), /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Remember me")), /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-blue-600 hover:underline" }, "Forgot password?")), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700", size: "lg" }, "Login to Portal")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 pt-6 border-t text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground" }, "Need help?", " ", /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-blue-600 hover:underline" }, "Contact Student Affairs"))))), /* @__PURE__ */ React.createElement("p", { className: "text-center text-xs text-muted-foreground mt-6" }, "By logging in, you agree to our Terms of Service and Privacy Policy")));
}
export {
  LoginStudent
};
