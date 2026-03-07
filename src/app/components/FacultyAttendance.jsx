import { useMemo, useState } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
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
import { ClipboardList, Check, X, UserCheck, Users } from "lucide-react";
import { toast } from "sonner";
function FacultyAttendance() {
  const {
    loggedInFacultyId,
    exams,
    rooms,
    students,
    invigilationAllocations,
    seatingAllocations,
    attendanceRecords,
    setAttendanceRecords
  } = useStore();
  const [selectedDutyId, setSelectedDutyId] = useState("none");
  const myDuties = useMemo(() => {
    return invigilationAllocations.filter((ia) => ia.facultyId === loggedInFacultyId).map((duty) => {
      const exam = exams.find((e) => e.id === duty.examId);
      const room = rooms.find((r) => r.id === duty.roomId);
      return { ...duty, exam, room };
    }).filter((d) => d.exam && (d.exam.status === "scheduled" || d.exam.status === "ongoing"));
  }, [invigilationAllocations, loggedInFacultyId, exams, rooms]);
  const selectedDuty = myDuties.find((d) => d.id === selectedDutyId);
  const studentsInRoom = useMemo(() => {
    if (!selectedDuty) return [];
    return seatingAllocations.filter((sa) => sa.examId === selectedDuty.examId && sa.roomId === selectedDuty.roomId).map((sa) => {
      const student = students.find((s) => s.id === sa.studentId);
      const attendance = attendanceRecords.find(
        (ar) => ar.examId === sa.examId && ar.roomId === sa.roomId && ar.studentId === sa.studentId
      );
      return { ...sa, student, attendance };
    }).sort((a, b) => (a.student?.rollNumber || "").localeCompare(b.student?.rollNumber || ""));
  }, [selectedDuty, seatingAllocations, students, attendanceRecords]);
  const handleMarkAttendance = (studentId, status) => {
    if (!selectedDuty) return;
    setAttendanceRecords((prev) => {
      const existing = prev.findIndex(
        (ar) => ar.examId === selectedDuty.examId && ar.roomId === selectedDuty.roomId && ar.studentId === studentId
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], status, signature: status === "present" };
        return updated;
      }
      return [
        ...prev,
        {
          id: `att-${Date.now()}-${studentId}`,
          examId: selectedDuty.examId,
          roomId: selectedDuty.roomId,
          studentId,
          status,
          signature: status === "present"
        }
      ];
    });
  };
  const handleMarkAllPresent = () => {
    if (!selectedDuty) return;
    studentsInRoom.forEach((s) => {
      if (s.student) handleMarkAttendance(s.student.id, "present");
    });
    toast.success("All students marked present");
  };
  const presentCount = studentsInRoom.filter((s) => s.attendance?.status === "present").length;
  const absentCount = studentsInRoom.filter((s) => s.attendance?.status === "absent").length;
  const unmarkedCount = studentsInRoom.length - presentCount - absentCount;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Mark Attendance"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, "Mark student attendance for your assigned rooms")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[0.8rem] font-medium mb-1.5 block" }, "Select Duty"), /* @__PURE__ */ React.createElement(Select, { value: selectedDutyId, onValueChange: setSelectedDutyId }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-full text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Select an assigned duty..." })), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "none" }, "Select a duty..."), myDuties.map((duty) => /* @__PURE__ */ React.createElement(SelectItem, { key: duty.id, value: duty.id }, duty.exam?.subject, " \u2014 Room ", duty.room?.roomNumber, " (", duty.exam?.date, ")"))))), selectedDuty && studentsInRoom.length > 0 && /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      className: "mt-auto",
      onClick: handleMarkAllPresent
    },
    /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4 mr-1" }),
    " Mark All Present"
  )))), myDuties.length === 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-12" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No active duties to mark attendance"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "You need to have assigned invigilation duties with seating allocations")))), selectedDuty && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Total Students"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem] font-semibold" }, studentsInRoom.length))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-green-600" }, "Present"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem] font-semibold text-green-700" }, presentCount))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-red-600" }, "Absent"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem] font-semibold text-red-700" }, absentCount))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-amber-600" }, "Unmarked"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem] font-semibold text-amber-700" }, unmarkedCount)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4" }), "Students in Room ", selectedDuty.room?.roomNumber, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground font-normal" }, "(", studentsInRoom.length, " students)"))), /* @__PURE__ */ React.createElement(CardContent, null, studentsInRoom.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem]" }, "No students allocated to this room for this exam"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground/70 text-[0.75rem] mt-1" }, "Run seating allocation from the admin panel first")) : /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Seat #"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Roll No."), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Name"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Branch"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem] text-right" }, "Action"))), /* @__PURE__ */ React.createElement(TableBody, null, studentsInRoom.map((entry) => /* @__PURE__ */ React.createElement(TableRow, { key: entry.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, entry.seatNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, entry.student?.rollNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, entry.student?.name), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.65rem]" }, entry.student?.branch)), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: entry.attendance?.status === "present" ? "default" : entry.attendance?.status === "absent" ? "destructive" : "secondary",
      className: "text-[0.65rem]"
    },
    entry.attendance?.status || "not-marked"
  )), /* @__PURE__ */ React.createElement(TableCell, { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 justify-end" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: entry.attendance?.status === "present" ? "default" : "outline",
      className: "h-7 w-7 p-0",
      onClick: () => entry.student && handleMarkAttendance(entry.student.id, "present")
    },
    /* @__PURE__ */ React.createElement(Check, { className: "w-3.5 h-3.5" })
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: entry.attendance?.status === "absent" ? "destructive" : "outline",
      className: "h-7 w-7 p-0",
      onClick: () => entry.student && handleMarkAttendance(entry.student.id, "absent")
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-3.5 h-3.5" })
  ))))))))))));
}
export {
  FacultyAttendance
};
