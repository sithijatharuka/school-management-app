import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <form
        className={styles.loginForm}
        action="/api/login"
        method="POST"
        autoComplete="off"
      >
        <h2>Login to EduMates</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          minLength="4"
          maxLength="20"
          pattern="[A-Za-z0-9]+"
          title="Alphanumeric characters only"
          className={styles.inputField}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength="8"
          maxLength="20"
          title="Password should be 8-20 characters long"
          className={styles.inputField}
        />

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
}
