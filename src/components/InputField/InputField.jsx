import styles from "@/components/InputField/InputField.module.css";

const InputField = ({ label, type, name }) => {
  return (
    <div className={styles.itemBox}>
      <label className={styles.label}>{label}</label>
      <input required type={type} name={name} className={styles.inputStyle} />
    </div>
  );
};

export default InputField;
