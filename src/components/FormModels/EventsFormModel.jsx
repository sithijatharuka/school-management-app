"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "../InputField/InputField";
import { addEvent } from "@/lib/actions/events_actions";
import { toast } from "react-toastify";
import { useState } from "react";

const EventsFormModel = () => {
  const [eventName, setEventName] = useState();
  const [eventDate, setEventDate] = useState();
  const [eventTime, setEventTime] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();

  const handleAdding = async (e) => {
    e.preventDefault();
    const event = {
      eventName,
      eventDate,
      eventTime,
      location,
      description,
    };

    try {
      const response = await addEvent(event);
      if (response.success) {
        window.location.reload();
        toast("Event saved to database");
      } else {
        toast(response.error);
        console.log("Failed to add event:", response.error);
      }
    } catch (error) {
      toast(error);
      console.log("Error ading evnt:", error);
    }
  };

  return (
    <form onSubmit={handleAdding} className={styles.wrapper}>
      <h1>Create a new Event</h1>
      <div className={styles.elementBox}>
        <InputField
          onChange={(e) => setEventName(e.target.value)}
          label="Event Name"
          name="eventName"
        />
        <InputField
          onChange={(e) => setEventDate(e.target.value)}
          label="Event Date"
          name="eventDate"
          type="date"
        />
        <InputField
          onChange={(e) => setEventTime(e.target.value)}
          label="Event Time"
          name="eventTime"
          type="time"
        />
        <InputField
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
          name="location"
        />
        <InputField
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          name="description"
        />
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default EventsFormModel;
