"use client";
import styles from "@/app/(dashboard)/student/page.module.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { getAllEvents } from "@/lib/actions/events_actions";
import BigClender from "@/components/BigCalender/BigCalender";
import "react-big-calendar/lib/css/react-big-calendar.css";

const TeacherPage = () => {
  const [value, setValue] = useState(new Date());
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getAllEvents();
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
          <h3 className={styles.eventsTitle}>All Events</h3>
          <div className={styles.eventsWrapper}>
            {eventsData.length > 0 ? (
              eventsData.map((event) => (
                <div key={event._id} className={styles.eventCard}>
                  <div className={styles.eventDate}>
                    {new Date(event.eventDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <div className={styles.eventTime}>{event.eventTime}</div>
                  </div>
                  <h4 className={styles.eventTitle}>{event.eventName}</h4>
                  <p className={styles.eventDescription}>{event.description}</p>
                  <div className={styles.eventFooter}>
                    <span className={styles.eventLocation}>
                      📍 {event.location || "No location"}
                    </span>
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

export default TeacherPage;
