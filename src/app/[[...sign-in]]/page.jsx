"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "@/app/[[...sign-in]]/page.module.css";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className={styles.page}>
      <SignIn />
    </div>
  );
}
