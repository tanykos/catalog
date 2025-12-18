import CardItem from "./CardItem";
import SkeletonCard from "./SkeletonCard";
import styles from "../styles/components/CardsList.module.scss";
import Modal from "./Modal";
import DetailedCard from "./DetailedCard";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCardsData, getIsLoading, getError } from "../store/selectors";
import { fetchCards } from "../store/reducers/catalogPageSlice";

const SKELETON_COUNT = 6;

export default function CardsList() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getError);
  const isLoading = useAppSelector(getIsLoading);
  const cards = useAppSelector(getCardsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleRetry = () => {
    dispatch(fetchCards());
  };

  if (isLoading) {
    return (
      <div className={styles["cards-list"]}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["cards-list"]}>
        <div className={styles["cards-list__error-container"]}>
          <strong className={styles["cards-list__error-text"]}>{error}</strong>
          <button onClick={handleRetry} className={styles["cards-list__retry-btn"]}>
            Повторить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["cards-list"]}>
      {cards.length === 0 ? (
        <div className={styles["cards-list__empty"]}>
          Товары не найдены. Попробуйте изменить фильтры.
        </div>
      ) : (
        cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onSelect={handleCardSelect}
          />
        ))
      )}
      {isModalVisible && (
        <Modal isVisible={isModalVisible} onClose={handleModalClose}>
          <DetailedCard cardId={selectedCardId} />
        </Modal>
      )}
    </div>
  );
}
