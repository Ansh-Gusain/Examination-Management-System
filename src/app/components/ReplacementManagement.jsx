import { useState } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "./ui/dialog";
import {
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  User
} from "lucide-react";
import { toast } from "sonner";
function ReplacementManagement() {
  const {
    exams,
    rooms,
    faculty,
    invigilationAllocations,
    replacementLogs,
    setReplacementLogs,
    setInvigilationAllocations
  } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    examId: "",
    roomId: "",
    originalFacultyId: "",
    reason: ""
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = replacementLogs.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );
  const pendingCount = replacementLogs.filter((r) => r.status === "pending").length;
  const openRequest = () => {
    setFormData({ examId: "", roomId: "", originalFacultyId: "", reason: "" });
    setDialogOpen(true);
  };
  const handleRequest = () => {
    if (!formData.examId || !formData.originalFacultyId || !formData.reason) return;
    const newLog = {
      id: `rep-${Date.now()}`,
      examId: formData.examId,
      roomId: formData.roomId,
      originalFacultyId: formData.originalFacultyId,
      replacementFacultyId: "",
      reason: formData.reason,
      status: "pending",
      requestedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setReplacementLogs((prev) => [...prev, newLog]);
    setDialogOpen(false);
    toast.success("Replacement request submitted.");
  };
  const handleApprove = (logId) => {
    const log = replacementLogs.find((r) => r.id === logId);
    if (!log) return;
    const availableFaculty = faculty.filter(
      (f) => f.isAvailable && f.id !== log.originalFacultyId && !invigilationAllocations.some(
        (ia) => ia.examId === log.examId && ia.facultyId === f.id
      )
    );
    if (availableFaculty.length === 0) {
      toast.error("No available faculty for replacement.");
      return;
    }
    const replacement = availableFaculty.sort(
      (a, b) => a.totalDuties - b.totalDuties
    )[0];
    setReplacementLogs(
      (prev) => prev.map(
        (r) => r.id === logId ? {
          ...r,
          status: "approved",
          replacementFacultyId: replacement.id,
          approvedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : r
      )
    );
    setInvigilationAllocations(
      (prev) => prev.map(
        (ia) => ia.examId === log.examId && ia.roomId === log.roomId && ia.facultyId === log.originalFacultyId ? { ...ia, facultyId: replacement.id } : ia
      )
    );
    toast.success(`Approved. ${replacement.name} assigned as replacement.`);
  };
  const handleReject = (logId) => {
    setReplacementLogs(
      (prev) => prev.map((r) => r.id === logId ? { ...r, status: "rejected" } : r)
    );
    toast.success("Replacement request rejected.");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Replacement Management")), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: openRequest }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-1" }), " New Request")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement(Select, { value: statusFilter, onValueChange: setStatusFilter }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-[160px] h-9 text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Filter status" })), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "all" }, "All Statuses"), /* @__PURE__ */ React.createElement(SelectItem, { value: "pending" }, "Pending"), /* @__PURE__ */ React.createElement(SelectItem, { value: "approved" }, "Approved"), /* @__PURE__ */ React.createElement(SelectItem, { value: "rejected" }, "Rejected"))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Exam"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Original Faculty"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Replacement"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Reason"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Requested"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Status"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Actions"))), /* @__PURE__ */ React.createElement(TableBody, null, filtered.length === 0 ? /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, { colSpan: 7, className: "text-center text-muted-foreground text-[0.85rem] py-8" }, "No replacement requests found.")) : filtered.map((log) => {
    const exam = exams.find((e) => e.id === log.examId);
    const origFac = faculty.find(
      (f) => f.id === log.originalFacultyId
    );
    const repFac = faculty.find(
      (f) => f.id === log.replacementFacultyId
    );
    return /* @__PURE__ */ React.createElement(TableRow, { key: log.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, exam?.subject || "\u2014", /* @__PURE__ */ React.createElement("span", { className: "block text-[0.7rem] text-muted-foreground" }, exam?.date)), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(User, { className: "w-3 h-3 text-muted-foreground" }), origFac?.name || "\u2014")), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, repFac ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3 h-3 text-green-600" }), repFac.name) : /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "\u2014")), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] max-w-[200px] truncate" }, log.reason), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.75rem] text-muted-foreground" }, new Date(log.requestedAt).toLocaleString()), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(
      Badge,
      {
        className: `text-[0.7rem] ${log.status === "approved" ? "bg-green-100 text-green-700" : log.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`
      },
      log.status === "approved" && /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-3 h-3 mr-1" }),
      log.status === "pending" && /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 mr-1" }),
      log.status === "rejected" && /* @__PURE__ */ React.createElement(XCircle, { className: "w-3 h-3 mr-1" }),
      log.status
    )), /* @__PURE__ */ React.createElement(TableCell, null, log.status === "pending" && /* @__PURE__ */ React.createElement("div", { className: "flex gap-1" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        className: "h-6 px-2 text-[0.7rem]",
        onClick: () => handleApprove(log.id)
      },
      "Approve"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "h-6 px-2 text-[0.7rem]",
        onClick: () => handleReject(log.id)
      },
      "Reject"
    ))));
  })))))), /* @__PURE__ */ React.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen }, /* @__PURE__ */ React.createElement(DialogContent, null, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "Request Invigilator Replacement"), /* @__PURE__ */ React.createElement(DialogDescription, null, "Please provide the details for the replacement request.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Exam"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: formData.examId,
      onValueChange: (v) => setFormData({ ...formData, examId: v })
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Select exam" })),
    /* @__PURE__ */ React.createElement(SelectContent, null, exams.filter((e) => e.status === "scheduled").map((exam) => /* @__PURE__ */ React.createElement(SelectItem, { key: exam.id, value: exam.id }, exam.subject, " \u2014 ", exam.date)))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Faculty to Replace"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: formData.originalFacultyId,
      onValueChange: (v) => setFormData({ ...formData, originalFacultyId: v })
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Select faculty" })),
    /* @__PURE__ */ React.createElement(SelectContent, null, faculty.map((f) => /* @__PURE__ */ React.createElement(SelectItem, { key: f.id, value: f.id }, f.name, " (", f.department, ")")))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Reason"), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      value: formData.reason,
      onChange: (e) => setFormData({ ...formData, reason: e.target.value }),
      placeholder: "Reason for replacement...",
      className: "text-[0.85rem]",
      rows: 3
    }
  ))), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => setDialogOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: handleRequest }, "Submit Request")))));
}
export {
  ReplacementManagement
};
