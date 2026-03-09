import React from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Shield, BookOpen, GraduationCap } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";
function RoleSelection() {
  const navigate = useNavigate();
  const roles = [
    {
      title: "Admin",
      description: "Manage exams, seating, invigilation & attendance",
      icon: Shield,
      path: "/login/admin",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:border-blue-300"
    },
    {
      title: "Faculty",
      description: "View invigilation duties & mark attendance",
      icon: BookOpen,
      path: "/login/faculty",
      color: "bg-green-100",
      iconColor: "text-green-600",
      hoverColor: "hover:border-green-300"
    },
    {
      title: "Student",
      description: "View your exam schedule and seat allocation",
      icon: GraduationCap,
      path: "/login/student",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverColor: "hover:border-purple-300"
    }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-full bg-primary/10" }, /* @__PURE__ */ React.createElement(GraduationCap, { className: "w-12 h-12 text-primary" }))), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl tracking-tight mb-2" }, "ExamManager"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "Automated Examination Seating, Invigilation & Attendance Management")), /* @__PURE__ */ React.createElement(Card, { className: "border-2 shadow-xl" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-4" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-center text-xl" }, "Sign In"), /* @__PURE__ */ React.createElement(CardDescription, { className: "text-center" }, "Use your college Gmail or select a role to continue")), /* @__PURE__ */ React.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(GoogleSignInButton, null), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-center text-muted-foreground mt-2" }, "Sign in with your college Gmail account")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "w-full border-t" })), /* @__PURE__ */ React.createElement("div", { className: "relative flex justify-center text-xs uppercase" }, /* @__PURE__ */ React.createElement("span", { className: "bg-card px-2 text-muted-foreground" }, "Or sign in with credentials"))), roles.map((role) => /* @__PURE__ */ React.createElement(
    Button,
    {
      key: role.title,
      variant: "outline",
      className: `w-full h-auto py-4 px-4 justify-start gap-4 ${role.hoverColor} transition-colors`,
      onClick: () => navigate(role.path)
    },
    /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-full ${role.color}` }, /* @__PURE__ */ React.createElement(role.icon, { className: `w-6 h-6 ${role.iconColor}` })),
    /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("div", { className: "text-[0.9rem]" }, role.title), /* @__PURE__ */ React.createElement("div", { className: "text-[0.75rem] text-muted-foreground" }, role.description))
  )))), /* @__PURE__ */ React.createElement("p", { className: "text-center text-xs text-muted-foreground mt-6" }, "By logging in, you agree to our Terms of Service and Privacy Policy")));
}
export {
  RoleSelection
};
