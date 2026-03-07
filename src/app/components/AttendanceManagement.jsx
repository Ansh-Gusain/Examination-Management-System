import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { generateAttendanceSheet } from "../lib/algorithms";
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
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Minus,
  Users
} from "lucide-react";
import { toast } from "sonner";
function AttendanceManagement() {
  const {
    students,
    rooms,
    exams,
    seatingAllocations,
    attendanceRecords,
    setAttendanceRecords,
    invigilationAllocations,
    faculty
  } = useStore();
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const selectedExam = exams.find((e) => e.id === selectedExamId);
  const examRooms = useMemo(() => {
    const roomIds = [
      ...new Set(
        seatingAllocations.filter((sa) => sa.examId === selectedExamId).map((sa) => sa.roomId)
      )
    ];
    return roomIds.map((rid) => rooms.find((r) => r.id === rid)).filter(Boolean);
  }, [seatingAllocations, selectedExamId, rooms]);
  const roomAttendance = useMemo(() => {
    if (!selectedExamId || !selectedRoomId) return [];
    const existing = attendanceRecords.filter(
      (ar) => ar.examId === selectedExamId && ar.roomId === selectedRoomId
    );
    if (existing.length > 0) return existing;
    return generateAttendanceSheet(
      seatingAllocations,
      selectedExamId,
      selectedRoomId
    );
  }, [
    selectedExamId,
    selectedRoomId,
    attendanceRecords,
    seatingAllocations
  ]);
  const roomInvigilator = useMemo(() => {
    const ia = invigilationAllocations.find(
      (a) => a.examId === selectedExamId && a.roomId === selectedRoomId
    );
    if (!ia) return null;
    return faculty.find((f) => f.id === ia.facultyId);
  }, [invigilationAllocations, selectedExamId, selectedRoomId, faculty]);
  const markAttendance = (studentId, status) => {
    setAttendanceRecords((prev) => {
      const existing = prev.find(
        (ar) => ar.examId === selectedExamId && ar.roomId === selectedRoomId && ar.studentId === studentId
      );
      if (existing) {
        return prev.map(
          (ar) => ar.id === existing.id ? { ...ar, status, signature: status === "present" } : ar
        );
      }
      const record = {
        id: `att-${Date.now()}-${studentId}`,
        examId: selectedExamId,
        roomId: selectedRoomId,
        studentId,
        status,
        signature: status === "present"
      };
      return [...prev, record];
    });
  };
  const markAllPresent = () => {
    const newRecords = roomAttendance.map((ra) => ({
      ...ra,
      id: ra.id || `att-${Date.now()}-${ra.studentId}`,
      status: "present",
      signature: true
    }));
    setAttendanceRecords((prev) => {
      const withoutCurrent = prev.filter(
        (ar) => !(ar.examId === selectedExamId && ar.roomId === selectedRoomId)
      );
      return [...withoutCurrent, ...newRecords];
    });
    toast.success("All students marked present.");
  };
  const presentCount = roomAttendance.filter((r) => r.status === "present").length;
  const absentCount = roomAttendance.filter((r) => r.status === "absent").length;
  const notMarkedCount = roomAttendance.filter(
    (r) => r.status === "not-marked"
  ).length;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Attendance Management")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[0.8rem] text-muted-foreground mb-1 block" }, "Select Exam"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: selectedExamId,
      onValueChange: (v) => {
        setSelectedExamId(v);
        setSelectedRoomId("");
      }
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Choose an exam..." })),
    /* @__PURE__ */ React.createElement(SelectContent, null, exams.map((exam) => /* @__PURE__ */ React.createElement(SelectItem, { key: exam.id, value: exam.id }, exam.subject, " \u2014 ", exam.name, " (", exam.date, ")")))
  )), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[0.8rem] text-muted-foreground mb-1 block" }, "Select Room"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: selectedRoomId,
      onValueChange: setSelectedRoomId,
      disabled: examRooms.length === 0
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(
      SelectValue,
      {
        placeholder: examRooms.length === 0 ? "Allocate seating first" : "Choose a room..."
      }
    )),
    /* @__PURE__ */ React.createElement(SelectContent, null, examRooms.map((room) => /* @__PURE__ */ React.createElement(SelectItem, { key: room.id, value: room.id }, "Room ", room.roomNumber, " (", room.building, ")")))
  ))))), selectedExamId && selectedRoomId && roomAttendance.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "py-3 px-4 border-b border-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Attendance Sheet \u2014 Room", " ", rooms.find((r) => r.id === selectedRoomId)?.roomNumber), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-1 text-[0.75rem] text-muted-foreground" }, selectedExam && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, selectedExam.subject), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, selectedExam.date), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, selectedExam.startTime, " - ", selectedExam.endTime)), roomInvigilator && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "Invigilator: ", roomInvigilator.name)))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "outline", onClick: markAllPresent }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3.5 h-3.5 mr-1" }), " Mark All Present"))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mt-3 text-[0.8rem]" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full bg-green-500" }), "Present: ", presentCount), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full bg-red-500" }), "Absent: ", absentCount), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full bg-gray-300" }), "Not Marked: ", notMarkedCount), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Users, { className: "w-3.5 h-3.5" }), "Total: ", roomAttendance.length))), /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto max-h-[500px] overflow-y-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem] w-16" }, "#"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Roll Number"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Name"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Branch"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Signature"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Actions"))), /* @__PURE__ */ React.createElement(TableBody, null, roomAttendance.map((record, idx) => {
    const student = students.find(
      (s) => s.id === record.studentId
    );
    if (!student) return null;
    return /* @__PURE__ */ React.createElement(TableRow, { key: record.id || record.studentId }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, idx + 1), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, student.rollNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, student.name), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, student.branch)), /* @__PURE__ */ React.createElement(TableCell, null, record.status === "present" ? /* @__PURE__ */ React.createElement(Badge, { className: "bg-green-100 text-green-700 text-[0.7rem]" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3 h-3 mr-1" }), " Present") : record.status === "absent" ? /* @__PURE__ */ React.createElement(Badge, { className: "bg-red-100 text-red-700 text-[0.7rem]" }, /* @__PURE__ */ React.createElement(XCircle, { className: "w-3 h-3 mr-1" }), " Absent") : /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, /* @__PURE__ */ React.createElement(Minus, { className: "w-3 h-3 mr-1" }), " Not Marked")), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, record.signature ? /* @__PURE__ */ React.createElement("span", { className: "text-green-600 italic text-[0.75rem]" }, "Signed") : /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground text-[0.75rem]" }, "\u2014")), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: record.status === "present" ? "default" : "outline",
        className: "h-6 px-2 text-[0.7rem]",
        onClick: () => markAttendance(record.studentId, "present")
      },
      "P"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: record.status === "absent" ? "destructive" : "outline",
        className: "h-6 px-2 text-[0.7rem]",
        onClick: () => markAttendance(record.studentId, "absent")
      },
      "A"
    ))));
  })))))), selectedExamId && examRooms.length === 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-12 text-center text-muted-foreground text-[0.85rem]" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }), "No seating allocations found for this exam. Please allocate seating first.")));
}
export {
  AttendanceManagement
};
