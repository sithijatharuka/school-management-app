"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "@/components/InputField/InputField";
import { updateTeacher } from "@/lib/actions/teacherAction";
import { useEffect, useState } from "react";

const TeacherUpdateFormModel = ({ teachers }) => {
  const [email, setEmail] = useState(teachers?.email || "");
  const [firstName, setFirstName] = useState(teachers?.firstName || "");
  const [lastName, setLastName] = useState(teachers?.lastName || "");
  const [phone, setPhone] = useState(teachers?.phone || "");
  const [address, setAddress] = useState(teachers?.address || "");

  useEffect(() => {
    if (teachers) {
      setEmail(teachers.email || "");
      setFirstName(teachers.firstName || "");
      setLastName(teachers.lastName || "");
      setPhone(teachers.phone || "");
      setAddress(teachers.address || "");
    }
  }, [teachers]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Prepare the updated student data
    const updatedTeacher = {
      _id: teachers._id,
      email,
      firstName,
      lastName,
      phone,
      address,
    };
    try {
      const response = await updateTeacher(updatedTeacher._id, updatedTeacher); // Call updateStudent with the updated data
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
      <h1>Update teacher</h1>
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
          onChange={(e) => setPhone(e.target.value)}
          label="Phone Number"
          name="phone"
          value={phone}
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

export default TeacherUpdateFormModel;
