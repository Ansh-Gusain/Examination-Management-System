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
import { CalendarDays, MapPin, Award, Clock, CheckCircle2 } from "lucide-react";
function FacultyDuties() {
  const {
    loggedInFacultyId,
    faculty,
    exams,
    rooms,
    invigilationAllocations
  } = useStore();
  const currentFaculty = faculty.find((f) => f.id === loggedInFacultyId);
  const allDuties = useMemo(() => {
    return invigilationAllocations.filter((ia) => ia.facultyId === loggedInFacultyId).map((duty) => {
      const exam = exams.find((e) => e.id === duty.examId);
      const room = rooms.find((r) => r.id === duty.roomId);
      return { ...duty, exam, room };
    }).sort((a, b) => {
      if (!a.exam || !b.exam) return 0;
      return a.exam.date.localeCompare(b.exam.date);
    });
  }, [invigilationAllocations, loggedInFacultyId, exams, rooms]);
  const upcomingDuties = allDuties.filter((d) => d.exam?.status === "scheduled");
  const completedDuties = allDuties.filter((d) => d.exam?.status === "completed");
  const ongoingDuties = allDuties.filter((d) => d.exam?.status === "ongoing");
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "My Invigilation Duties"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, currentFaculty?.name, " \u2022 Total assignments: ", allDuties.length)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Upcoming")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, upcomingDuties.length))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(CalendarDays, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Ongoing")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, ongoingDuties.length))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Completed")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, completedDuties.length)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "All Assigned Duties")), /* @__PURE__ */ React.createElement(CardContent, null, allDuties.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(CalendarDays, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No duties assigned yet"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "Duties will appear here once the admin runs invigilator allocation")) : /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Subject"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Date & Time"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Role"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"))), /* @__PURE__ */ React.createElement(TableBody, null, allDuties.map((duty) => /* @__PURE__ */ React.createElement(TableRow, { key: duty.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, duty.exam?.name || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-medium" }, duty.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", null, duty.exam ? new Date(duty.exam.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }) : "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "text-[0.7rem] text-muted-foreground" }, duty.exam?.startTime, " - ", duty.exam?.endTime)), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3 h-3 text-muted-foreground" }), duty.room?.roomNumber || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "text-[0.7rem] text-muted-foreground" }, duty.room?.building)), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      className: `text-[0.65rem] ${duty.role === "chief" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(Award, { className: "w-3 h-3 mr-1" }),
    duty.role === "chief" ? "Chief" : "Assistant"
  )), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: duty.exam?.status === "completed" ? "default" : duty.exam?.status === "ongoing" ? "secondary" : "outline",
      className: "text-[0.65rem]"
    },
    duty.exam?.status || "unknown"
  ))))))))));
}
export {
  FacultyDuties
};
