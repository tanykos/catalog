import styles from "../styles/components/SkeletonCard.module.scss";

export default function SkeletonCard() {
  return (
    <div className={styles["skeleton"]}>
      <div className={styles["skeleton__img"]} />
      <div className={styles["skeleton__content"]}>
        <div className={styles["skeleton__title"]} />
      </div>
    </div>
  );
}
