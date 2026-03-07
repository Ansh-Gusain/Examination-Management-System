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
import { Grid3X3, MapPin, Clock, BookOpen } from "lucide-react";
function StudentSeating() {
  const {
    loggedInStudentId,
    students,
    exams,
    rooms,
    seatingAllocations
  } = useStore();
  const currentStudent = students.find((s) => s.id === loggedInStudentId);
  const mySeats = useMemo(() => {
    if (!currentStudent) return [];
    return seatingAllocations.filter((sa) => sa.studentId === currentStudent.id).map((sa) => {
      const exam = exams.find((e) => e.id === sa.examId);
      const room = rooms.find((r) => r.id === sa.roomId);
      return { ...sa, exam, room };
    }).sort((a, b) => (a.exam?.date || "").localeCompare(b.exam?.date || ""));
  }, [seatingAllocations, currentStudent, exams, rooms]);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "My Seat Allocations"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, "View your assigned seats for each exam")), mySeats.length === 0 ? /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-12" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(Grid3X3, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No seat allocations found"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "Seat assignments will appear here after the admin runs the seating allocation algorithm")))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4" }, mySeats.map((seat) => /* @__PURE__ */ React.createElement(Card, { key: seat.id, className: "relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-[2rem] flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.55rem] text-blue-500 uppercase font-medium" }, "Seat"), /* @__PURE__ */ React.createElement("p", { className: "text-[1.1rem] font-bold text-blue-700 leading-none" }, seat.seatNumber))), /* @__PURE__ */ React.createElement(CardContent, { className: "pt-4 pb-4" }, /* @__PURE__ */ React.createElement("div", { className: "pr-14" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(BookOpen, { className: "w-4 h-4 text-blue-600 shrink-0" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.9rem] font-medium truncate" }, seat.exam?.subject || "\u2014")), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground ml-6" }, seat.exam?.name)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mt-3" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 mr-1" }), seat.exam ? new Date(seat.exam.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }) : "\u2014"), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, seat.exam?.startTime, " - ", seat.exam?.endTime), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem]" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3 h-3 mr-1" }), "Room ", seat.room?.roomNumber)), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-muted-foreground mt-2" }, seat.room?.building, " \u2022 Floor ", seat.room?.floor))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "Detailed View")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Subject"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Date & Time"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Building"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Seat No."))), /* @__PURE__ */ React.createElement(TableBody, null, mySeats.map((seat) => /* @__PURE__ */ React.createElement(TableRow, { key: seat.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, seat.exam?.name || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-medium" }, seat.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", null, seat.exam ? new Date(seat.exam.date).toLocaleDateString() : "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "text-[0.7rem] text-muted-foreground" }, seat.exam?.startTime, " - ", seat.exam?.endTime)), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, seat.room?.roomNumber || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, seat.room?.building || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Badge, { className: "bg-blue-100 text-blue-700 text-[0.75rem]" }, "#", seat.seatNumber)))))))))));
}
export {
  StudentSeating
};
