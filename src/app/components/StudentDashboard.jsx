import * as React from "react";
import { useMemo } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  FileText,
  Grid3X3,
  ClipboardList,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle
} from "lucide-react";
function StudentDashboard() {
  const {
    loggedInStudentId,
    students,
    exams,
    rooms,
    seatingAllocations,
    attendanceRecords
  } = useStore();
  const currentStudent = students.find((s) => s.id === loggedInStudentId);
  const myExams = useMemo(() => {
    if (!currentStudent) return [];
    return exams.filter(
      (e) => e.branches.includes(currentStudent.branch) && e.semester === currentStudent.semester
    ).sort((a, b) => a.date.localeCompare(b.date));
  }, [exams, currentStudent]);
  const upcomingExams = myExams.filter((e) => e.status === "scheduled");
  const completedExams = myExams.filter((e) => e.status === "completed");
  const mySeats = useMemo(() => {
    if (!currentStudent) return [];
    return seatingAllocations.filter((sa) => sa.studentId === currentStudent.id).map((sa) => {
      const exam = exams.find((e) => e.id === sa.examId);
      const room = rooms.find((r) => r.id === sa.roomId);
      return { ...sa, exam, room };
    });
  }, [seatingAllocations, currentStudent, exams, rooms]);
  const myAttendance = useMemo(() => {
    if (!currentStudent) return [];
    return attendanceRecords.filter((ar) => ar.studentId === currentStudent.id).map((ar) => {
      const exam = exams.find((e) => e.id === ar.examId);
      const room = rooms.find((r) => r.id === ar.roomId);
      return { ...ar, exam, room };
    });
  }, [attendanceRecords, currentStudent, exams, rooms]);
  const presentCount = myAttendance.filter((a) => a.status === "present").length;
  const absentCount = myAttendance.filter((a) => a.status === "absent").length;
  const attendanceRate = myAttendance.length > 0 ? Math.round(presentCount / myAttendance.length * 100) : 0;
  const stats = [
    {
      label: "Upcoming Exams",
      value: upcomingExams.length,
      icon: FileText,
      color: "text-blue-600 bg-blue-50"
    },
    {
      label: "Seats Allocated",
      value: mySeats.length,
      icon: Grid3X3,
      color: "text-blue-600 bg-blue-50"
    },
    {
      label: "Exams Attended",
      value: presentCount,
      icon: ClipboardList,
      color: "text-green-600 bg-green-50"
    },
    {
      label: "Attendance Rate",
      value: myAttendance.length > 0 ? `${attendanceRate}%` : "\u2014",
      icon: CheckCircle2,
      color: "text-teal-600 bg-teal-50"
    }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-[1.5rem]" }, "Welcome, ", currentStudent?.name || "Student"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, currentStudent?.rollNumber, " \u2022 ", currentStudent?.branch, " \u2022 Semester ", currentStudent?.semester, " \u2022 Section ", currentStudent?.section)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3" }, stats.map((stat) => /* @__PURE__ */ React.createElement(Card, { key: stat.label, className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}` }, /* @__PURE__ */ React.createElement(stat.icon, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, stat.value), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, stat.label))))), /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4 text-blue-600" }), "Upcoming Exam Schedule")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, upcomingExams.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] text-muted-foreground" }, "No upcoming exams")) : upcomingExams.map((exam) => {
    const seat = mySeats.find((s) => s.examId === exam.id);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: exam.id,
        className: "p-3 bg-accent/50 rounded-lg border border-border/50"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium" }, exam.subject), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, exam.name)), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.65rem] shrink-0" }, exam.branches.join(", "))),
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mt-2" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.65rem]" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 mr-1" }), new Date(exam.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      })), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.65rem]" }, exam.startTime, " - ", exam.endTime), seat ? /* @__PURE__ */ React.createElement(Badge, { className: "text-[0.65rem] bg-blue-100 text-blue-700" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3 h-3 mr-1" }), "Room ", seat.room?.roomNumber, " \u2022 Seat ", seat.seatNumber) : /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.65rem]" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-3 h-3 mr-1" }), "Seat not yet allocated"))
    );
  })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Grid3X3, { className: "w-4 h-4 text-blue-600" }), "My Seat Allocations")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, mySeats.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(Grid3X3, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] text-muted-foreground" }, "No seats allocated yet"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "Seats will appear here after the admin runs seating allocation")) : mySeats.map((seat) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: seat.id,
      className: "flex items-center gap-3 p-3 bg-accent/50 rounded-lg border border-border/50"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.6rem] uppercase" }, "Seat"), /* @__PURE__ */ React.createElement("p", { className: "text-[1rem] font-bold leading-none" }, seat.seatNumber))),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium" }, seat.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, seat.exam?.name), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-1" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3 h-3 mr-1" }), "Room ", seat.room?.roomNumber, " \u2022 ", seat.room?.building), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, seat.exam ? new Date(seat.exam.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }) : "\u2014")))
  )))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-4 h-4 text-green-600" }), "Attendance Record")), /* @__PURE__ */ React.createElement(CardContent, null, myAttendance.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(ClipboardList, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] text-muted-foreground" }, "No attendance records yet"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "Attendance will appear here after exams are conducted")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, myAttendance.map((record) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: record.id,
      className: "flex items-center justify-between p-3 bg-accent/30 rounded-lg"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "shrink-0" }, record.status === "present" ? /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-5 h-5 text-green-600" }) : record.status === "absent" ? /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-5 h-5 text-red-500" }) : /* @__PURE__ */ React.createElement(Clock, { className: "w-5 h-5 text-muted-foreground" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium" }, record.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, record.exam?.name, " \u2022 Room ", record.room?.roomNumber))),
    /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: record.status === "present" ? "default" : record.status === "absent" ? "destructive" : "secondary",
        className: "text-[0.65rem]"
      },
      record.status
    ), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-muted-foreground mt-1" }, record.exam ? new Date(record.exam.date).toLocaleDateString() : "\u2014"))
  ))))));
}
export {
  StudentDashboard
};
