// ProfilePage.jsx or ProfilePage.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import styles from "@/app/(dashboard)/profile/profilePage.module.css";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.banner}></div>
        <div className={styles.profileContent}>
          <div className={styles.avatarWrapper}>
            <img src={user.imageUrl} alt="Profile" className={styles.avatar} />
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user.fullName}</h1>
            <p className={styles.userRole}>
              {user.publicMetadata.role || "Member"}
            </p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>Personal Information</h2>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span>{user.primaryEmailAddress?.emailAddress}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Phone:</span>
                <span>
                  {user.phoneNumbers?.[0]?.phoneNumber || "Not provided"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Location:</span>
                <span>{user.publicMetadata.location || "Not provided"}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>Account Details</h2>
              <div className={styles.infoItem}>
                <span className={styles.label}>Role:</span>
                <span>{user.publicMetadata.role || "Member"}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Joined:</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
