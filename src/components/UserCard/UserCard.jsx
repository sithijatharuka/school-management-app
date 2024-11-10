import styles from "@/components/UserCard/UserCard.module.css";

const UserCard = ({ type, count }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.count}>{count}</span>
        <h2 className={styles.type}>{type}</h2>
      </div>
    </div>
  );
};

export default UserCard;
