"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";
import Image from "next/image";
import { addStudent } from "@/lib/actions/students";
import { useState } from "react";
import { addTeacher } from "@/lib/actions/teacherAction";

const TeacherFormModel = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <form action={addTeacher} className={styles.wrapper}>
      <h1>Create a new teacher</h1>
      <span>Authentication Information</span>
      <div className={styles.elementBox}>
        <InputField label="User name" name="username" />
        <InputField type="email" label="Email" name="email" />
        <InputField label="Password" name="password" type="password" />
      </div>
      <span>Personal Information</span>
      <div className={styles.elementBox}>
        <InputField label="First Name" name="firstName" />
        <InputField label="Last Name" name="lastName" />
        <InputField label="Phone Number" name="phone" />
        <InputField label="Address" name="address" />
      </div>

      <div className={styles.elementBox}>
        <button
          onClick={handleRefresh}
          type="submit"
          className={styles.createBtn}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default TeacherFormModel;
