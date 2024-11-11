"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "@/components/InputField/InputField";
import { updateStudent } from "@/lib/actions/students";
import { useEffect, useState } from "react";

const FormUpdateModel = ({ students }) => {
  const [email, setEmail] = useState(students?.email || "");
  const [firstName, setFirstName] = useState(students?.firstName || "");
  const [lastName, setLastName] = useState(students?.lastName || "");
  const [studentPhone, setStudentPhone] = useState(
    students?.studentPhone || ""
  );
  const [address, setAddress] = useState(students?.address || "");

  useEffect(() => {
    if (students) {
      setEmail(students.email || "");
      setFirstName(students.firstName || "");
      setLastName(students.lastName || "");
      setStudentPhone(students.studentPhone || "");
      setAddress(students.address || "");
    }
  }, [students]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Prepare the updated student data
    const updatedStudent = {
      _id: students._id,
      email,
      firstName,
      lastName,
      studentPhone,
      address,
    };
    try {
      const response = await updateStudent(updatedStudent._id, updatedStudent); // Call updateStudent with the updated data
      if (response.success) {
        // Optionally, close the modal or reload the page
        window.location.reload();
        console.log("Student updated successfully");
      } else {
        console.log("Failed to update student:", response.error);
      }
    } catch (error) {
      console.log("Error updating student:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className={styles.wrapper}>
      <h1>Update Student</h1>
      <span>Personal Information</span>
      <div className={styles.elementBox}>
        <InputField
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
          name="email"
          value={email}
        />
        <InputField
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          name="firstName"
          value={firstName}
        />
        <InputField
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          name="lastName"
          value={lastName}
        />
        <InputField
          onChange={(e) => setStudentPhone(e.target.value)}
          label="Student Phone Number"
          name="studentPhone"
          value={studentPhone}
        />
        <InputField
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          name="address"
          value={address}
        />
      </div>
      <div className={styles.elementBox}>
        <button type="submit" className={styles.createBtn}>
          Update
        </button>
      </div>
    </form>
  );
};

export default FormUpdateModel;
