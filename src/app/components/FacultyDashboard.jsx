import * as React from "react";
import { useMemo } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  CalendarDays,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  BookOpen,
  Award
} from "lucide-react";
function FacultyDashboard() {
  const {
    loggedInFacultyId,
    faculty,
    exams,
    rooms,
    invigilationAllocations,
    replacementLogs,
    attendanceRecords,
    seatingAllocations
  } = useStore();
  const currentFaculty = faculty.find((f) => f.id === loggedInFacultyId);
  const myDuties = useMemo(() => {
    return invigilationAllocations.filter((ia) => ia.facultyId === loggedInFacultyId);
  }, [invigilationAllocations, loggedInFacultyId]);
  const upcomingDuties = useMemo(() => {
    return myDuties.map((duty) => {
      const exam = exams.find((e) => e.id === duty.examId);
      const room = rooms.find((r) => r.id === duty.roomId);
      return { ...duty, exam, room };
    }).filter((d) => d.exam && d.exam.status === "scheduled").sort((a, b) => a.exam.date.localeCompare(b.exam.date));
  }, [myDuties, exams, rooms]);
  const completedDuties = useMemo(() => {
    return myDuties.map((duty) => {
      const exam = exams.find((e) => e.id === duty.examId);
      const room = rooms.find((r) => r.id === duty.roomId);
      return { ...duty, exam, room };
    }).filter((d) => d.exam && d.exam.status === "completed");
  }, [myDuties, exams, rooms]);
  const myReplacements = useMemo(() => {
    return replacementLogs.filter((r) => r.originalFacultyId === loggedInFacultyId);
  }, [replacementLogs, loggedInFacultyId]);
  const pendingReplacements = myReplacements.filter((r) => r.status === "pending").length;
  const approvedReplacements = myReplacements.filter((r) => r.status === "approved").length;
  const stats = [
    {
      label: "Total Duties",
      value: currentFaculty?.totalDuties || myDuties.length,
      icon: CalendarDays,
      color: "text-blue-600 bg-blue-50"
    },
    {
      label: "Upcoming",
      value: upcomingDuties.length,
      icon: Clock,
      color: "text-amber-600 bg-amber-50"
    },
    {
      label: "Completed",
      value: completedDuties.length,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-50"
    },
    {
      label: "Pending Requests",
      value: pendingReplacements,
      icon: RefreshCw,
      color: "text-orange-600 bg-orange-50"
    }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-[1.5rem]" }, "Welcome, ", currentFaculty?.name || "Faculty"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, currentFaculty?.department, " \u2022 ", currentFaculty?.designation, " \u2022 ", currentFaculty?.employeeId)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3" }, stats.map((stat) => /* @__PURE__ */ React.createElement(Card, { key: stat.label, className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}` }, /* @__PURE__ */ React.createElement(stat.icon, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, stat.value), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, stat.label))))), /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(CalendarDays, { className: "w-4 h-4 text-green-600" }), "Upcoming Invigilation Duties")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, upcomingDuties.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] text-muted-foreground" }, "No upcoming duties assigned"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "Duties will appear here once the admin allocates invigilators")) : upcomingDuties.map((duty) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: duty.id,
      className: "flex items-start gap-3 p-3 bg-accent/50 rounded-lg border border-border/50"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0 mt-0.5" }, /* @__PURE__ */ React.createElement(BookOpen, { className: "w-4 h-4" })),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium" }, duty.exam.subject), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, duty.exam.name), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mt-2" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.65rem]" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 mr-1" }), new Date(duty.exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }), " ", duty.exam.startTime, " - ", duty.exam.endTime), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.65rem]" }, /* @__PURE__ */ React.createElement(MapPin, { className: "w-3 h-3 mr-1" }), "Room ", duty.room?.roomNumber, " \u2022 ", duty.room?.building), /* @__PURE__ */ React.createElement(
      Badge,
      {
        className: `text-[0.65rem] ${duty.role === "chief" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`
      },
      /* @__PURE__ */ React.createElement(Award, { className: "w-3 h-3 mr-1" }),
      duty.role === "chief" ? "Chief Invigilator" : "Assistant"
    )))
  ))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-4 h-4 text-orange-600" }), "My Replacement Requests")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, myReplacements.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] text-muted-foreground" }, "No replacement requests"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, "You can request replacements from the Replacements page")) : myReplacements.map((rep) => {
    const exam = exams.find((e) => e.id === rep.examId);
    const room = rooms.find((r) => r.id === rep.roomId);
    const replacementFac = faculty.find((f) => f.id === rep.replacementFacultyId);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: rep.id,
        className: "flex items-start gap-3 p-3 bg-accent/50 rounded-lg border border-border/50"
      },
      /* @__PURE__ */ React.createElement("div", { className: "shrink-0 mt-0.5" }, rep.status === "approved" ? /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-full bg-green-50 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" })) : rep.status === "pending" ? /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-amber-600" })) : /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-full bg-red-50 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-4 h-4 text-red-600" }))),
      /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem] font-medium truncate" }, exam?.subject || "Exam"), /* @__PURE__ */ React.createElement(
        Badge,
        {
          variant: rep.status === "approved" ? "default" : rep.status === "pending" ? "secondary" : "destructive",
          className: "text-[0.6rem] shrink-0"
        },
        rep.status
      )), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground mt-0.5" }, "Room ", room?.roomNumber, " \u2022 Reason: ", rep.reason), replacementFac && /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Replacement: ", replacementFac.name), /* @__PURE__ */ React.createElement("p", { className: "text-[0.65rem] text-muted-foreground/70 mt-1" }, "Requested: ", new Date(rep.requestedAt).toLocaleString()))
    );
  }))))), completedDuties.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem] flex items-center gap-2" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" }), "Completed Duties")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, completedDuties.map((duty) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: duty.id,
      className: "flex items-center justify-between p-3 bg-accent/30 rounded-lg"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[0.85rem]" }, duty.exam.subject), /* @__PURE__ */ React.createElement("p", { className: "text-[0.7rem] text-muted-foreground" }, "Room ", duty.room?.roomNumber, " \u2022 ", duty.role === "chief" ? "Chief Invigilator" : "Assistant")),
    /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem]" }, new Date(duty.exam.date).toLocaleDateString()), /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-[0.6rem] text-green-600 border-green-200" }, "Completed"))
  ))))));
}
export {
  FacultyDashboard
};
