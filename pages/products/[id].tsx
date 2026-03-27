import { GetServerSideProps } from "next";
import styles from "../../styles/pages/products/product.module.scss";
import MainLayout from "../../components/MainLayout";
import { getCardById as fetchCardById } from "../../api/api";
import { getCardById } from "../../store/selectors";
import { useAppSelector } from "../../hooks";
import { ICard } from "../../types";

interface IProductPageProps {
  card: ICard | null;
  error: string | null;
}

export default function ProductPage({ card: ssrCard, error }: IProductPageProps) {
  const cardId = ssrCard?.id ?? null;
  const reduxCard = useAppSelector((state) => getCardById(state, cardId));

  const card = reduxCard ?? ssrCard;

  if (error || !card) {
    return (
      <MainLayout>
        <div className={styles.product}>{error || "Товар не найден"}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.product}>
        <h1>Товар #{card.id}</h1>
        <p>Название: {card.title}</p>
        <p>Описание: {card.description}</p>
        <p>Цена: {card.price} ₽</p>
        <p>Страна: {card.country}</p>
        <p>В избранном: {card.isFavorite ? "Да" : "Нет"}</p>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IProductPageProps> = async ({
  params,
}) => {
  const id = params?.id;

  if (typeof id !== "string") {
    return {
      props: { card: null, error: "Некорректный ID товара" },
    };
  }

  const result = await fetchCardById(id);

  if (!result.success) {
    return {
      props: { card: null, error: result.error },
    };
  }

  return {
    props: { card: result.data ?? null, error: null },
  };
};
