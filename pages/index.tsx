import Link from "next/link";
import MainLayout from "../components/MainLayout";
import styles from "../styles/pages/index.module.scss";

export default function IndexPage() {
  return (
    <MainLayout>
      <div className={styles["index-page"]}>
        <div className={styles["hero"]}>
          <div className={styles["hero__content"]}>
            <h1 className={styles["hero__title"]}>Тестовое задание</h1>
            <p className={styles["hero__subtitle"]}>
              Frontend Developer (React/Next.js)
            </p>
          </div>
          <Link href="/products" className={styles["hero__button"]}>
            <span className={styles["hero__button-text"]}>Смотреть фотокарточки</span>
          </Link>
        </div>

        <section className={styles["section"]}>
          <h2 className={styles["section__title"]}>Описание проекта</h2>
          <p className={styles["section__text"]}>
            Каталог товаров с фильтрацией, сортировкой и возможностью добавления комментариев.
            В проекте реализована базовая структура и верстка. Необходимо реализовать недостающий функционал.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2 className={styles["section__title"]}>Технологии</h2>
          <ul className={styles["list"]}>
            <li className={styles["list__item"]}>Next.js 13</li>
            <li className={styles["list__item"]}>TypeScript</li>
            <li className={styles["list__item"]}>Redux Toolkit</li>
            <li className={styles["list__item"]}>SCSS Modules</li>
          </ul>
        </section>

        <section className={styles["section"]}>
          <h2 className={styles["section__title"]}>Задачи</h2>
          <ul className={styles["list"]}>
            <li className={styles["list__item"]}>
              <strong>Задача 1:</strong> Получение и отображение данных — реализуйте загрузку данных карточек и их отображение на странице каталога
            </li>
            <li className={styles["list__item"]}>
              <strong>Задача 2:</strong> Фильтрация по странам — реализуйте фильтр карточек по странам (поле country)
            </li>
            <li className={styles["list__item"]}>
              <strong>Задача 3:</strong> Счётчик товаров — отобразите количество товаров, соответствующих текущим фильтрам
            </li>
            <li className={styles["list__item"]}>
              <strong>Задача 4 (не обязательно):</strong> Добавление в избранное — реализуйте функционал добавления и удаления товара из избранного
            </li>
          </ul>
        </section>

        <section className={styles["section"]}>
          <h2 className={styles["section__title"]}>Критерии оценки</h2>
          <ul className={styles["list"]}>
            <li className={styles["list__item"]}>Корректность работы функционала</li>
            <li className={styles["list__item"]}>Работа с Redux Toolkit</li>
            <li className={styles["list__item"]}>Оптимизация производительности</li>
            <li className={styles["list__item"]}>Качество реализации</li>
          </ul>
        </section>

        <section className={styles["section"]}>
          <h2 className={styles["section__title"]}>API</h2>
          <p className={styles["section__text"]}>
            Эндпоинт: <code>https://649b5496bf7c145d023a3abb.mockapi.io/cards</code>
          </p>
          <p className={styles["section__text"]}>
            Доступные методы описаны в <code>api/api.ts</code>
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
