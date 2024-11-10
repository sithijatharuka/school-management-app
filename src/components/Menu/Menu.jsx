"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Menu = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = user?.publicMetadata.role;

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
    </div>
  );
};

export default Menu;
