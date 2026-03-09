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
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Clock
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";
const COLORS = ["#22c55e", "#ef4444", "#94a3b8"];
function StudentAttendance() {
  const {
    loggedInStudentId,
    students,
    exams,
    rooms,
    attendanceRecords
  } = useStore();
  const currentStudent = students.find((s) => s.id === loggedInStudentId);
  const myAttendance = useMemo(() => {
    if (!currentStudent) return [];
    return attendanceRecords.filter((ar) => ar.studentId === currentStudent.id).map((ar) => {
      const exam = exams.find((e) => e.id === ar.examId);
      const room = rooms.find((r) => r.id === ar.roomId);
      return { ...ar, exam, room };
    }).sort((a, b) => (a.exam?.date || "").localeCompare(b.exam?.date || ""));
  }, [attendanceRecords, currentStudent, exams, rooms]);
  const presentCount = myAttendance.filter((a) => a.status === "present").length;
  const absentCount = myAttendance.filter((a) => a.status === "absent").length;
  const notMarkedCount = myAttendance.filter((a) => a.status === "not-marked").length;
  const pieData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
    { name: "Not Marked", value: notMarkedCount }
  ].filter((d) => d.value > 0);
  const attendanceRate = myAttendance.length > 0 ? Math.round(presentCount / myAttendance.length * 100) : 0;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "My Attendance"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, "Track your exam attendance record")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Total Exams"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, myAttendance.length))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-green-600" }, "Present"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold text-green-700" }, presentCount))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-red-600" }, "Absent"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold text-red-700" }, absentCount))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Attendance Rate"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, myAttendance.length > 0 ? `${attendanceRate}%` : "\u2014")))), /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-6" }, pieData.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Attendance Distribution")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
    Pie,
    {
      data: pieData,
      cx: "50%",
      cy: "50%",
      innerRadius: 50,
      outerRadius: 80,
      paddingAngle: 5,
      dataKey: "value",
      label: ({ name, value }) => `${name}: ${value}`
    },
    pieData.map((_, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: COLORS[i % COLORS.length] }))
  ), /* @__PURE__ */ React.createElement(Tooltip, null))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Quick Summary")), /* @__PURE__ */ React.createElement(CardContent, null, myAttendance.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem]" }, "No records yet")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, myAttendance.map((record) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: record.id,
      className: "flex items-center gap-3 p-2.5 bg-accent/30 rounded-lg"
    },
    record.status === "present" ? /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600 shrink-0" }) : record.status === "absent" ? /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4 text-red-500 shrink-0" }) : /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] font-medium truncate" }, record.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-muted-foreground" }, "Room ", record.room?.roomNumber)),
    /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: record.status === "present" ? "default" : record.status === "absent" ? "destructive" : "secondary",
        className: "text-[0.6rem] shrink-0"
      },
      record.status
    )
  )))))), myAttendance.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Detailed Records")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Subject"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Date"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Signature"))), /* @__PURE__ */ React.createElement(TableBody, null, myAttendance.map((record) => /* @__PURE__ */ React.createElement(TableRow, { key: record.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, record.exam?.name || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-medium" }, record.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, record.exam ? new Date(record.exam.date).toLocaleDateString() : "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, "Room ", record.room?.roomNumber || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: record.status === "present" ? "default" : record.status === "absent" ? "destructive" : "secondary",
      className: "text-[0.65rem]"
    },
    record.status
  )), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, record.signature ? /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "\u2014"))))))))));
}
export {
  StudentAttendance
};
