import { useEffect } from "react";
import { GetServerSideProps } from "next";
import MainLayout from "../components/MainLayout";
import CardsList from "../components/CardsList";
import CatalogFilters from "../components/CatalogFilters";
import styles from "../styles/pages/products.module.scss";
import { useAppDispatch } from "../hooks";
import { getCards } from "../api/api";
import { ICard } from "../types";

interface IProductsPageProps {
  initialCards: ICard[] | null;
  ssrError: string | null;
}

export default function ProductsPage(props) {
  const dispatch = useAppDispatch();

  // TODO: реализовать получение данных

  return (
    <MainLayout>
      <div className={styles["content-container"]}>
        <CatalogFilters />
        <CardsList />
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IProductsPageProps> = async () => {
  const result = await getCards();
  return;
};
