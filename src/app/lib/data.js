const branches = ["CSE", "ECE", "ME", "CE", "EE"];
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Ananya", "Diya", "Priya", "Riya", "Kavya", "Meera", "Neha", "Pooja", "Shreya", "Tanvi", "Rohan", "Karan", "Rahul", "Amit", "Sunil", "Deepak", "Rajesh", "Manoj", "Vijay", "Suresh", "Sneha", "Nisha", "Swati", "Pallavi", "Ankita", "Divya", "Komal", "Payal", "Simran", "Jyoti"];
const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Reddy", "Rao", "Joshi", "Mishra", "Agarwal", "Chopra", "Malhotra", "Kapoor", "Bhat", "Nair", "Menon", "Iyer", "Pillai", "Das"];
function generateStudents() {
  const students = [];
  let counter = 1;
  for (const branch of branches) {
    for (let sem = 3; sem <= 8; sem += 2) {
      for (let i = 1; i <= 20; i++) {
        const rollNum = `${branch.substring(0, 2)}${sem}${String(counter).padStart(3, "0")}`;
        students.push({
          id: `s-${counter}`,
          rollNumber: rollNum,
          name: `${firstNames[counter % firstNames.length]} ${lastNames[counter % lastNames.length]}`,
          branch,
          semester: sem,
          section: i <= 10 ? "A" : "B"
        });
        counter++;
      }
    }
  }
  return students;
}
function generateRooms() {
  const buildings = ["Main Block", "CS Block", "EC Block", "Workshop Block"];
  const rooms = [];
  let id = 1;
  for (const building of buildings) {
    for (let floor = 0; floor <= 3; floor++) {
      for (let room = 1; room <= 3; room++) {
        rooms.push({
          id: `r-${id}`,
          roomNumber: `${floor}${String(room).padStart(2, "0")}`,
          building,
          floor,
          capacity: 30 + Math.floor(Math.random() * 31),
          hasProjector: Math.random() > 0.3,
          isAvailable: true
        });
        id++;
      }
    }
  }
  return rooms;
}
function generateFaculty() {
  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];
  const designations = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"];
  const faculty = [];
  const facultyNames = [
    "Dr. Ramesh Kumar",
    "Dr. Suresh Patel",
    "Dr. Anita Sharma",
    "Dr. Pradeep Verma",
    "Prof. Kavitha Rao",
    "Prof. Mohan Das",
    "Dr. Lakshmi Nair",
    "Prof. Rajiv Gupta",
    "Dr. Sunita Mishra",
    "Prof. Arun Joshi",
    "Dr. Meena Reddy",
    "Prof. Vikram Singh",
    "Dr. Deepa Iyer",
    "Prof. Sanjay Chopra",
    "Dr. Rekha Malhotra",
    "Prof. Ashok Kapoor",
    "Dr. Geeta Bhat",
    "Prof. Nitin Agarwal",
    "Dr. Pooja Menon",
    "Prof. Ravi Pillai",
    "Dr. Swati Kulkarni",
    "Prof. Harish Tiwari",
    "Dr. Nandini Hegde",
    "Prof. Sudhir Pandey",
    "Dr. Revathi Krishnan",
    "Prof. Dinesh Saxena",
    "Dr. Asha Banerjee",
    "Prof. Gopal Mehta",
    "Dr. Usha Deshpande",
    "Prof. Manoj Srivastava"
  ];
  for (let i = 0; i < facultyNames.length; i++) {
    faculty.push({
      id: `f-${i + 1}`,
      employeeId: `EMP${String(i + 1).padStart(4, "0")}`,
      name: facultyNames[i],
      department: departments[i % departments.length],
      designation: designations[i % designations.length],
      email: `${facultyNames[i].split(" ").pop()?.toLowerCase()}@university.edu`,
      phone: `98${String(Math.floor(Math.random() * 1e8)).padStart(8, "0")}`,
      totalDuties: Math.floor(Math.random() * 8),
      isAvailable: Math.random() > 0.1
    });
  }
  return faculty;
}
function generateExams() {
  return [
    {
      id: "e-1",
      name: "Mid-Semester Examination",
      subject: "Data Structures",
      date: "2026-02-23",
      startTime: "09:00",
      endTime: "12:00",
      branches: ["CSE"],
      semester: 3,
      status: "scheduled"
    },
    {
      id: "e-2",
      name: "Mid-Semester Examination",
      subject: "Digital Electronics",
      date: "2026-02-23",
      startTime: "09:00",
      endTime: "12:00",
      branches: ["ECE"],
      semester: 3,
      status: "scheduled"
    },
    {
      id: "e-3",
      name: "End-Semester Examination",
      subject: "Engineering Mathematics III",
      date: "2026-02-24",
      startTime: "09:00",
      endTime: "12:00",
      branches: ["CSE", "ECE", "ME"],
      semester: 3,
      status: "scheduled"
    },
    {
      id: "e-4",
      name: "Mid-Semester Examination",
      subject: "Thermodynamics",
      date: "2026-02-25",
      startTime: "14:00",
      endTime: "17:00",
      branches: ["ME"],
      semester: 5,
      status: "scheduled"
    },
    {
      id: "e-5",
      name: "End-Semester Examination",
      subject: "Database Management Systems",
      date: "2026-02-20",
      startTime: "09:00",
      endTime: "12:00",
      branches: ["CSE"],
      semester: 5,
      status: "completed"
    },
    {
      id: "e-6",
      name: "End-Semester Examination",
      subject: "Structural Analysis",
      date: "2026-02-26",
      startTime: "09:00",
      endTime: "12:00",
      branches: ["CE"],
      semester: 5,
      status: "scheduled"
    }
  ];
}
const initialStudents = generateStudents();
const initialRooms = generateRooms();
const initialFaculty = generateFaculty();
const initialExams = generateExams();
const initialSeatingAllocations = [];
const initialInvigilationAllocations = [];
const initialAttendanceRecords = [];
const initialReplacementLogs = [
  {
    id: "rep-1",
    examId: "e-5",
    roomId: "r-1",
    originalFacultyId: "f-3",
    replacementFacultyId: "f-12",
    reason: "Medical leave",
    status: "approved",
    requestedAt: "2026-02-19T08:00:00",
    approvedAt: "2026-02-19T09:30:00"
  },
  {
    id: "rep-2",
    examId: "e-1",
    roomId: "r-2",
    originalFacultyId: "f-7",
    replacementFacultyId: "",
    reason: "Family emergency",
    status: "pending",
    requestedAt: "2026-02-19T14:00:00"
  }
];
export {
  initialAttendanceRecords,
  initialExams,
  initialFaculty,
  initialInvigilationAllocations,
  initialReplacementLogs,
  initialRooms,
  initialSeatingAllocations,
  initialStudents
};
