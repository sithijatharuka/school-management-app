import styles from "@/components/Navbar/Navbar.module.css";
import { role } from "@/lib/data";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.nameBox}>
        <h3>Sithija Tharuka</h3>
        <h5>{role}</h5>
      </div>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}></div>
      </div>
    </div>
  );
}
