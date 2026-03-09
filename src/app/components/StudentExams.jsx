import * as React from "react";
import { useMemo } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import { FileText, Clock, CheckCircle2, Play } from "lucide-react";
function StudentExams() {
  const { loggedInStudentId, students, exams } = useStore();
  const currentStudent = students.find((s) => s.id === loggedInStudentId);
  const myExams = useMemo(() => {
    if (!currentStudent) return [];
    return exams.filter(
      (e) => e.branches.includes(currentStudent.branch) && e.semester === currentStudent.semester
    ).sort((a, b) => a.date.localeCompare(b.date));
  }, [exams, currentStudent]);
  const scheduled = myExams.filter((e) => e.status === "scheduled");
  const completed = myExams.filter((e) => e.status === "completed");
  const ongoing = myExams.filter((e) => e.status === "ongoing");
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Exam Schedule"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, "View your exam schedule for ", currentStudent?.branch, " \u2014 Semester ", currentStudent?.semester)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Scheduled")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, scheduled.length))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Ongoing")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, ongoing.length))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Completed")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, completed.length)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "All Exams")), /* @__PURE__ */ React.createElement(CardContent, null, myExams.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No exams found for your branch and semester")) : /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Subject"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Date"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Time"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Branches"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"))), /* @__PURE__ */ React.createElement(TableBody, null, myExams.map((exam) => /* @__PURE__ */ React.createElement(TableRow, { key: exam.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, exam.name), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-medium" }, exam.subject), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, new Date(exam.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  })), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, exam.startTime, " - ", exam.endTime), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 flex-wrap" }, exam.branches.map((b) => /* @__PURE__ */ React.createElement(Badge, { key: b, variant: "outline", className: "text-[0.6rem]" }, b)))), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: exam.status === "completed" ? "default" : exam.status === "ongoing" ? "secondary" : "outline",
      className: "text-[0.65rem]"
    },
    exam.status
  ))))))))));
}
export {
  StudentExams
};
