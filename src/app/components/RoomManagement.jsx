import * as React from "react";
import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
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
import { Search, Plus, Pencil, Trash2, DoorOpen, Monitor } from "lucide-react";
function RoomManagement() {
  const { rooms, setRooms } = useStore();
  const [search, setSearch] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    building: "Main Block",
    floor: 0,
    capacity: 30,
    hasProjector: false,
    isAvailable: true
  });
  const buildings = useMemo(
    () => [...new Set(rooms.map((r) => r.building))],
    [rooms]
  );
  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const matchSearch = r.roomNumber.toLowerCase().includes(search.toLowerCase()) || r.building.toLowerCase().includes(search.toLowerCase());
      const matchBuilding = buildingFilter === "all" || r.building === buildingFilter;
      return matchSearch && matchBuilding;
    });
  }, [rooms, search, buildingFilter]);
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const availableRooms = rooms.filter((r) => r.isAvailable).length;
  const openAdd = () => {
    setEditingRoom(null);
    setFormData({ roomNumber: "", building: "Main Block", floor: 0, capacity: 30, hasProjector: false, isAvailable: true });
    setDialogOpen(true);
  };
  const openEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      building: room.building,
      floor: room.floor,
      capacity: room.capacity,
      hasProjector: room.hasProjector,
      isAvailable: room.isAvailable
    });
    setDialogOpen(true);
  };
  const handleSave = () => {
    if (!formData.roomNumber) return;
    if (editingRoom) {
      setRooms(
        (prev) => prev.map(
          (r) => r.id === editingRoom.id ? { ...r, ...formData } : r
        )
      );
    } else {
      const newRoom = {
        id: `r-${Date.now()}`,
        ...formData
      };
      setRooms((prev) => [...prev, newRoom]);
    }
    setDialogOpen(false);
  };
  const handleDelete = (id) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };
  const toggleAvailability = (id) => {
    setRooms(
      (prev) => prev.map((r) => r.id === id ? { ...r, isAvailable: !r.isAvailable } : r)
    );
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Room Management")), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: openAdd }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-1" }), " Add Room")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex-1" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React.createElement(
    Input,
    {
      placeholder: "Search rooms...",
      value: search,
      onChange: (e) => setSearch(e.target.value),
      className: "pl-9 h-9 text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement(Select, { value: buildingFilter, onValueChange: setBuildingFilter }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: "w-[180px] h-9 text-[0.85rem]" }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder: "Building" })), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "all" }, "All Buildings"), buildings.map((b) => /* @__PURE__ */ React.createElement(SelectItem, { key: b, value: b }, b))))))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" }, filtered.map((room) => /* @__PURE__ */ React.createElement(Card, { key: room.id, className: `relative ${!room.isAvailable ? "opacity-60" : ""}` }, /* @__PURE__ */ React.createElement(CardContent, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(DoorOpen, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React.createElement("span", { className: "text-[0.9rem]" }, "Room ", room.roomNumber)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1" }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(room), className: "p-1 rounded hover:bg-accent" }, /* @__PURE__ */ React.createElement(Pencil, { className: "w-3.5 h-3.5 text-muted-foreground" })), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDelete(room.id), className: "p-1 rounded hover:bg-accent" }, /* @__PURE__ */ React.createElement(Trash2, { className: "w-3.5 h-3.5 text-destructive" })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5 text-[0.8rem]" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Building"), /* @__PURE__ */ React.createElement("span", null, room.building)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Floor"), /* @__PURE__ */ React.createElement("span", null, room.floor)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Capacity"), /* @__PURE__ */ React.createElement("span", { className: "font-mono" }, room.capacity))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, room.hasProjector && /* @__PURE__ */ React.createElement(Badge, { variant: "secondary", className: "text-[0.65rem] py-0" }, /* @__PURE__ */ React.createElement(Monitor, { className: "w-3 h-3 mr-1" }), " Projector")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[0.7rem] text-muted-foreground" }, room.isAvailable ? "Available" : "Unavailable"), /* @__PURE__ */ React.createElement(
    Switch,
    {
      checked: room.isAvailable,
      onCheckedChange: () => toggleAvailability(room.id),
      className: "scale-75"
    }
  ))))))), /* @__PURE__ */ React.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen }, /* @__PURE__ */ React.createElement(DialogContent, null, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, editingRoom ? "Edit Room" : "Add New Room"), /* @__PURE__ */ React.createElement(DialogDescription, null, editingRoom ? "Make changes to the room details." : "Enter the room details.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Room Number"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: formData.roomNumber,
      onChange: (e) => setFormData({ ...formData, roomNumber: e.target.value }),
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Floor"), /* @__PURE__ */ React.createElement(
    Input,
    {
      type: "number",
      value: formData.floor,
      onChange: (e) => setFormData({ ...formData, floor: Number(e.target.value) }),
      className: "text-[0.85rem]"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Building"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: formData.building,
      onChange: (e) => setFormData({ ...formData, building: e.target.value }),
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Capacity"), /* @__PURE__ */ React.createElement(
    Input,
    {
      type: "number",
      value: formData.capacity,
      onChange: (e) => setFormData({ ...formData, capacity: Number(e.target.value) }),
      className: "text-[0.85rem]"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    Switch,
    {
      checked: formData.hasProjector,
      onCheckedChange: (c) => setFormData({ ...formData, hasProjector: c })
    }
  ), /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Has Projector")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    Switch,
    {
      checked: formData.isAvailable,
      onCheckedChange: (c) => setFormData({ ...formData, isAvailable: c })
    }
  ), /* @__PURE__ */ React.createElement(Label, { className: "text-[0.8rem]" }, "Available for Exams"))), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => setDialogOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: handleSave }, editingRoom ? "Update" : "Add Room")))));
}
export {
  RoomManagement
};
