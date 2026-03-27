import { useEffect } from "react";
import { GetServerSideProps } from "next";
import MainLayout from "../components/MainLayout";
import CardsList from "../components/CardsList";
import CatalogFilters from "../components/CatalogFilters";
import styles from "../styles/pages/products.module.scss";
import { useAppDispatch } from "../hooks";
import { getCards } from "../api/api";
import { ICard } from "../types";
import { fetchCards, initializeCards } from "../store/reducers/catalogPageSlice";
import { ERROR_MESSAGES } from "../api/constants";

interface IProductsPageProps {
  initialCards: ICard[] | null;
  ssrError: string | null;
}

export default function ProductsPage({ initialCards, ssrError }: IProductsPageProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialCards) {
      dispatch(initializeCards(initialCards));
      return;
    }

    if (ssrError) {
      dispatch(fetchCards());
    }
  }, [dispatch, initialCards, ssrError]);

  return (
    <MainLayout>
      <div className={styles["content-container"]}>
        <CatalogFilters initialCards={initialCards} />
        <CardsList initialCards={initialCards} />
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IProductsPageProps> = async () => {
  const result = await getCards();

  if (!result.success) {
    return {
      props: {
        initialCards: null,
        ssrError: result.error ?? ERROR_MESSAGES.LOAD_ERROR,
      },
    };
  }

  return {
    props: {
      initialCards: result.data ?? [],
      ssrError: null,
    },
  };
};
