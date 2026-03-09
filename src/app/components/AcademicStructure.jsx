import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  School,
  BookOpen,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Building2,
  User,
  Clock,
  Award,
  FlaskConical,
  FolderOpen,
  Layers,
  ArrowLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { schools } from "../lib/academic-data";
const typeColors = {
  core: "bg-blue-100 text-blue-700",
  elective: "bg-amber-100 text-amber-700",
  lab: "bg-green-100 text-green-700",
  project: "bg-purple-100 text-purple-700"
};
const typeLabels = {
  core: "Core",
  elective: "Elective",
  lab: "Lab",
  project: "Project"
};
function CourseTable({ courses, semLabel }) {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  return /* @__PURE__ */ React.createElement("div", { className: "border border-border rounded-lg overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-accent/50 px-4 py-2 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-[0.8rem] font-medium" }, semLabel), /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.65rem]" }, totalCredits, " Credits \u2022 ", courses.length, " Courses")), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-[0.8rem]" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "border-b border-border bg-muted/30" }, /* @__PURE__ */ React.createElement("th", { className: "text-left px-4 py-2 font-medium text-muted-foreground" }, "Code"), /* @__PURE__ */ React.createElement("th", { className: "text-left px-4 py-2 font-medium text-muted-foreground" }, "Course Name"), /* @__PURE__ */ React.createElement("th", { className: "text-center px-4 py-2 font-medium text-muted-foreground" }, "Credits"), /* @__PURE__ */ React.createElement("th", { className: "text-center px-4 py-2 font-medium text-muted-foreground" }, "Type"))), /* @__PURE__ */ React.createElement("tbody", null, courses.map((course) => /* @__PURE__ */ React.createElement("tr", { key: course.code, className: "border-b border-border last:border-0 hover:bg-accent/30 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-2 font-mono text-[0.75rem]" }, course.code), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-2" }, course.name), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-2 text-center font-medium" }, course.credits), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-2 text-center" }, /* @__PURE__ */ React.createElement(Badge, { className: `text-[0.6rem] ${typeColors[course.type]}` }, typeLabels[course.type]))))))));
}
function YearView({ year, programmeShortName }) {
  const [expanded, setExpanded] = useState(false);
  const allCourses = [...year.semester1, ...year.semester2];
  const totalCredits = allCourses.reduce((sum, c) => sum + c.credits, 0);
  return /* @__PURE__ */ React.createElement("div", { className: "border border-border rounded-lg overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setExpanded(!expanded),
      className: "w-full flex items-center justify-between px-4 py-3 hover:bg-accent/30 transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Layers, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium" }, "Year ", year.year), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Semester ", year.year * 2 - 1, " & ", year.year * 2, " \u2022 ", allCourses.length, " Courses \u2022 ", totalCredits, " Credits"))),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex gap-1" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, year.semester1.length, " courses in Sem ", year.year * 2 - 1), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, year.semester2.length, " courses in Sem ", year.year * 2)), expanded ? /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4 text-muted-foreground" }))
  ), expanded && /* @__PURE__ */ React.createElement("div", { className: "p-4 pt-0 space-y-4" }, /* @__PURE__ */ React.createElement(
    CourseTable,
    {
      courses: year.semester1,
      semLabel: `Semester ${year.year * 2 - 1}`
    }
  ), /* @__PURE__ */ React.createElement(
    CourseTable,
    {
      courses: year.semester2,
      semLabel: `Semester ${year.year * 2}`
    }
  )));
}
function ProgrammeView({ programme, onBack }) {
  const allCourses = programme.curriculum.flatMap((y) => [...y.semester1, ...y.semester2]);
  const coreCount = allCourses.filter((c) => c.type === "core").length;
  const electiveCount = allCourses.filter((c) => c.type === "elective").length;
  const labCount = allCourses.filter((c) => c.type === "lab").length;
  const projectCount = allCourses.filter((c) => c.type === "project").length;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "text-[0.8rem] -ml-2" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4 mr-1" }), " Back to Programmes"), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[1rem]" }, programme.name), /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] text-muted-foreground mt-1" }, programme.degree, " \u2022 ", programme.duration, " Year", programme.duration > 1 ? "s" : "", " Programme")), /* @__PURE__ */ React.createElement(Badge, { className: "text-[0.7rem] bg-indigo-100 text-indigo-700 shrink-0" }, programme.totalCredits, " Total Credits"))), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 p-2.5 rounded-lg bg-blue-50" }, /* @__PURE__ */ React.createElement(BookOpen, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-semibold text-blue-700" }, coreCount), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-blue-600" }, "Core Courses"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 p-2.5 rounded-lg bg-amber-50" }, /* @__PURE__ */ React.createElement(FolderOpen, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-semibold text-amber-700" }, electiveCount), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-amber-600" }, "Electives"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 p-2.5 rounded-lg bg-green-50" }, /* @__PURE__ */ React.createElement(FlaskConical, { className: "w-4 h-4 text-green-600" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-semibold text-green-700" }, labCount), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-green-600" }, "Lab Courses"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 p-2.5 rounded-lg bg-purple-50" }, /* @__PURE__ */ React.createElement(Award, { className: "w-4 h-4 text-purple-600" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-semibold text-purple-700" }, projectCount), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-purple-600" }, "Projects")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, programme.curriculum.map((year) => /* @__PURE__ */ React.createElement(YearView, { key: year.year, year, programmeShortName: programme.shortName }))))));
}
function AcademicStructure() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  if (selectedProgramme && selectedSchool && selectedBranch) {
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Academic Structure"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-[0.75rem] text-muted-foreground mt-1 flex-wrap" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setSelectedSchool(null);
      setSelectedBranch(null);
      setSelectedProgramme(null);
    }, className: "hover:text-foreground transition-colors" }, "Schools"), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3" }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setSelectedBranch(null);
      setSelectedProgramme(null);
    }, className: "hover:text-foreground transition-colors" }, selectedSchool.shortName), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3" }), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedProgramme(null), className: "hover:text-foreground transition-colors" }, selectedBranch.shortName), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3" }), /* @__PURE__ */ React.createElement("span", { className: "text-foreground font-medium" }, selectedProgramme.shortName))), /* @__PURE__ */ React.createElement(
      ProgrammeView,
      {
        programme: selectedProgramme,
        onBack: () => setSelectedProgramme(null)
      }
    ));
  }
  if (selectedSchool) {
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Academic Structure"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-[0.75rem] text-muted-foreground mt-1" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setSelectedSchool(null);
      setSelectedBranch(null);
    }, className: "hover:text-foreground transition-colors" }, "Schools"), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3" }), selectedBranch ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedBranch(null), className: "hover:text-foreground transition-colors" }, selectedSchool.shortName), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3 h-3" }), /* @__PURE__ */ React.createElement("span", { className: "text-foreground font-medium" }, selectedBranch.shortName)) : /* @__PURE__ */ React.createElement("span", { className: "text-foreground font-medium" }, selectedSchool.shortName))), /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "sm", onClick: () => {
      if (selectedBranch) setSelectedBranch(null);
      else setSelectedSchool(null);
    }, className: "text-[0.8rem] -ml-2" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4 mr-1" }), " Back to ", selectedBranch ? "Branches" : "Schools"), !selectedBranch ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Card, { className: `border-l-4 ${selectedSchool.color.replace("text-", "border-")}` }, /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 rounded-xl ${selectedSchool.iconBg} flex items-center justify-center shrink-0` }, /* @__PURE__ */ React.createElement(School, { className: `w-6 h-6 ${selectedSchool.color}` })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-[1rem] font-semibold" }, selectedSchool.name), /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] text-muted-foreground" }, /* @__PURE__ */ React.createElement(User, { className: "w-3 h-3 inline mr-1" }), "Dean: ", selectedSchool.dean, " \u2022 ", selectedSchool.branches.length, " Department", selectedSchool.branches.length > 1 ? "s" : "", " \u2022 ", selectedSchool.branches.reduce((sum, b) => sum + b.programmes.length, 0), " Programmes"))))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, selectedSchool.branches.map((branch) => /* @__PURE__ */ React.createElement(
      Card,
      {
        key: branch.id,
        className: "cursor-pointer hover:shadow-md hover:border-primary/30 transition-all",
        onClick: () => setSelectedBranch(branch)
      },
      /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-lg ${selectedSchool.iconBg} flex items-center justify-center` }, /* @__PURE__ */ React.createElement(Building2, { className: `w-5 h-5 ${selectedSchool.color}` })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium truncate" }, branch.name), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground truncate" }, "HoD: ", branch.hod))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.65rem]" }, branch.programmes.length, " Programme", branch.programmes.length > 1 ? "s" : ""), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })))
    )))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Card, { className: `border-l-4 ${selectedSchool.color.replace("text-", "border-")}` }, /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 rounded-xl ${selectedSchool.iconBg} flex items-center justify-center shrink-0` }, /* @__PURE__ */ React.createElement(Building2, { className: `w-6 h-6 ${selectedSchool.color}` })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-[1rem] font-semibold" }, selectedBranch.name), /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] text-muted-foreground" }, /* @__PURE__ */ React.createElement(User, { className: "w-3 h-3 inline mr-1" }), "HoD: ", selectedBranch.hod, " \u2022 ", selectedBranch.programmes.length, " Programme", selectedBranch.programmes.length > 1 ? "s" : ""))))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, selectedBranch.programmes.map((programme) => {
      const allCourses = programme.curriculum.flatMap((y) => [...y.semester1, ...y.semester2]);
      return /* @__PURE__ */ React.createElement(
        Card,
        {
          key: programme.id,
          className: "cursor-pointer hover:shadow-md hover:border-primary/30 transition-all",
          onClick: () => setSelectedProgramme(programme)
        },
        /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0" }, /* @__PURE__ */ React.createElement(GraduationCap, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium" }, programme.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 flex-wrap mt-1" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 mr-0.5" }), " ", programme.duration, " Year", programme.duration > 1 ? "s" : ""), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, /* @__PURE__ */ React.createElement(Award, { className: "w-3 h-3 mr-0.5" }), " ", programme.totalCredits, " Credits"), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, /* @__PURE__ */ React.createElement(BookOpen, { className: "w-3 h-3 mr-0.5" }), " ", allCourses.length, " Courses")))), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-muted-foreground shrink-0" })))
      );
    }))));
  }
  const totalBranches = schools.reduce((sum, s) => sum + s.branches.length, 0);
  const totalProgrammes = schools.reduce((sum, s) => sum + s.branches.reduce((bs, b) => bs + b.programmes.length, 0), 0);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Academic Structure")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600" }, /* @__PURE__ */ React.createElement(School, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem]" }, schools.length), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Schools"))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center bg-green-50 text-green-600" }, /* @__PURE__ */ React.createElement(Building2, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem]" }, totalBranches), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Departments"))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center bg-purple-50 text-purple-600" }, /* @__PURE__ */ React.createElement(GraduationCap, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem]" }, totalProgrammes), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Programmes")))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, schools.map((school) => {
    const branchCount = school.branches.length;
    const progCount = school.branches.reduce((sum, b) => sum + b.programmes.length, 0);
    return /* @__PURE__ */ React.createElement(
      Card,
      {
        key: school.id,
        className: "cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group",
        onClick: () => setSelectedSchool(school)
      },
      /* @__PURE__ */ React.createElement(CardContent, { className: "py-5 px-5" }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 rounded-xl ${school.iconBg} flex items-center justify-center mb-3` }, /* @__PURE__ */ React.createElement(School, { className: `w-6 h-6 ${school.color}` })), /* @__PURE__ */ React.createElement(Badge, { className: `text-[0.6rem] mb-2 ${school.iconBg} ${school.color}` }, school.shortName), /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium leading-tight mb-1" }, school.name), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground mb-3" }, "Dean: ", school.dean), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.6rem]" }, branchCount, " Dept", branchCount > 1 ? "s" : ""), /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.6rem]" }, progCount, " Prog", progCount > 1 ? "s" : "")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mt-3 text-[0.75rem] text-muted-foreground group-hover:text-foreground transition-colors" }, /* @__PURE__ */ React.createElement("span", null, "Explore"), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3.5 h-3.5" })))
    );
  })));
}
export {
  AcademicStructure
};
