"use client";
import styles from "@/app/(dashboard)/list/teachers/page.module.css";
import FormModel from "@/components/FormModels/FormModel";
import TeacherFormModel from "@/components/FormModels/TeacherFormModel";
import Table from "@/components/Table/table";
import { deleteTeacher, getAllTeachers } from "@/lib/actions/teacherAction";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
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
  const [open, setOpen] = useState(false);

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
          src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200"
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
          <Link className={styles.link} href={"/"}>
            <button
              className={`${styles.btn} ${styles.btn1}`}
              aria-label="View"
            >
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button
              className={`${styles.btn} ${styles.btn2}`}
              aria-label="Delete"
              onClick={() => handleDelete(item._id)}
            >
              <Image src="/delete.png" alt="Delete" width={16} height={16} />
            </button>
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
          <button className={styles.btnCreate} onClick={() => setOpen(true)}>
            <Image src="/create.png" alt="View" width={16} height={16} />
          </button>
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
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={teachersData} />
    </div>
  );
};

export default TeachersListPage;
