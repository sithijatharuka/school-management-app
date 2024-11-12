"use client";

import styles from "@/components/Navbar/Navbar.module.css";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import Menu from "../Menu/Menu";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user);
  const role = user?.publicMetadata.role;
  const name = user?.fullName;

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <button onClick={toggleMenu} className={styles.menuBtn}>
          <Image src="/menu.png" alt="" width={20} height={20} />
        </button>
      </div>
      <div className={styles.nameBox}>
        <div className={styles.names}>
          <h3>{name}</h3>
          <h5>{role}</h5>
        </div>
        <div className={styles.avatarContainer}>
          <UserButton />
        </div>
      </div>

      {isMenuOpen && ( // Conditionally render the menu when it's open
        <Menu />
      )}
    </div>
  );
}
