"use client";
import styles from "@/app/(dashboard)/list/teachers/page.module.css";
import ExamsFormModel from "@/components/FormModels/ExamsFormModel";
import ExamsUpdateFormModel from "@/components/FormModels/UpdateForms/ExamsUpdateFormModel";
import Table from "@/components/Table/table";
import { deleteExam, getAllExams } from "@/lib/actions/examsActions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const columns = [
  {
    header: "Exam Name",
    accessor: "examName",
  },
  {
    header: "Exam Date",
    accessor: "examDate",
  },
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "Total Marks",
    accessor: "totalMarks",
  },
  {
    header: "Duration (Hours)",
    accessor: "duration",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const ExamListPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = user?.publicMetadata.role;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null); // Store
  const [examsData, setExamsData] = useState([]);

  // Fetch students data when the component mounts
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const data = await getAllExams(); // Fetch all students
        setExamsData(data);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudentsData();
  }, []);

  // Handle the delete action
  const handleDelete = async (examId) => {
    try {
      const response = await deleteExam(examId); // Call deleteStudent with the student ID
      if (response.success) {
        // Remove the student from the state to update the table
        const updatedData = await getAllExams();
        setExamsData(updatedData); // Update the state with the latest data
      } else {
        console.log("Failed to delete student:", response.error);
      }
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  const renderRow = (item) => (
    <tr className={styles.row} key={item.id}>
      <td>{item.examName}</td>
      <td>{item.examDate.toDateString()}</td>
      <td>{item.subject}</td>
      <td>{item.totalMarks}</td>
      <td>{item.duration}</td>
      <td>
        <div className={styles.actionbox}>
          {role === "admin" && (
            <>
              <button
                className={`${styles.btn} ${styles.btn1}`}
                aria-label="View"
                onClick={() => {
                  setEditEvent(item); // Set the event data to be edited
                  setEditOpen(true); // Open the edit modal
                }}
              >
                <Image src="/view.png" alt="Delete" width={16} height={16} />
              </button>
              <button
                className={`${styles.btn} ${styles.btn2}`}
                aria-label="Delete"
                onClick={() => handleDelete(item._id)}
              >
                <Image src="/delete.png" alt="Delete" width={16} height={16} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <h2 className={styles.mainName}>All Exams</h2>
        <div className={styles.actionBar}>
          {role === "admin" && (
            <button className={styles.btnCreate} onClick={() => setOpen(true)}>
              <Image src="/create.png" alt="View" width={16} height={16} />
            </button>
          )}
          {open && (
            <div className={styles.screenOverlay}>
              <div className={styles.box}>
                <div className={styles.closeBox} onClick={() => setOpen(false)}>
                  <Image src="/close.png" alt="" height={14} width={14} />
                </div>
                <ExamsFormModel />
              </div>
            </div>
          )}
          {/* Update Form */}
          {editOpen && editEvent && (
            <div className={styles.screenOverlay}>
              <div className={styles.box}>
                <div
                  className={styles.closeBox}
                  onClick={() => setEditOpen(false)}
                >
                  <Image src="/close.png" alt="" height={14} width={14} />
                </div>
                <ExamsUpdateFormModel examD={editEvent} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={examsData} />
    </div>
  );
};

export default ExamListPage;
