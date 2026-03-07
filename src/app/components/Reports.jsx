import { useMemo, useState } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  DoorOpen,
  UserCheck,
  ClipboardList,
  Users,
  Award
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
  Cell,
  Legend
} from "recharts";
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
function Reports() {
  const {
    students,
    rooms,
    exams,
    faculty,
    seatingAllocations,
    invigilationAllocations,
    attendanceRecords,
    replacementLogs
  } = useStore();
  const [selectedExamId, setSelectedExamId] = useState("all");
  const roomUtilization = useMemo(() => {
    return rooms.map((room) => {
      const allocations = seatingAllocations.filter(
        (sa) => sa.roomId === room.id && (selectedExamId === "all" || sa.examId === selectedExamId)
      );
      return {
        room: room.roomNumber,
        building: room.building,
        capacity: room.capacity,
        allocated: allocations.length,
        utilization: room.capacity > 0 ? Math.round(allocations.length / room.capacity * 100) : 0
      };
    }).filter((r) => r.allocated > 0);
  }, [rooms, seatingAllocations, selectedExamId]);
  const facultyDutySummary = useMemo(() => {
    return faculty.map((f) => {
      const duties = invigilationAllocations.filter(
        (ia) => ia.facultyId === f.id
      ).length;
      const chiefDuties = invigilationAllocations.filter(
        (ia) => ia.facultyId === f.id && ia.role === "chief"
      ).length;
      const replacements = replacementLogs.filter(
        (r) => r.originalFacultyId === f.id && r.status === "approved"
      ).length;
      return {
        name: f.name,
        department: f.department,
        designation: f.designation,
        totalDuties: f.totalDuties + duties,
        chiefDuties,
        assistantDuties: duties - chiefDuties,
        replacementsRequested: replacements
      };
    }).sort((a, b) => b.totalDuties - a.totalDuties);
  }, [faculty, invigilationAllocations, replacementLogs]);
  const attendanceSummary = useMemo(() => {
    return exams.map((exam) => {
      const records = attendanceRecords.filter((ar) => ar.examId === exam.id);
      const present = records.filter((r) => r.status === "present").length;
      const absent = records.filter((r) => r.status === "absent").length;
      const total = records.length;
      return {
        exam: exam.subject,
        date: exam.date,
        total,
        present,
        absent,
        rate: total > 0 ? Math.round(present / total * 100) : 0
      };
    }).filter((a) => a.total > 0);
  }, [exams, attendanceRecords]);
  const deptAllocation = useMemo(() => {
    const deptMap = {};
    for (const ia of invigilationAllocations) {
      const fac = faculty.find((f) => f.id === ia.facultyId);
      if (fac) {
        deptMap[fac.department] = (deptMap[fac.department] || 0) + 1;
      }
    }
    return Object.entries(deptMap).map(([dept, count]) => ({
      name: dept,
      value: count
    }));
  }, [invigilationAllocations, faculty]);
  const branchStudentCount = useMemo(() => {
    const map = {};
    for (const s of students) {
      map[s.branch] = (map[s.branch] || 0) + 1;
    }
    return Object.entries(map).map(([branch, count]) => ({
      branch,
      count
    }));
  }, [students]);
  const totalAllocations = seatingAllocations.length;
  const totalInvigilations = invigilationAllocations.length;
  const totalAttendanceMarked = attendanceRecords.length;
  const approvedReplacements = replacementLogs.filter((r) => r.status === "approved").length;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Reports & Analytics")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ React.createElement("span", { className: "text-[0.75rem] text-muted-foreground" }, "Seats Allocated")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem]" }, totalAllocations))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4 text-green-600" }), /* @__PURE__ */ React.createElement("span", { className: "text-[0.75rem] text-muted-foreground" }, "Invigilation Duties")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem]" }, totalInvigilations))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ React.createElement("span", { className: "text-[0.75rem] text-muted-foreground" }, "Attendance Marked")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem]" }, totalAttendanceMarked))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(Award, { className: "w-4 h-4 text-purple-600" }), /* @__PURE__ */ React.createElement("span", { className: "text-[0.75rem] text-muted-foreground" }, "Replacements")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem]" }, approvedReplacements)))), /* @__PURE__ */ React.createElement(Tabs, { defaultValue: "rooms" }, /* @__PURE__ */ React.createElement(TabsList, { className: "flex-wrap h-auto gap-1" }, /* @__PURE__ */ React.createElement(TabsTrigger, { value: "rooms", className: "text-[0.8rem]" }, "Room Utilization"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "faculty", className: "text-[0.8rem]" }, "Faculty Duties"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "attendance", className: "text-[0.8rem]" }, "Attendance"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "distribution", className: "text-[0.8rem]" }, "Distribution")), /* @__PURE__ */ React.createElement(TabsContent, { value: "rooms" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(DoorOpen, { className: "w-4 h-4" }), " Room Utilization"), /* @__PURE__ */ React.createElement(Select, { value: selectedExamId, onValueChange: setSelectedExamId }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-[200px] h-8 text-[0.8rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Filter exam" })), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "all" }, "All Exams"), exams.map((exam) => /* @__PURE__ */ React.createElement(SelectItem, { key: exam.id, value: exam.id }, exam.subject, " (", exam.date, ")")))))), /* @__PURE__ */ React.createElement(CardContent, null, roomUtilization.length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(BarChart, { data: roomUtilization }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "room", tick: { fontSize: 11 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 11 }, unit: "%" }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      formatter: (value, name) => [
        `${value}%`,
        name === "utilization" ? "Utilization" : name
      ]
    }
  ), /* @__PURE__ */ React.createElement(Bar, { dataKey: "utilization", fill: "#6366f1", radius: [4, 4, 0, 0] }))) : /* @__PURE__ */ React.createElement("p", { className: "text-center text-muted-foreground text-[0.85rem] py-12" }, "No seating allocations yet. Allocate seats to see utilization data."))), roomUtilization.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Building"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Capacity"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Allocated"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Utilization"))), /* @__PURE__ */ React.createElement(TableBody, null, roomUtilization.map((r) => /* @__PURE__ */ React.createElement(TableRow, { key: r.room }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, "Room ", r.room), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, r.building), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, r.capacity), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, r.allocated), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 bg-accent rounded-full h-2" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `h-2 rounded-full ${r.utilization > 90 ? "bg-red-500" : r.utilization > 70 ? "bg-amber-500" : "bg-green-500"}`,
      style: { width: `${Math.min(r.utilization, 100)}%` }
    }
  )), /* @__PURE__ */ React.createElement("span", { className: "text-[0.75rem] font-mono" }, r.utilization, "%"))))))))))), /* @__PURE__ */ React.createElement(TabsContent, { value: "faculty" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4" }), " Faculty Duty Summary")), /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Faculty"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Department"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Designation"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Total Duties"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Chief"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Assistant"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Replacements"))), /* @__PURE__ */ React.createElement(TableBody, null, facultyDutySummary.slice(0, 20).map((f) => /* @__PURE__ */ React.createElement(TableRow, { key: f.name }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, f.name), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, f.department), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, f.designation), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, f.totalDuties), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, f.chiefDuties), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, f.assistantDuties), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, f.replacementsRequested))))))))), /* @__PURE__ */ React.createElement(TabsContent, { value: "attendance" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-4 h-4" }), " Attendance Reports")), /* @__PURE__ */ React.createElement(CardContent, null, attendanceSummary.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 250 }, /* @__PURE__ */ React.createElement(BarChart, { data: attendanceSummary }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "exam", tick: { fontSize: 11 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 11 } }), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Legend, null), /* @__PURE__ */ React.createElement(Bar, { dataKey: "present", fill: "#22c55e", name: "Present", radius: [4, 4, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "absent", fill: "#ef4444", name: "Absent", radius: [4, 4, 0, 0] }))), /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Date"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Total"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Present"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Absent"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Rate"))), /* @__PURE__ */ React.createElement(TableBody, null, attendanceSummary.map((a) => /* @__PURE__ */ React.createElement(TableRow, { key: a.exam }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, a.exam), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, a.date), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, a.total), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono text-green-600" }, a.present), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono text-red-600" }, a.absent), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Badge, { className: `text-[0.7rem] ${a.rate > 75 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}` }, a.rate, "%")))))))) : /* @__PURE__ */ React.createElement("p", { className: "text-center text-muted-foreground text-[0.85rem] py-12" }, "No attendance data available. Mark attendance to see reports.")))), /* @__PURE__ */ React.createElement(TabsContent, { value: "distribution" }, /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Students by Branch")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 250 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
    Pie,
    {
      data: branchStudentCount,
      cx: "50%",
      cy: "50%",
      innerRadius: 50,
      outerRadius: 90,
      paddingAngle: 3,
      dataKey: "count",
      nameKey: "branch",
      label: ({ branch, count }) => `${branch}: ${count}`
    },
    branchStudentCount.map((_, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: COLORS[i % COLORS.length] }))
  ), /* @__PURE__ */ React.createElement(Tooltip, null))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Invigilation by Department")), /* @__PURE__ */ React.createElement(CardContent, null, deptAllocation.length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 250 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
    Pie,
    {
      data: deptAllocation,
      cx: "50%",
      cy: "50%",
      innerRadius: 50,
      outerRadius: 90,
      paddingAngle: 3,
      dataKey: "value",
      nameKey: "name",
      label: ({ name, value }) => `${name}: ${value}`
    },
    deptAllocation.map((_, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: COLORS[i % COLORS.length] }))
  ), /* @__PURE__ */ React.createElement(Tooltip, null))) : /* @__PURE__ */ React.createElement("p", { className: "text-center text-muted-foreground text-[0.85rem] py-12" }, "No invigilation data yet.")))))));
}
export {
  Reports
};
