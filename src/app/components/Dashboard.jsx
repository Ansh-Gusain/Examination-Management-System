import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Users,
  DoorOpen,
  FileText,
  UserCheck,
  Grid3X3,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
function Dashboard() {
  const {
    students,
    rooms,
    exams,
    faculty,
    seatingAllocations,
    invigilationAllocations,
    replacementLogs
  } = useStore();
  const scheduledExams = exams.filter((e) => e.status === "scheduled").length;
  const completedExams = exams.filter((e) => e.status === "completed").length;
  const pendingReplacements = replacementLogs.filter((r) => r.status === "pending").length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const availableFaculty = faculty.filter((f) => f.isAvailable).length;
  const stats = [
    { label: "Total Students", value: students.length, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Rooms", value: rooms.length, icon: DoorOpen, color: "text-green-600 bg-green-50" },
    { label: "Upcoming Exams", value: scheduledExams, icon: FileText, color: "text-amber-600 bg-amber-50" },
    { label: "Faculty Available", value: availableFaculty, icon: UserCheck, color: "text-purple-600 bg-purple-50" },
    { label: "Seats Allocated", value: seatingAllocations.length, icon: Grid3X3, color: "text-indigo-600 bg-indigo-50" },
    { label: "Total Capacity", value: totalCapacity, icon: TrendingUp, color: "text-teal-600 bg-teal-50" }
  ];
  const branchData = ["CSE", "ECE", "ME", "CE", "EE"].map((branch) => ({
    branch,
    students: students.filter((s) => s.branch === branch).length
  }));
  const examStatusData = [
    { name: "Scheduled", value: scheduledExams },
    { name: "Completed", value: completedExams },
    { name: "Ongoing", value: exams.filter((e) => e.status === "ongoing").length }
  ].filter((d) => d.value > 0);
  const upcomingExams = exams.filter((e) => e.status === "scheduled").sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
  const recentReplacements = replacementLogs.slice(0, 3);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Dashboard")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" }, stats.map((stat) => /* @__PURE__ */ React.createElement(Card, { key: stat.label, className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}` }, /* @__PURE__ */ React.createElement(stat.icon, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem]" }, stat.value.toLocaleString()), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, stat.label))))), /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Students by Branch")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 220 }, /* @__PURE__ */ React.createElement(BarChart, { data: branchData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "branch", tick: { fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12 } }), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Bar, { dataKey: "students", fill: "#6366f1", radius: [4, 4, 0, 0] }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Exam Status Distribution")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 220 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
    Pie,
    {
      data: examStatusData,
      cx: "50%",
      cy: "50%",
      innerRadius: 55,
      outerRadius: 85,
      paddingAngle: 5,
      dataKey: "value",
      label: ({ name, value }) => `${name}: ${value}`
    },
    examStatusData.map((_, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: COLORS[i % COLORS.length] }))
  ), /* @__PURE__ */ React.createElement(Tooltip, null))))))), /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4" }), " Upcoming Exams")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, upcomingExams.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] text-muted-foreground py-4 text-center" }, "No upcoming exams") : upcomingExams.map((exam) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: exam.id,
      className: "flex items-center justify-between p-3 bg-accent/50 rounded-lg"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem]" }, exam.subject), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, exam.name, " \u2022 Sem ", exam.semester)),
    /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem]" }, new Date(exam.date).toLocaleDateString()), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, exam.startTime, " - ", exam.endTime))
  ))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-4 h-4" }), " Alerts & Replacements")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, pendingReplacements > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-3 bg-amber-50 text-amber-800 rounded-lg" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem]" }, pendingReplacements, " pending replacement request(s)")), recentReplacements.map((rep) => {
    const origFaculty = faculty.find((f) => f.id === rep.originalFacultyId);
    return /* @__PURE__ */ React.createElement("div", { key: rep.id, className: "flex items-center gap-3 p-3 bg-accent/50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "shrink-0" }, rep.status === "approved" ? /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" }) : rep.status === "pending" ? /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-amber-600" }) : /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-4 h-4 text-red-600" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] truncate" }, origFaculty?.name, " \u2014 ", rep.reason), /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: rep.status === "approved" ? "default" : rep.status === "pending" ? "secondary" : "destructive",
        className: "text-[0.65rem] mt-1"
      },
      rep.status
    )));
  }), recentReplacements.length === 0 && pendingReplacements === 0 && /* @__PURE__ */ React.createElement("p", { className: "text-[0.8rem] text-muted-foreground py-4 text-center" }, "No alerts at this time"))))));
}
export {
  Dashboard
};
