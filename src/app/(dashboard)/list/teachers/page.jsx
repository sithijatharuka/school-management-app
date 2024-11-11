"use client";
import styles from "@/app/(dashboard)/list/teachers/page.module.css";
import TeacherFormModel from "@/components/FormModels/TeacherFormModel";
import TeacherUpdateFormModel from "@/components/FormModels/UpdateForms/TeacherUpdateFormModel";
import Table from "@/components/Table/table";
import { deleteTeacher, getAllTeachers } from "@/lib/actions/teacherAction";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "First name",
    accessor: "firstName",
  },
  {
    header: "Last Name",
    accessor: "lastName",
  },
  {
    header: "Phone",
    accessor: "phone",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Address",
    accessor: "address",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const TeachersListPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = user?.publicMetadata.role;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const [teachersData, setTeachersData] = useState([]);

  // Fetch students data when the component mounts
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const data = await getAllTeachers(); // Fetch all students
        setTeachersData(data);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudentsData();
  }, []);

  // Handle the delete action
  const handleDelete = async (teacherId) => {
    try {
      const response = await deleteTeacher(teacherId); // Call deleteStudent with the student ID
      if (response.success) {
        // Remove the student from the state to update the table
        const updatedData = await getAllTeachers();
        setTeachersData(updatedData); // Update the state with the latest data
      } else {
        console.log("Failed to delete student:", response.error);
      }
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  const renderRow = (item) => (
    <tr className={styles.row} key={item.id}>
      <td className={styles.rowData}>
        <Image
          className={styles.img}
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
          width={40}
          height={40}
        />
        <div className="">
          <h3>{item.firstName}</h3>
          <p>{item?.email}</p>
        </div>
      </td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
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
        <h2 className={styles.mainName}>All Teachers</h2>
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
                <TeacherFormModel />
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
                <TeacherUpdateFormModel teachers={editEvent} />
              </div>
            </div>
          )}
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={teachersData} />
    </div>
  );
};

export default TeachersListPage;
