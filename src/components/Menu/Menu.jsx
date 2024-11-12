"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "primereact/button";
import { useState } from "react";

const Menu = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = user?.publicMetadata.role;

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevState) => !prevState); // Toggle the menu visibility
  };

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/home.png",
          label: "Home",
          href: `/${role}`,
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/teacher.png",
          label: "Teachers",
          href: "/list/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/student.png",
          label: "Students",
          href: "/list/students",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/exam.png",
          label: "Exams",
          href: "/list/exams",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: "/announcement.png",
          label: "Events",
          href: "/list/events",
          visible: ["admin", "teacher", "student"],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: "/profile.png",
          label: "Profile",
          href: "/profile",
          visible: ["admin", "teacher", "student"],
        },
      ],
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBox}>
        <h1 className={styles.eduMate}>EduMate</h1>
      </div>
      {menuItems.map((i) => (
        <div className={styles.textWrapper} key={i.title}>
          <span className={styles.title}>{i.title}</span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link className={styles.link} href={item.href} key={item.label}>
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className={styles.lbl}>{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
      <Link className={styles.closeBtn} href="">
        <Image
          className={styles.closeImg}
          src="/close.png"
          alt=""
          width={13}
          height={15}
          onClick={toggleMenu}
        />
        <span>Close</span>
      </Link>
      {open && (
        <Menu
          className={`${styles.wrapper} ${isMenuOpen ? styles.close : ""}`}
        />
      )}
    </div>
  );
};

export default Menu;
