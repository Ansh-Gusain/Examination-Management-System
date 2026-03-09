import * as React from "react";
import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
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
import { Search, Plus, Upload, Filter } from "lucide-react";
function StudentManagement() {
  const { students, setStudents } = useStore();
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    branch: "CSE",
    semester: 3,
    section: "A"
  });
  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase());
      const matchBranch = branchFilter === "all" || s.branch === branchFilter;
      const matchSem = semesterFilter === "all" || s.semester === Number(semesterFilter);
      return matchSearch && matchBranch && matchSem;
    }).sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));
  }, [students, search, branchFilter, semesterFilter]);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const handleAdd = () => {
    if (!formData.rollNumber || !formData.name) return;
    const newStudent = {
      id: `s-${Date.now()}`,
      rollNumber: formData.rollNumber || "",
      name: formData.name || "",
      branch: formData.branch || "CSE",
      semester: formData.semester || 3,
      section: formData.section || "A"
    };
    setStudents((prev) => [...prev, newStudent]);
    setDialogOpen(false);
    setFormData({ rollNumber: "", name: "", branch: "CSE", semester: 3, section: "A" });
  };
  const handleBulkUpload = () => {
    const newStudents = [];
    for (let i = 0; i < 50; i++) {
      const id = Date.now() + i;
      newStudents.push({
        id: `s-${id}`,
        rollNumber: `NEW${String(students.length + i + 1).padStart(4, "0")}`,
        name: `Student ${students.length + i + 1}`,
        branch: ["CSE", "ECE", "ME", "CE", "EE"][i % 5],
        semester: [3, 5, 7][i % 3],
        section: i % 2 === 0 ? "A" : "B"
      });
    }
    setStudents((prev) => [...prev, ...newStudents]);
  };
  const branches = ["CSE", "ECE", "ME", "CE", "EE"];
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Student Management")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", size: "sm", onClick: handleBulkUpload }, /* @__PURE__ */ React.createElement(Upload, { className: "w-4 h-4 mr-1" }), " Bulk Upload"), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: () => setDialogOpen(true) }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-1" }), " Add Student"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex-1" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React.createElement(
    Input,
    {
      placeholder: "Search by name or roll number...",
      value: search,
      onChange: (e) => {
        setSearch(e.target.value);
        setPage(0);
      },
      className: "pl-9 h-9 text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement(Select, { value: branchFilter, onValueChange: (v) => {
    setBranchFilter(v);
    setPage(0);
  } }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-[140px] h-9 text-[0.85rem]" }, /* @__PURE__ */ React.createElement(Filter, { className: "w-3 h-3 mr-1" }), /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Branch" })), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "all" }, "All Branches"), branches.map((b) => /* @__PURE__ */ React.createElement(SelectItem, { key: b, value: b }, b)))), /* @__PURE__ */ React.createElement(Select, { value: semesterFilter, onValueChange: (v) => {
    setSemesterFilter(v);
    setPage(0);
  } }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-[140px] h-9 text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Semester" })), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "all" }, "All Semesters"), [1, 2, 3, 4, 5, 6, 7, 8].map((s) => /* @__PURE__ */ React.createElement(SelectItem, { key: s, value: String(s) }, "Semester ", s))))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "p-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Roll Number"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Name"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Branch"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Semester"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-[0.75rem]" }, "Section"))), /* @__PURE__ */ React.createElement(TableBody, null, paged.map((student) => /* @__PURE__ */ React.createElement(TableRow, { key: student.id }, /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem] font-mono" }, student.rollNumber), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, student.name), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.7rem]" }, student.branch)), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, student.semester), /* @__PURE__ */ React.createElement(TableCell, { className: "text-[0.8rem]" }, student.section)))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border" }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.75rem] text-muted-foreground" }, "Showing ", page * pageSize + 1, "\u2013", Math.min((page + 1) * pageSize, filtered.length), " of ", filtered.length), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      size: "sm",
      disabled: page === 0,
      onClick: () => setPage(page - 1),
      className: "text-[0.75rem] h-7"
    },
    "Previous"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      size: "sm",
      disabled: page >= totalPages - 1,
      onClick: () => setPage(page + 1),
      className: "text-[0.75rem] h-7"
    },
    "Next"
  ))))), /* @__PURE__ */ React.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen }, /* @__PURE__ */ React.createElement(DialogContent, null, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "Add New Student"), /* @__PURE__ */ React.createElement(DialogDescription, null, "Enter the student details below to add them to the system.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Roll Number"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: formData.rollNumber,
      onChange: (e) => setFormData({ ...formData, rollNumber: e.target.value }),
      placeholder: "e.g., CS3001",
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Full Name"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: formData.name,
      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
      placeholder: "Student name",
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Branch"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: formData.branch,
      onValueChange: (v) => setFormData({ ...formData, branch: v })
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)),
    /* @__PURE__ */ React.createElement(SelectContent, null, branches.map((b) => /* @__PURE__ */ React.createElement(SelectItem, { key: b, value: b }, b)))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Semester"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: String(formData.semester),
      onValueChange: (v) => setFormData({ ...formData, semester: Number(v) })
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)),
    /* @__PURE__ */ React.createElement(SelectContent, null, [1, 2, 3, 4, 5, 6, 7, 8].map((s) => /* @__PURE__ */ React.createElement(SelectItem, { key: s, value: String(s) }, s)))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Section"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: formData.section,
      onValueChange: (v) => setFormData({ ...formData, section: v })
    },
    /* @__PURE__ */ React.createElement(SelectTrigger, { className: "text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, null)),
    /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "A" }, "A"), /* @__PURE__ */ React.createElement(SelectItem, { value: "B" }, "B"), /* @__PURE__ */ React.createElement(SelectItem, { value: "C" }, "C"))
  )))), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => setDialogOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: handleAdd }, "Add Student")))));
}
export {
  StudentManagement
};
