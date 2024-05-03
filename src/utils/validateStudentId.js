// File: src/utils/validateStudentId.js

const validateStudentId = (studentId) => {
  // Example validation: Ensure the ID is non-empty and is a numeric string
  return studentId.trim() !== "" && /^\d+$/.test(studentId);
};

export { validateStudentId };
