import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "./ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "./ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./ui/select";
import { Search, Plus, Upload, Users, Filter } from "lucide-react";

export function StudentManagement() {
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
    section: "A",
  });

  const filtered = useMemo(() => {
    return students
      .filter((s) => {
        const matchSearch =
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.rollNumber.toLowerCase().includes(search.toLowerCase());
        const matchBranch = branchFilter === "all" || s.branch === branchFilter;
        const matchSem = semesterFilter === "all" || s.semester === Number(semesterFilter);
        return matchSearch && matchBranch && matchSem;
      })
      .sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));
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
      section: formData.section || "A",
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
        section: i % 2 === 0 ? "A" : "B",
      });
    }
    setStudents((prev) => [...prev, ...newStudents]);
  };

  const branches = ["CSE", "ECE", "ME", "CE", "EE"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1>Student Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleBulkUpload}>
            <Upload className="w-4 h-4 mr-1" /> Bulk Upload
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-3 px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="pl-9 h-9 text-[0.85rem]"
              />
            </div>
            <Select value={branchFilter} onValueChange={(v) => { setBranchFilter(v); setPage(0); }}>
              <SelectTrigger className="w-[140px] h-9 text-[0.85rem]">
                <Filter className="w-3 h-3 mr-1" />
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={semesterFilter} onValueChange={(v) => { setSemesterFilter(v); setPage(0); }}>
              <SelectTrigger className="w-[140px] h-9 text-[0.85rem]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {[1,2,3,4,5,6,7,8].map((s) => (
                  <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[0.75rem]">Roll Number</TableHead>
                  <TableHead className="text-[0.75rem]">Name</TableHead>
                  <TableHead className="text-[0.75rem]">Branch</TableHead>
                  <TableHead className="text-[0.75rem]">Semester</TableHead>
                  <TableHead className="text-[0.75rem]">Section</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="text-[0.8rem] font-mono">{student.rollNumber}</TableCell>
                    <TableCell className="text-[0.8rem]">{student.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[0.7rem]">{student.branch}</Badge>
                    </TableCell>
                    <TableCell className="text-[0.8rem]">{student.semester}</TableCell>
                    <TableCell className="text-[0.8rem]">{student.section}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-[0.75rem] text-muted-foreground">
              Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="text-[0.75rem] h-7"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
                className="text-[0.75rem] h-7"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student details below to add them to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-[0.8rem]">Roll Number</Label>
              <Input
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                placeholder="e.g., CS3001"
                className="text-[0.85rem]"
              />
            </div>
            <div>
              <Label className="text-[0.8rem]">Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Student name"
                className="text-[0.85rem]"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-[0.8rem]">Branch</Label>
                <Select
                  value={formData.branch}
                  onValueChange={(v) => setFormData({ ...formData, branch: v })}
                >
                  <SelectTrigger className="text-[0.85rem]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[0.8rem]">Semester</Label>
                <Select
                  value={String(formData.semester)}
                  onValueChange={(v) => setFormData({ ...formData, semester: Number(v) })}
                >
                  <SelectTrigger className="text-[0.85rem]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map((s) => (
                      <SelectItem key={s} value={String(s)}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[0.8rem]">Section</Label>
                <Select
                  value={formData.section}
                  onValueChange={(v) => setFormData({ ...formData, section: v })}
                >
                  <SelectTrigger className="text-[0.85rem]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
