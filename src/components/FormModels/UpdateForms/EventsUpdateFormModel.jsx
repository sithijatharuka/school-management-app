"use client";
import styles from "@/components/FormModels/FormModel.module.css";
import InputField from "@/components/InputField/InputField";
import { updateEvent } from "@/lib/actions/events_actions";
import { useState, useEffect } from "react";

const EventsUpdateFormModel = ({ eventData, setEditOpen }) => {
  // Initialize form fields with the provided event data
  const [eventName, setEventName] = useState(eventData?.eventName || "");
  const [eventDate, setEventDate] = useState(
    eventData?.eventDate ? eventData.eventDate.toISOString().split("T")[0] : ""
  );
  const [eventTime, setEventTime] = useState(eventData?.eventTime || "");
  const [location, setLocation] = useState(eventData?.location || "");
  const [description, setDescription] = useState(eventData?.description || "");

  // Update the form values whenever the eventData changes
  useEffect(() => {
    if (eventData) {
      setEventName(eventData.eventName);
      setEventDate(
        eventData.eventDate
          ? eventData.eventDate.toISOString().split("T")[0]
          : ""
      );
      setEventTime(eventData.eventTime);
      setLocation(eventData.location);
      setDescription(eventData.description);
    }
  }, [eventData]);

  // Handle the update action
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare the updated event data
    const updatedEvent = {
      _id: eventData._id,
      eventName,
      eventDate,
      eventTime,
      location,
      description,
    };

    try {
      const response = await updateEvent(updatedEvent._id, updatedEvent); // Call updateEvent with the updated data
      if (response.success) {
        // Optionally, close the modal or reload the page
        window.location.reload();
        console.log("Event updated successfully");
      } else {
        console.log("Failed to update event:", response.error);
      }
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleUpdate}>
      <h1>Update Event</h1>
      <div className={styles.elementBox}>
        <InputField
          value={eventName}
          label="Event Name"
          name="eventName"
          onChange={(e) => setEventName(e.target.value)} // Update event name
        />
        <InputField
          value={eventDate}
          label="Event Date"
          name="eventDate"
          type="date"
          onChange={(e) => setEventDate(e.target.value)} // Update event date
        />
        <InputField
          value={eventTime}
          label="Event Time"
          name="eventTime"
          type="time"
          onChange={(e) => setEventTime(e.target.value)} // Update event time
        />
        <InputField
          value={location}
          label="Location"
          name="location"
          onChange={(e) => setLocation(e.target.value)} // Update location
        />
        <InputField
          value={description}
          label="Description"
          name="description"
          onChange={(e) => setDescription(e.target.value)} // Update description
        />
      </div>

      <button type="submit" className={styles.createBtn}>
        Update
      </button>
    </form>
  );
};

export default EventsUpdateFormModel;
