"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";
import Image from "next/image";
import { addStudent } from "@/lib/actions/students";
import { useState } from "react";
import { addExam } from "@/lib/actions/examsActions";

const ExamsFormModel = () => {
  return (
    <form action={addExam} className={styles.wrapper}>
      <h1>Create a new Exam</h1>
      <span>Authentication Information</span>
      <div className={styles.elementBox}>
        <InputField label="Exam Name" name="examName" />
        <InputField label="Exam Date" name="examDate" type="date" />
        <InputField label="Subject" name="subject" />
        <InputField label="Total Marks" name="totalMarks" type="number" />
        <InputField label="Duration" name="duration" />
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default ExamsFormModel;
