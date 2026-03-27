import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/components/CardItem.module.scss";
import cn from "classnames";
import HeartIcon from "./icons/HeartIcon";
import { ICardItemProps } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleFavoriteAsync } from "../store/reducers/catalogPageSlice";
import { getIsFavoriteUpdating } from "../store/selectors";
import { ERROR_MESSAGES, ERROR_DISPLAY_DURATION } from "../api/constants";

export default function CardItem({ card, onSelect }: ICardItemProps) {
  const dispatch = useAppDispatch();
  const isFavoriteUpdating = useAppSelector((state) => getIsFavoriteUpdating(state, card.id));
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const handleCardClick = () => {
    onSelect(card.id);
  };

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFavoriteUpdating) return;

    setFavoriteError(null);
    const result = await dispatch(toggleFavoriteAsync({ id: card.id, isFavorite: !card.isFavorite }));

    if (toggleFavoriteAsync.rejected.match(result)) {
      setFavoriteError(ERROR_MESSAGES.FAVORITE_ERROR);
      errorTimerRef.current = setTimeout(() => setFavoriteError(null), ERROR_DISPLAY_DURATION);
    }
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
            [styles["card__add-to-favorite-btn_error"]]: favoriteError,
          })}
        >
          <HeartIcon />
          {favoriteError && (
            <span className={styles["card__favorite-error"]}>{favoriteError}</span>
          )}
        </button>
      </div>
    </div>
  );
}
