"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "@/app/(dashboard)/student/page.module.css";
import cssStyle from "@/app/(dashboard)/admin/page.module.css";
import AttendanceBox from "@/components/AttendenceBox/AttendanceBox";
import GenderBox from "@/components/GenderBox/Gender";
import UserCard from "@/components/UserCard/UserCard";
import { getStudentCount } from "@/lib/actions/students";
import { getTeacherCount } from "@/lib/actions/teacherAction";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getAllEvents } from "@/lib/actions/events_actions";
import BigClender from "@/components/BigCalender/BigCalender";

const Admin = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

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

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const { count } = await getStudentCount();
        const { counts } = await getTeacherCount();
        setStudentCount(count);
        setTeacherCount(counts);
        console.log("Student count fetched:", count);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <div className={cssStyle.container}>
      <div className={cssStyle.left}>
        <div className={cssStyle.userCardBox}>
          <UserCard count={studentCount} type="Students" />
          <UserCard count={teacherCount} type="Teachers" />
        </div>
        <div className={cssStyle.chartBox}>
          <h3>Welcome to Edumate 🎉</h3>
          <br />
          <h2>Simplifying School Management, One Click at a Time</h2>
        </div>
      </div>
      <div className={cssStyle.right}>
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
                  </div>
                  <div className={styles.eventTime}>{event.eventTime}</div>
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

export default Admin;
