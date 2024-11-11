"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "../InputField/InputField";
import { addEvent } from "@/lib/actions/events_actions";

const EventsFormModel = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <form action={addEvent} className={styles.wrapper}>
      <h1>Create a new Event</h1>
      <div className={styles.elementBox}>
        <InputField label="Event Name" name="eventName" />
        <InputField label="Event Date" name="eventDate" type="date" />
        <InputField label="Event Time" name="eventTime" type="time" />
        <InputField label="Location" name="location" />
        <InputField label="Description" name="description" />
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

export default EventsFormModel;
