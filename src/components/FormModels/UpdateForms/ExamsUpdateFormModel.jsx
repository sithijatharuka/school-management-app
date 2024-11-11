"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "../InputField/InputField";
import { addExam } from "@/lib/actions/examsActions";

const ExamsUpdateFormModel = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

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

      <button
        onClick={handleRefresh}
        type="submit"
        className={styles.createBtn}
      >
        Create
      </button>
    </form>
  );
};

export default ExamsUpdateFormModel;
