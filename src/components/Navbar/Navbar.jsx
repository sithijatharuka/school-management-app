import styles from "@/components/Navbar/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.nameBox}>
        <h3>Sithija Tharuka</h3>
        <h5>Admin</h5>
      </div>
      <div className={styles.avatar}></div>
    </div>
  );
}
