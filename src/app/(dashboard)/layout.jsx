import Menu from "@/components/Menu/Menu";
import styles from "./layout.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* left */}
      <div className={styles.left}>
        <h1>School App</h1>
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
