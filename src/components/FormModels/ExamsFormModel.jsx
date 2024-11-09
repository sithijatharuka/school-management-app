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

export const examSchema = z.object({
  examName: z.string().min(1, "Exam name is required"),
  examDate: z.date(),
  subject: z.string().min(1, "Subject is required"),
  totalMarks: z.number().min(1, "Total marks should be at least 1"),
  duration: z.string().min(1, "Duration is required"),
  createdAt: z.date().default(() => new Date()), // Default to current date if not provided
});

const ExamsFormModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examSchema),
  });

  return (
    <form action={addExam} className={styles.wrapper}>
      <h1>Create a new Exam</h1>
      <span>Authentication Information</span>
      <div className={styles.elementBox}>
        <InputField
          label="Exam Name"
          name="examName"
          register={register}
          error={errors.examName?.message}
        />

        <InputField
          label="Exam Date"
          name="examDate"
          type="date"
          register={register}
          error={errors.examDate?.message}
        />

        <InputField
          label="Subject"
          name="subject"
          register={register}
          error={errors.subject?.message}
        />

        <InputField
          label="Total Marks"
          name="totalMarks"
          type="number"
          register={register}
          error={errors.totalMarks?.message}
        />

        <InputField
          label="Duration"
          name="duration"
          register={register}
          error={errors.duration?.message}
        />
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default ExamsFormModel;
