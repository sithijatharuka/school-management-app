"use client";
import styles from "@/app/(dashboard)/list/teachers/page.module.css";
import FormModel from "@/components/FormModels/FormModel";
import Table from "@/components/Table/table";
import { deleteStudent, getAllStudents } from "@/lib/actions/students";
import {} from "@/lib/actions/students";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const teacherSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  parentPhone: z.string().min(1, { message: "Phone is required!" }),
  studentPhone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

const columns = [
  { header: "Info", accessor: "info" },
  { header: "User Nmae", accessor: "username" },
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Phone", accessor: "studentsPhone" },
  { header: "Address", accessor: "address" },
  { header: "Actions", accessor: "actions" },
];

const StudentsListPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = user?.publicMetadata.role;

  const [open, setOpen] = useState(false);

  const [studentsData, setStudentsData] = useState([]);

  // Fetch students data when the component mounts
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const data = await getAllStudents(); // Fetch all students
        setStudentsData(data);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudentsData();
  }, []);

  // Handle the delete action
  const handleDelete = async (studentId) => {
    try {
      const response = await deleteStudent(studentId); // Call deleteStudent with the student ID
      if (response.success) {
        // Remove the student from the state to update the table
        const updatedData = await getAllStudents();
        setStudentsData(updatedData); // Update the state with the latest data
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
          <h3>{item.username}</h3>
          <p>{item?.email}</p>
        </div>
      </td>
      <td>{item.username}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.studentPhone}</td>
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
        <h2 className={styles.mainName}>All Students</h2>
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
                <FormModel />
              </div>
            </div>
          )}
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
    </div>
  );
};

export default StudentsListPage;
