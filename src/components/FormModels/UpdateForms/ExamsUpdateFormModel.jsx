"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "@/components/InputField/InputField";

import { addExam, updateExam } from "@/lib/actions/examsActions";
import { useEffect, useState } from "react";

const ExamsUpdateFormModel = ({ examD }) => {
  console.log(examD);
  // Initialize form fields with the provided event data
  const [examName, setExamName] = useState(examD?.examName || "");
  const [examDate, setExamDate] = useState(
    examD?.examDate ? examD.examDate.toISOString().split("T")[0] : ""
  );
  const [subject, setSubject] = useState(examD?.subject || "");
  const [totalMarks, setTotalMarks] = useState(examD?.totalMarks || "");
  const [duration, setDuration] = useState(examD?.duration || "");

  useEffect(() => {
    if (examD) {
      setExamName(examD.examName);
      setExamDate(
        examD.examDate ? examD.examDate.toISOString().split("T")[0] : ""
      );
      setSubject(examD.subject);
      setTotalMarks(examD.totalMarks);
      setDuration(examD.duration);
    }
  }, [examD]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Prepare the updated exam data
    const updatedExam = {
      _id: examD._id,
      examName,
      examDate,
      subject,
      totalMarks,
      duration,
    };

    try {
      const response = await updateExam(updatedExam._id, updatedExam); // Call updateExam with the updated data
      if (response.success) {
        // Optionally, close the modal or reload the page
        window.location.reload();
        console.log("Exam updated successfully");
      } else {
        console.log("Failed to update exam:", response.error);
      }
    } catch (error) {
      console.log("Error updating exam:", error);
    }
  };

  return (
    <form action={addExam} onSubmit={handleUpdate} className={styles.wrapper}>
      <h1>Update Exam</h1>
      <div className={styles.elementBox}>
        <InputField
          onChange={(e) => setExamName(e.target.value)}
          value={examName}
          label="Exam Name"
          name="examName"
        />
        <InputField
          value={examDate}
          label="Exam Date"
          name="examDate"
          type="date"
          onChange={(e) => setExamDate(e.target.value)}
        />
        <InputField
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          label="Subject"
          name="subject"
        />
        <InputField
          value={totalMarks}
          label="Total Marks"
          name="totalMarks"
          type="number"
          onChange={(e) => setTotalMarks(e.target.value)}
        />
        <InputField
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          label="Duration"
          name="duration"
        />
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default ExamsUpdateFormModel;
