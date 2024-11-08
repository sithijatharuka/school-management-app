import styles from "@/components/InputField/InputField.module.css";

const InputField = ({ label, type, register, name, error }) => {
  return (
    <div className={styles.itemBox}>
      <label className={styles.label}>{label}</label>
      <input
        required
        type={type}
        {...register(name)}
        name={name}
        className={styles.inputStyle}
      />
      {error?.message && (
        <p className={styles.errText}>{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
