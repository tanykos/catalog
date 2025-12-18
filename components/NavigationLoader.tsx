import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/NavigationLoader.module.scss";
import { INavigationLoaderProps } from "../types";

export default function NavigationLoader({ text = "Загрузка..." }: INavigationLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleEnd = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleEnd);
    router.events.on("routeChangeError", handleEnd);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleEnd);
      router.events.off("routeChangeError", handleEnd);
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className={styles["navigation-loader"]}>
      <div className={styles["navigation-loader__content"]}>
        <div className={styles["navigation-loader__spinner"]} />
        <span className={styles["navigation-loader__text"]}>{text}</span>
      </div>
    </div>
  );
}
