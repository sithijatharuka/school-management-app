import styles from "@/components/UserCard/UserCard.module.css";

const UserCard = ({ type }) => {
  return (
    <div className={styles.wrapper}>
      <span>1250</span>
      <h2>{type}</h2>
    </div>
  );
};

export default UserCard;
