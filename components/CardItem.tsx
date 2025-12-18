import React from "react";
import Image from "next/image";
import styles from "../styles/components/CardItem.module.scss";
import cn from "classnames";
import HeartIcon from "./icons/HeartIcon";
import { ICardItemProps } from "../types";

export default function CardItem({ card, onSelect }: ICardItemProps) {
  const handleCardClick = () => {
    onSelect(card.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: реализовать добавление в избранное
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
          onClick={handleFavoriteClick}
          className={cn(styles["card__add-to-favorite-btn"], {
            [styles["card__add-to-favorite-btn_active"]]: card.isFavorite,
          })}
        >
          <HeartIcon />
        </button>
      </div>
    </div>
  );
}
