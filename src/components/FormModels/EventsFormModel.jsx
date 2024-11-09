"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";
import { addEvent } from "@/lib/actions/events_actions";

export const eventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventDate: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    },
    {
      message: "Invalid date format",
    }
  ),
  eventTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/,
      "Invalid time format (expected HH:MM)"
    ),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(), // Optional field for description
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()), // Optional, defaults to current date if not provided
});

// Example usage:
const validateEventData = (data) => {
  try {
    eventSchema.parse(data); // Validates data against schema
    console.log("Validation passed");
    return true;
  } catch (e) {
    console.error("Validation failed:", e.errors);
    return false;
  }
};

const EventsFormModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  return (
    <form action={addEvent} className={styles.wrapper}>
      <h1>Create a new Exam</h1>
      <span>Authentication Information</span>
      <div className={styles.elementBox}>
        <InputField
          label="Event Name"
          name="eventName"
          register={register}
          error={errors.eventName?.message}
        />

        <InputField
          label="Event Date"
          name="eventDate"
          type="date"
          register={register}
          error={errors.eventDate?.message}
        />

        <InputField
          label="Event Time"
          name="eventTime"
          type="time" // Specifies time input in HH:MM format
          register={register}
          error={errors.eventTime?.message}
        />

        <InputField
          label="Location"
          name="location"
          register={register}
          error={errors.location?.message}
        />

        <InputField
          label="Description"
          name="description"
          register={register}
          error={errors.description?.message}
        />
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default EventsFormModel;
