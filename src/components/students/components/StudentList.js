import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import { getStudents, deleteStudent } from "../StudentServiceProvider";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTeacher = JSON.parse(sessionStorage.getItem("userDetails"));
    setTeacher(getTeacher?.Username);
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.filter((student) => student.teacher == teacher));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [teacher]);
  console.log("teacher", teacher);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student.ID !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="student-list-container">
      <div className="student-title-header">
        <h2>Students List</h2>
        <CButton color="primary" onClick={() => navigate("/add-student")}>
          Add Student
        </CButton>
      </div>
      <CTable className="student-table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="actions-cell">
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {students.map((student) => (
            <CTableRow key={student.ID}>
              <CTableDataCell>{student.firstName}</CTableDataCell>
              <CTableDataCell>{student.lastName}</CTableDataCell>
              <CTableDataCell>{student.email}</CTableDataCell>
              <CTableDataCell>{student.dob}</CTableDataCell>
              <CTableDataCell className="actions-cell">
                <CButton
                  color="danger"
                  onClick={() => handleDelete(student.ID)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}

export default StudentList;
