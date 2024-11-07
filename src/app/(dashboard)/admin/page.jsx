import styles from "@/app/(dashboard)/admin/page.module.css";
import AttendanceBox from "@/components/AttendenceBox/AttendanceBox";
import GenderBox from "@/components/GenderBox/Gender";
import UserCard from "@/components/UserCard/UserCard";

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.userCardBox}>
          <UserCard type="Students" />
          <UserCard type="Teachers" />
          <UserCard type="Parents" />
        </div>
        <div className={styles.chartBox}>
          <GenderBox />
          <AttendanceBox />
        </div>
      </div>
      <div className={styles.right}>dd</div>
    </div>
  );
};

export default Admin;
