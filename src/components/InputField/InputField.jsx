import styles from "@/components/InputField/InputField.module.css";

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}) => {
  return (
    <div className={styles.itemBox}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        {...register(name)}
        className={styles.inputStyle}
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className={styles.errText}>{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
