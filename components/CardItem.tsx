import React from "react";
import Image from "next/image";
import styles from "../styles/components/CardItem.module.scss";
import cn from "classnames";
import HeartIcon from "./icons/HeartIcon";
import { ICardItemProps } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleFavoriteAsync } from "../store/reducers/catalogPageSlice";
import { getIsFavoriteUpdating } from "../store/selectors";

export default function CardItem({ card, onSelect }: ICardItemProps) {
  const dispatch = useAppDispatch();
  const isFavoriteUpdating = useAppSelector((state) => getIsFavoriteUpdating(state, card.id));

  const handleCardClick = () => {
    onSelect(card.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFavoriteUpdating) return;

    dispatch(toggleFavoriteAsync({ id: card.id, isFavorite: !card.isFavorite }));
  };

  return (
    <div className={styles["card"]} onClick={handleCardClick}>
      <div className={styles["card__img-container"]}>
        <Image
          className={styles["card__img"]}
          src={card.avatar}
          fill
          alt={card.title}
          unoptimized
        />
      </div>
      <div className={styles["card__description-container"]}>
        <span className={styles["card__title"]}>{card.title}</span>
        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={isFavoriteUpdating}
          aria-label={card.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          className={cn(styles["card__add-to-favorite-btn"], {
            [styles["card__add-to-favorite-btn_active"]]: card.isFavorite,
            [styles["card__add-to-favorite-btn_loading"]]: isFavoriteUpdating,
          })}
        >
          <HeartIcon />
        </button>
      </div>
    </div>
  );
}
