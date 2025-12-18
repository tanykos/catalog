import Link from "next/link";
import MainLayout from "../components/MainLayout";
import styles from "../styles/pages/404.module.scss";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className={styles["not-found"]}>
        <span className={styles["not-found__code"]}>404</span>
        <h1 className={styles["not-found__title"]}>Страница не найдена</h1>
        <p className={styles["not-found__description"]}>
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
        <Link href="/" className={styles["not-found__link"]}>
          <ArrowLeftIcon />
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </MainLayout>
  );
}
