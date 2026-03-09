import * as React from "react";
import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { allocateSeating } from "../lib/algorithms";
import { Card, CardContent, CardHeader } from "./ui/card";
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
  Grid3X3,
  Play,
  AlertCircle,
  CheckCircle2,
  Users,
  DoorOpen
} from "lucide-react";
import { toast } from "sonner";
function SeatingAllocation() {
  const {
    students,
    rooms,
    exams,
    seatingAllocations,
    setSeatingAllocations
  } = useStore();
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("all");
  const [allocating, setAllocating] = useState(false);
  const scheduledExams = exams.filter((e) => e.status === "scheduled" || e.status === "ongoing");
  const selectedExam = exams.find((e) => e.id === selectedExamId);
  const examAllocations = useMemo(
    () => seatingAllocations.filter((sa) => sa.examId === selectedExamId),
    [seatingAllocations, selectedExamId]
  );
  const roomAllocations = useMemo(() => {
    if (selectedRoomId === "all") return examAllocations;
    return examAllocations.filter((sa) => sa.roomId === selectedRoomId);
  }, [examAllocations, selectedRoomId]);
  const allocatedRooms = useMemo(() => {
    const roomIds = [...new Set(examAllocations.map((sa) => sa.roomId))];
    return roomIds.map((rid) => {
      const room = rooms.find((r) => r.id === rid);
      const count = examAllocations.filter((sa) => sa.roomId === rid).length;
      return { room, studentCount: count };
    });
  }, [examAllocations, rooms]);
  const handleAllocate = () => {
    if (!selectedExam) return;
    setAllocating(true);
    setTimeout(() => {
      const result = allocateSeating(students, rooms, selectedExam);
      if (result.error) {
        toast.error(result.error);
      } else {
        setSeatingAllocations((prev) => [
          ...prev.filter((sa) => sa.examId !== selectedExamId),
          ...result.allocations
        ]);
        toast.success(`Successfully allocated ${result.allocations.length} students across ${new Set(result.allocations.map((a) => a.roomId)).size} rooms.`);
      }
      setAllocating(false);
    }, 500);
  };
  const handleClear = () => {
    setSeatingAllocations((prev) => prev.filter((sa) => sa.examId !== selectedExamId));
    toast.success("Seating allocations cleared.");
  };
  const eligibleCount = selectedExam ? students.filter(
    (s) => selectedExam.branches.includes(s.branch) && s.semester === selectedExam.semester
  ).length : 0;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Seating Allocation")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 items-end" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[0.8rem] text-muted-foreground mb-1 block" }, "Select Exam"), /* @__PURE__ */ React.createElement(Select, { value: selectedExamId, onValueChange: setSelectedExamId }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Choose an exam..." })), /* @__PURE__ */ React.createElement(SelectContent, null, scheduledExams.map((exam) => /* @__PURE__ */ React.createElement(SelectItem, { key: exam.id, value: exam.id }, exam.subject, " \u2014 ", exam.name, " (", exam.date, ")"))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      onClick: handleAllocate,
      disabled: !selectedExamId || allocating
    },
    /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4 mr-1" }),
    allocating ? "Allocating..." : "Auto Allocate"
  ), examAllocations.length > 0 && /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "outline", onClick: handleClear }, "Clear"))), selectedExam && /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4 mt-3 pt-3 border-t border-border text-[0.8rem]" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5 text-muted-foreground" }), "Eligible: ", /* @__PURE__ */ React.createElement("strong", null, eligibleCount)), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Grid3X3, { className: "w-3.5 h-3.5 text-muted-foreground" }), "Allocated: ", /* @__PURE__ */ React.createElement("strong", null, examAllocations.length)), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(DoorOpen, { className: "w-3.5 h-3.5 text-muted-foreground" }), "Rooms Used: ", /* @__PURE__ */ React.createElement("strong", null, allocatedRooms.length)), /* @__PURE__ */ React.createElement("span", null, examAllocations.length > 0 ? /* @__PURE__ */ React.createElement(Badge, { className: "bg-green-100 text-green-700 text-[0.7rem]" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3 h-3 mr-1" }), " Allocated") : /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-3 h-3 mr-1" }), " Not Allocated"))))), examAllocations.length > 0 && /* @__PURE__ */ React.createElement(Tabs, { defaultValue: "rooms" }, /* @__PURE__ */ React.createElement(TabsList, null, /* @__PURE__ */ React.createElement(TabsTrigger, { value: "rooms", className: "text-[0.8rem]" }, "Room Summary"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "students", className: "text-[0.8rem]" }, "Student List")), /* @__PURE__ */ React.createElement(TabsContent, { value: "rooms" }, /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, allocatedRooms.map(({ room, studentCount }) => /* @__PURE__ */ React.createElement(
    Card,
    {
      key: room.id,
      className: "cursor-pointer hover:border-primary/50 transition-colors",
      onClick: () => setSelectedRoomId(room.id)
    },
    /* @__PURE__ */ React.createElement(CardContent, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-[0.9rem]" }, "Room ", room.roomNumber), /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, room.building)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[0.8rem]" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Students"), /* @__PURE__ */ React.createElement("span", null, studentCount, " / ", room.capacity)), /* @__PURE__ */ React.createElement("div", { className: "mt-2 w-full bg-accent rounded-full h-2" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "bg-primary rounded-full h-2 transition-all",
        style: { width: `${Math.min(studentCount / room.capacity * 100, 100)}%` }
      }
    )), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground mt-1 text-right" }, Math.round(studentCount / room.capacity * 100), "% utilized"))
  )))), /* @__PURE__ */ React.createElement(TabsContent, { value: "students" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("label", { className: "text-[0.8rem] text-muted-foreground" }, "Filter by Room:"), /* @__PURE__ */ React.createElement(Select, { value: selectedRoomId, onValueChange: setSelectedRoomId }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-[200px] h-8 text-[0.8rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "all" }, "All Rooms"), allocatedRooms.map(({ room }) => /* @__PURE__ */ React.createElement(SelectItem, { key: room.id, value: room.id }, "Room ", room.roomNumber, " (", room.building, ")")))))), /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto max-h-[500px] overflow-y-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Seat #"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Roll Number"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Name"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Branch"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"))), /* @__PURE__ */ React.createElement(TableBody, null, roomAllocations.map((sa) => {
    const student = students.find((s) => s.id === sa.studentId);
    const room = rooms.find((r) => r.id === sa.roomId);
    if (!student || !room) return null;
    return /* @__PURE__ */ React.createElement(TableRow, { key: sa.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, sa.seatNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, student.rollNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, student.name), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, student.branch)), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, room.roomNumber));
  })))))))));
}
export {
  SeatingAllocation
};
