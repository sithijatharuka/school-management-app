"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField/InputField";
import { z } from "zod";
import { addAssignment } from "@/lib/actions/assignment_action";

export const assignmentSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  subject: z.string().min(1, { message: "Subject is required!" }),
  dueDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid due date!",
  }),
  createdBy: z.string().min(1, { message: "Teacher ID is required!" }), // Assuming Teacher ID is a string
  isCompleted: z.boolean().optional(),
  createdAt: z.date().optional(),
});

const AssignmentFormModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assignmentSchema),
  });

  return (
    <form action={addAssignment} className={styles.wrapper}>
      <h1>Create a new Assignment</h1>
      <span>Authentication Information</span>
      <div className={styles.elementBox}>
        <InputField
          label="Title"
          name="title"
          register={register}
          error={errors.title?.message}
        />

        <InputField
          label="Description"
          name="description"
          register={register}
          error={errors.description?.message}
        />

        <InputField
          label="Subject"
          name="subject"
          register={register}
          error={errors.subject?.message}
        />

        <InputField
          label="Due Date"
          name="dueDate"
          type="date" // Date input for the due date
          register={register}
          error={errors.dueDate?.message}
        />

        <InputField
          label="Teacher ID"
          name="createdBy"
          register={register}
          error={errors.createdBy?.message} // Assuming this is a string (ObjectId)
          placeholder="Enter Teacher ID"
        />

        <div>
          <label htmlFor="isCompleted">Completed</label>
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            {...register("isCompleted")}
          />
          {errors.isCompleted && <p>{errors.isCompleted.message}</p>}
        </div>
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default AssignmentFormModel;
