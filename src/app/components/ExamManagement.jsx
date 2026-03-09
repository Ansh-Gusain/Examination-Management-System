import * as React from "react";
import { useState } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
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
import { Checkbox } from "./ui/checkbox";
import { Plus, Pencil, Trash2, Calendar, Clock } from "lucide-react";
const branches = ["CSE", "ECE", "ME", "CE", "EE"];
function ExamManagement() {
  const { exams, setExams } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    name: "Mid-Semester Examination",
    subject: "",
    date: "",
    startTime: "09:00",
    endTime: "12:00",
    branches: [],
    semester: 3,
    status: "scheduled"
  });
  const openAdd = () => {
    setEditingExam(null);
    setFormData({
      name: "Mid-Semester Examination",
      subject: "",
      date: "",
      startTime: "09:00",
      endTime: "12:00",
      branches: [],
      semester: 3,
      status: "scheduled"
    });
    setDialogOpen(true);
  };
  const openEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      subject: exam.subject,
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime,
      branches: [...exam.branches],
      semester: exam.semester,
      status: exam.status
    });
    setDialogOpen(true);
  };
  const handleSave = () => {
    if (!formData.subject || !formData.date || formData.branches.length === 0) return;
    if (editingExam) {
      setExams(
        (prev) => prev.map(
          (e) => e.id === editingExam.id ? { ...e, ...formData } : e
        )
      );
    } else {
      const newExam = {
        id: `e-${Date.now()}`,
        ...formData
      };
      setExams((prev) => [...prev, newExam]);
    }
    setDialogOpen(false);
  };
  const handleDelete = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };
  const toggleBranch = (branch) => {
    setFormData((prev) => ({
      ...prev,
      branches: prev.branches.includes(branch) ? prev.branches.filter((b) => b !== branch) : [...prev.branches, branch]
    }));
  };
  const statusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "ongoing":
        return "bg-amber-100 text-amber-700";
      case "completed":
        return "bg-green-100 text-green-700";
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Exam Management")), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: openAdd }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-1" }), " Schedule Exam")), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4" }, exams.sort((a, b) => a.date.localeCompare(b.date)).map((exam) => /* @__PURE__ */ React.createElement(Card, { key: exam.id }, /* @__PURE__ */ React.createElement(CardContent, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-[0.9rem]" }, exam.subject), /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, exam.name)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1" }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(exam), className: "p-1 rounded hover:bg-accent" }, /* @__PURE__ */ React.createElement(Pencil, { className: "w-3.5 h-3.5 text-muted-foreground" })), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDelete(exam.id), className: "p-1 rounded hover:bg-accent" }, /* @__PURE__ */ React.createElement(Trash2, { className: "w-3.5 h-3.5 text-destructive" })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ React.createElement("span", null, new Date(exam.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ React.createElement("span", null, exam.startTime, " - ", exam.endTime)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Semester:"), /* @__PURE__ */ React.createElement("span", null, exam.semester))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1 mt-3 pt-3 border-t border-border" }, exam.branches.map((b) => /* @__PURE__ */ React.createElement(Badge, { key: b, variant: "secondary", className: "text-[0.65rem]" }, b)), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }), /* @__PURE__ */ React.createElement(Badge, { className: `text-[0.65rem] ${statusColor(exam.status)}` }, exam.status)))))), /* @__PURE__ */ React.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen }, /* @__PURE__ */ React.createElement(DialogContent, { className: "max-w-md" }, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, editingExam ? "Edit Exam" : "Schedule New Exam"), /* @__PURE__ */ React.createElement(DialogDescription, null, editingExam ? "Make changes to the exam details." : "Enter the exam details.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Exam Name"), /* @__PURE__ */ React.createElement(Select, { value: formData.name, onValueChange: (v) => setFormData({ ...formData, name: v }) }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "Mid-Semester Examination" }, "Mid-Semester Examination"), /* @__PURE__ */ React.createElement(SelectItem, { value: "End-Semester Examination" }, "End-Semester Examination"), /* @__PURE__ */ React.createElement(SelectItem, { value: "Supplementary Examination" }, "Supplementary Examination"), /* @__PURE__ */ React.createElement(SelectItem, { value: "Re-examination" }, "Re-examination")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Subject"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: formData.subject,
      onChange: (e) => setFormData({ ...formData, subject: e.target.value }),
      placeholder: "e.g., Data Structures",
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "col-span-1" }, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Date"), /* @__PURE__ */ React.createElement(
    Input,
    {
      type: "date",
      value: formData.date,
      onChange: (e) => setFormData({ ...formData, date: e.target.value }),
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Start"), /* @__PURE__ */ React.createElement(
    Input,
    {
      type: "time",
      value: formData.startTime,
      onChange: (e) => setFormData({ ...formData, startTime: e.target.value }),
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "End"), /* @__PURE__ */ React.createElement(
    Input,
    {
      type: "time",
      value: formData.endTime,
      onChange: (e) => setFormData({ ...formData, endTime: e.target.value }),
      className: "text-[0.85rem]"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Semester"), /* @__PURE__ */ React.createElement(Select, { value: String(formData.semester), onValueChange: (v) => setFormData({ ...formData, semester: Number(v) }) }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)), /* @__PURE__ */ React.createElement(SelectContent, null, [1, 2, 3, 4, 5, 6, 7, 8].map((s) => /* @__PURE__ */ React.createElement(SelectItem, { key: s, value: String(s) }, "Semester ", s))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem] mb-2 block" }, "Branches"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, branches.map((branch) => /* @__PURE__ */ React.createElement("label", { key: branch, className: "flex items-center gap-2 text-[0.8rem] cursor-pointer" }, /* @__PURE__ */ React.createElement(
    Checkbox,
    {
      checked: formData.branches.includes(branch),
      onCheckedChange: () => toggleBranch(branch)
    }
  ), branch)))), editingExam && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Status"), /* @__PURE__ */ React.createElement(Select, { value: formData.status, onValueChange: (v) => setFormData({ ...formData, status: v }) }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "scheduled" }, "Scheduled"), /* @__PURE__ */ React.createElement(SelectItem, { value: "ongoing" }, "Ongoing"), /* @__PURE__ */ React.createElement(SelectItem, { value: "completed" }, "Completed"))))), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => setDialogOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: handleSave }, editingExam ? "Update" : "Schedule")))));
}
export {
  ExamManagement
};
