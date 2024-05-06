// Define user roles
const USER_ROLES = {
  USER: "user",
  ADMIN: "admin"
};

const users = [
  {
    StudentID: "20200001",
    name: "John Doe",
    password: "password123",
    type: USER_ROLES.USER
  },
  {
    StudentID: "20200002", 
    name: "Jane Smith",
    password: "qwerty123",
    type: USER_ROLES.USER
  },
  {
    StudentID: "20200003",
    name: "Michael Johnson",
    password: "letmein123",
    type: USER_ROLES.USER
  },
  {
    StudentID: "20200004",
    name: "Emily Davis",
    password: "abc123!@#",
    type: USER_ROLES.USER
  },
  {
    StudentID: "20200005",
    name: "David Lee",
    password: "password!@#",
    type: USER_ROLES.ADMIN
  }
];

export default users;
