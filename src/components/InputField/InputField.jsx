import styles from "@/components/InputField/InputField.module.css";

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className={styles.itemBox}>
      <label className={styles.label}>{label}</label>
      <input
        value={value}
        required
        type={type}
        name={name}
        className={styles.inputStyle}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
