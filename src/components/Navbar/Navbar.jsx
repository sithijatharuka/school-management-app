"use client";

import styles from "@/components/Navbar/Navbar.module.css";
// import { role } from "@/lib/data";
import { UserButton, useUser } from "@clerk/nextjs";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user);
  const role = user?.publicMetadata.role;
  const name = user?.fullName;

  return (
    <div className={styles.container}>
      <div className={styles.nameBox}>
        <h3>{name}</h3>
        <h5>{role}</h5>
      </div>
      <div className={styles.avatarContainer}>
        <UserButton />
      </div>
    </div>
  );
}
