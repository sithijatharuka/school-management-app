import Menu from "@/components/Menu/Menu";
import styles from "./layout.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* left */}
      <div className={styles.left}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>EduMate</h1>
        </div>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className={styles.right}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
