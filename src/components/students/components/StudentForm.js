import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CFormFloating,
} from "@coreui/react";
import { addStudent } from "../StudentServiceProvider";
import { generateUUID } from "../../../utils/uuidGenerator";

function StudentForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacher = JSON.parse(
        sessionStorage.getItem("userDetails")
      ).Username;
      const id = generateUUID();
      const response = await addStudent(
        firstName,
        lastName,
        email,
        dob,
        id,
        teacher
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setDob("");
      if (response == "Student created successfully!") {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="student-form-container">
      <h2>Create Student</h2>
      <CForm onSubmit={handleSubmit}>
        <CFormFloating>
          <CFormInput
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <CFormLabel htmlFor="firstName">First Name</CFormLabel>
        </CFormFloating>
        <CFormFloating>
          <CFormInput
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
        </CFormFloating>
        <CFormFloating>
          <CFormInput
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CFormLabel htmlFor="email">Email</CFormLabel>
        </CFormFloating>
        <CFormFloating>
          <CFormInput
            type="date"
            id="dob"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <CFormLabel htmlFor="dob">Date of Birth</CFormLabel>
        </CFormFloating>
        <div className="button-group">
          <CButton type="submit" color="primary">
            Add Student
          </CButton>
          <CButton onClick={() => navigate("/home")} color="secondary">
            Back
          </CButton>
        </div>
      </CForm>
    </div>
  );
}

export default StudentForm;
