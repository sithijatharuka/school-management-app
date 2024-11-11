"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "../InputField/InputField";
import { addTeacher } from "@/lib/actions/teacherAction";

const TeacherUpdateFormModel = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <form action={addTeacher} className={styles.wrapper}>
      <h1>Create a new teacher</h1>
      <span>Personal Information</span>
      <div className={styles.elementBox}>
        <InputField type="email" label="Email" name="email" />
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

export default TeacherUpdateFormModel;
