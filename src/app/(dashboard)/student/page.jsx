"use client";
import styles from "@/app/(dashboard)/student/page.module.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { getAllEvents } from "@/lib/actions/events_actions"; // Make sure this action fetches events from your schema
import BigClender from "@/components/BigCalender/BigCalender";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Events = () => {
  const [value, setValue] = useState(new Date());
  const [eventsData, setEventsData] = useState([]);

  // Fetch events data when the component mounts
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getAllEvents(); // Fetch all events based on your schema
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <BigClender />
      </div>
      <div className={styles.right}>
        <Calendar
          className={styles.calendarWrapper}
          onChange={setValue}
          value={value}
        />
        <div className={styles.eventsContainer}>
          <h1 className={styles.eventsTitle}>All Events</h1>
          <div className={styles.eventsWrapper}>
            {eventsData.length > 0 ? (
              eventsData.map((event) => (
                <div key={event._id} className={styles.eventCard}>
                  <div className="eventHeader">
                    <div>
                      <div className={styles.eventDate}>
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className={styles.eventTime}>{event.eventTime}</div>
                    </div>
                  </div>

                  <h4 className={styles.eventTitle}>{event.eventName}</h4>
                  <p className={styles.eventDescription}>{event.description}</p>

                  <div className={styles.eventFooter}>
                    <div className={styles.eventLocation}>
                      <span>📍 {event.location || "No location"}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noEvents}>No events available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
