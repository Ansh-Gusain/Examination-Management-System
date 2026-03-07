import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { allocateInvigilators } from "../lib/algorithms";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  UserCheck,
  Play,
  AlertCircle,
  CheckCircle2,
  BarChart3
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { toast } from "sonner";
function InvigilatorAllocation() {
  const {
    rooms,
    exams,
    faculty,
    invigilationAllocations,
    setInvigilationAllocations,
    setFaculty
  } = useStore();
  const [selectedExamId, setSelectedExamId] = useState("");
  const [allocating, setAllocating] = useState(false);
  const scheduledExams = exams.filter((e) => e.status === "scheduled" || e.status === "ongoing");
  const selectedExam = exams.find((e) => e.id === selectedExamId);
  const examAllocations = useMemo(
    () => invigilationAllocations.filter((ia) => ia.examId === selectedExamId),
    [invigilationAllocations, selectedExamId]
  );
  const dutyDistribution = useMemo(() => {
    const counts = {};
    for (const ia of invigilationAllocations) {
      counts[ia.facultyId] = (counts[ia.facultyId] || 0) + 1;
    }
    return faculty.filter((f) => f.isAvailable).map((f) => ({
      name: f.name.split(" ").slice(-1)[0],
      duties: f.totalDuties + (counts[f.id] || 0)
    })).sort((a, b) => b.duties - a.duties).slice(0, 15);
  }, [faculty, invigilationAllocations]);
  const handleAllocate = () => {
    if (!selectedExam) return;
    setAllocating(true);
    setTimeout(() => {
      const result = allocateInvigilators(
        faculty,
        rooms,
        selectedExam,
        invigilationAllocations
      );
      if (result.error) {
        toast.error(result.error);
      } else {
        setInvigilationAllocations((prev) => [
          ...prev.filter((ia) => ia.examId !== selectedExamId),
          ...result.allocations
        ]);
        setFaculty(
          (prev) => prev.map((f) => {
            const newDuties = result.allocations.filter(
              (a) => a.facultyId === f.id
            ).length;
            return newDuties > 0 ? { ...f, totalDuties: f.totalDuties + newDuties } : f;
          })
        );
        toast.success(
          `Assigned ${result.allocations.length} invigilators to rooms.`
        );
      }
      setAllocating(false);
    }, 500);
  };
  const handleClear = () => {
    setInvigilationAllocations(
      (prev) => prev.filter((ia) => ia.examId !== selectedExamId)
    );
    toast.success("Invigilation allocations cleared.");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Invigilator Allocation")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 items-end" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[0.8rem] text-muted-foreground mb-1 block" }, "Select Exam"), /* @__PURE__ */ React.createElement(Select, { value: selectedExamId, onValueChange: setSelectedExamId }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Choose an exam..." })), /* @__PURE__ */ React.createElement(SelectContent, null, scheduledExams.map((exam) => /* @__PURE__ */ React.createElement(SelectItem, { key: exam.id, value: exam.id }, exam.subject, " \u2014 ", exam.name, " (", exam.date, ")"))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      onClick: handleAllocate,
      disabled: !selectedExamId || allocating
    },
    /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4 mr-1" }),
    allocating ? "Allocating..." : "Auto Assign"
  ), examAllocations.length > 0 && /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "outline", onClick: handleClear }, "Clear"))), selectedExam && /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4 mt-3 pt-3 border-t border-border text-[0.8rem]" }, /* @__PURE__ */ React.createElement("span", null, "Available Faculty: ", /* @__PURE__ */ React.createElement("strong", null, faculty.filter((f) => f.isAvailable).length)), /* @__PURE__ */ React.createElement("span", null, "Assigned: ", /* @__PURE__ */ React.createElement("strong", null, examAllocations.length)), /* @__PURE__ */ React.createElement("span", null, examAllocations.length > 0 ? /* @__PURE__ */ React.createElement(Badge, { className: "bg-green-100 text-green-700 text-[0.7rem]" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3 h-3 mr-1" }), " Assigned") : /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-3 h-3 mr-1" }), " Not Assigned"))))), /* @__PURE__ */ React.createElement(Tabs, { defaultValue: "allocations" }, /* @__PURE__ */ React.createElement(TabsList, null, /* @__PURE__ */ React.createElement(TabsTrigger, { value: "allocations", className: "text-[0.8rem]" }, "Duty Chart"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "distribution", className: "text-[0.8rem]" }, "Workload Distribution"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "faculty", className: "text-[0.8rem]" }, "Faculty Overview")), /* @__PURE__ */ React.createElement(TabsContent, { value: "allocations" }, examAllocations.length > 0 ? /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Building"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Invigilator"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Department"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Role"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Total Duties"))), /* @__PURE__ */ React.createElement(TableBody, null, examAllocations.map((ia) => {
    const room = rooms.find((r) => r.id === ia.roomId);
    const fac = faculty.find((f) => f.id === ia.facultyId);
    if (!room || !fac) return null;
    return /* @__PURE__ */ React.createElement(TableRow, { key: ia.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, "Room ", room.roomNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, room.building), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, fac.name), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, fac.department), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: ia.role === "chief" ? "default" : "secondary",
        className: "text-[0.7rem]"
      },
      ia.role
    )), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, fac.totalDuties));
  })))))) : /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-12 text-center text-muted-foreground text-[0.85rem]" }, /* @__PURE__ */ React.createElement(UserCheck, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }), 'Select an exam and click "Auto Assign" to allocate invigilators.'))), /* @__PURE__ */ React.createElement(TabsContent, { value: "distribution" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(BarChart3, { className: "w-4 h-4" }), " Faculty Duty Distribution")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(BarChart, { data: dutyDistribution, layout: "vertical" }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), /* @__PURE__ */ React.createElement(XAxis, { type: "number", tick: { fontSize: 12 } }), /* @__PURE__ */ React.createElement(
    YAxis,
    {
      type: "category",
      dataKey: "name",
      tick: { fontSize: 11 },
      width: 100
    }
  ), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Bar, { dataKey: "duties", fill: "#6366f1", radius: [0, 4, 4, 0] })))))), /* @__PURE__ */ React.createElement(TabsContent, { value: "faculty" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Employee ID"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Name"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Department"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Designation"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Total Duties"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"))), /* @__PURE__ */ React.createElement(TableBody, null, faculty.sort((a, b) => a.totalDuties - b.totalDuties).map((f) => /* @__PURE__ */ React.createElement(TableRow, { key: f.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, f.employeeId), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, f.name), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, f.department), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, f.designation), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, f.totalDuties), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: f.isAvailable ? "default" : "secondary",
      className: `text-[0.7rem] ${f.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`
    },
    f.isAvailable ? "Available" : "Unavailable"
  ))))))))))));
}
export {
  InvigilatorAllocation
};
