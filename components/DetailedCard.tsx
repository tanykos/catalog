import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/DetailedCard.module.scss";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addCommentAsync } from "../store/reducers/catalogPageSlice";
import { getCardById } from "../store/selectors";
import { IDetailedCardProps } from "../types";
import { ERROR_MESSAGES } from "../api/constants";
import ArrowRightIcon from "./icons/ArrowRightIcon";

export default function DetailedCard({ cardId }: IDetailedCardProps) {
  const card = useAppSelector((state) => getCardById(state, cardId));
  const dispatch = useAppDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [cardId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!textAreaRef.current || !cardId || !card || isSubmitting) return;

    const comment = textAreaRef.current.value.trim();
    if (!comment) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await dispatch(addCommentAsync({ id: cardId, comment, currentComments: card.comments }));

      if (addCommentAsync.fulfilled.match(result)) {
        textAreaRef.current.value = "";
      } else {
        setError(ERROR_MESSAGES.COMMENT_ERROR);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!card) {
    return <strong className={styles["card__not-found"]}>Данные не найдены</strong>;
  }

  return (
    <div className={styles.card}>
      <span className={styles["card__title"]}>{card.title}</span>
      <span className={styles["card__description"]}>
        {card.description}
      </span>
      <div className={styles["card__img-container"]}>
        <Image
          src={card.avatar}
          alt={card.title}
          className={styles["card__img"]}
          fill
          unoptimized
        />
      </div>
      <Link href={`/products/${card.id}`} className={styles["card__link"]}>
        <span>Перейти на страницу</span>
        <ArrowRightIcon />
      </Link>

      <div className={cn(styles["card__comments-list-container"], styles["comments"])}>
        <span className={styles["comments__title"]}>Комментарии</span>
        {card.comments.length === 0 ? (
          <p className={styles["comments__empty"]}>Комментариев пока нет</p>
        ) : (
          card.comments.map((comment, idx) => (
            <div key={`${card.id}-comment-${idx}`} className={styles["comments__item-container"]}>
              <span className={styles["comments__author"]}>Аноним</span>
              <p className={styles["comments__text"]}>{comment}</p>
            </div>
          ))
        )}

        <form onSubmit={handleSubmit} className={cn(styles["card__create-comment-form"], styles["form"])}>
          <div className={cn(styles["form__textarea-wrapper"], { [styles["form__textarea-wrapper_submitting"]]: isSubmitting })}>
            <textarea
              ref={textAreaRef}
              className={styles["form__textarea"]}
              placeholder="Оставить комментарий..."
              name="comment"
              disabled={isSubmitting}
            />
          </div>
          {error && <span className={styles["form__error"]}>{error}</span>}
          <button
            type="submit"
            className={styles["form__submit-btn"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}
