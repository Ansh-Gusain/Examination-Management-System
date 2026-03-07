import { useMemo, useState } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Input } from "./ui/input";
import {
  RefreshCw,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
function FacultyReplacements() {
  const {
    loggedInFacultyId,
    faculty,
    exams,
    rooms,
    invigilationAllocations,
    replacementLogs,
    setReplacementLogs
  } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDutyId, setSelectedDutyId] = useState("");
  const [reason, setReason] = useState("");
  const currentFaculty = faculty.find((f) => f.id === loggedInFacultyId);
  const myDuties = useMemo(() => {
    return invigilationAllocations.filter((ia) => ia.facultyId === loggedInFacultyId).map((duty) => {
      const exam = exams.find((e) => e.id === duty.examId);
      const room = rooms.find((r) => r.id === duty.roomId);
      return { ...duty, exam, room };
    }).filter((d) => d.exam && d.exam.status === "scheduled");
  }, [invigilationAllocations, loggedInFacultyId, exams, rooms]);
  const myReplacements = useMemo(() => {
    return replacementLogs.filter((r) => r.originalFacultyId === loggedInFacultyId).map((rep) => {
      const exam = exams.find((e) => e.id === rep.examId);
      const room = rooms.find((r) => r.id === rep.roomId);
      const replacement = faculty.find((f) => f.id === rep.replacementFacultyId);
      return { ...rep, exam, room, replacement };
    }).sort((a, b) => b.requestedAt.localeCompare(a.requestedAt));
  }, [replacementLogs, loggedInFacultyId, exams, rooms, faculty]);
  const handleRequestReplacement = () => {
    if (!selectedDutyId || !reason.trim()) {
      toast.error("Please select a duty and provide a reason");
      return;
    }
    const duty = myDuties.find((d) => d.id === selectedDutyId);
    if (!duty) return;
    const newRequest = {
      id: `rep-${Date.now()}`,
      examId: duty.examId,
      roomId: duty.roomId,
      originalFacultyId: loggedInFacultyId || "",
      replacementFacultyId: "",
      reason: reason.trim(),
      status: "pending",
      requestedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setReplacementLogs((prev) => [...prev, newRequest]);
    setDialogOpen(false);
    setSelectedDutyId("");
    setReason("");
    toast.success("Replacement request submitted successfully");
  };
  const pendingCount = myReplacements.filter((r) => r.status === "pending").length;
  const approvedCount = myReplacements.filter((r) => r.status === "approved").length;
  const rejectedCount = myReplacements.filter((r) => r.status === "rejected").length;
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Replacement Requests"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-[0.85rem] mt-1" }, "Request duty replacements for your assigned invigilation")), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      onClick: () => setDialogOpen(true),
      disabled: myDuties.length === 0
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-1" }),
    " Request Replacement"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Pending")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, pendingCount))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-green-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Approved")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, approvedCount))), /* @__PURE__ */ React.createElement(Card, { className: "py-3" }, /* @__PURE__ */ React.createElement(CardContent, { className: "px-4 py-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-4 h-4 text-red-600" }), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Rejected")), /* @__PURE__ */ React.createElement("p", { className: "text-[1.25rem] font-semibold" }, rejectedCount)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { className: "pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-[0.9rem]" }, "My Replacement History")), /* @__PURE__ */ React.createElement(CardContent, null, myReplacements.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No replacement requests yet"), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground/70 mt-1" }, myDuties.length > 0 ? "Click 'Request Replacement' to submit a new request" : "You need assigned duties before requesting replacements")) : /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Room"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Reason"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Replacement"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Requested"))), /* @__PURE__ */ React.createElement(TableBody, null, myReplacements.map((rep) => /* @__PURE__ */ React.createElement(TableRow, { key: rep.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, rep.exam?.subject || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "text-[0.7rem] text-muted-foreground" }, rep.exam ? new Date(rep.exam.date).toLocaleDateString() : "\u2014")), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, "Room ", rep.room?.roomNumber || "\u2014"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] max-w-[200px] truncate" }, rep.reason), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, rep.replacement ? rep.replacement.name : /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground italic" }, "Not assigned")), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: rep.status === "approved" ? "default" : rep.status === "pending" ? "secondary" : "destructive",
      className: "text-[0.65rem]"
    },
    rep.status === "approved" && /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3 h-3 mr-1" }),
    rep.status === "pending" && /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 mr-1" }),
    rep.status === "rejected" && /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-3 h-3 mr-1" }),
    rep.status
  )), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.75rem] text-muted-foreground" }, new Date(rep.requestedAt).toLocaleDateString())))))))), /* @__PURE__ */ React.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen }, /* @__PURE__ */ React.createElement(DialogContent, null, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "Request Replacement"), /* @__PURE__ */ React.createElement(DialogDescription, null, "Submit a replacement request for one of your upcoming duties")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 py-2" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, null, "Select Duty"), /* @__PURE__ */ React.createElement(Select, { value: selectedDutyId, onValueChange: setSelectedDutyId }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Select a duty to be replaced..." })), /* @__PURE__ */ React.createElement(SelectContent, null, myDuties.map((duty) => /* @__PURE__ */ React.createElement(SelectItem, { key: duty.id, value: duty.id }, duty.exam?.subject, " \u2014 Room ", duty.room?.roomNumber, " (", duty.exam?.date, ")"))))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, null, "Reason for Replacement"), /* @__PURE__ */ React.createElement(
    Input,
    {
      placeholder: "e.g., Medical leave, Family emergency...",
      value: reason,
      onChange: (e) => setReason(e.target.value),
      className: "text-[0.85rem]"
    }
  ))), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => setDialogOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: handleRequestReplacement }, "Submit Request")))));
}
export {
  FacultyReplacements
};
