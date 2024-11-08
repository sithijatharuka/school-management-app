"use client";
import styles from "@/app/(dashboard)/list/teachers/page.module.css";
import FormModel from "@/components/FormModel/FormModel";
import Table from "@/components/Table/table";
import { role, teachersData } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher Id",
    accessor: "teacherId",
  },
  {
    header: "Subjects",
    accessor: "subjects",
  },
  {
    header: "Classes",
    accessor: "classes",
  },
  {
    header: "Phone",
    accessor: "phone",
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

  const renderRow = (item) => (
    <tr className={styles.row} key={item.id}>
      <td className={styles.rowData}>
        <Image
          className={styles.img}
          src={item.photo}
          alt=""
          width={40}
          height={40}
        />
        <div className="">
          <h3>{item.name}</h3>
          <p>{item?.email}</p>
        </div>
      </td>
      <td>{item.teacherId}</td>
      <td>{item.subjects.join(",")}</td>
      <td>{item.classes.join(",")}</td>
      <td>{item.phone}</td>
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
                <FormModel />
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
