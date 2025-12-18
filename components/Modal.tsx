import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/components/Modal.module.scss";
import { IModalProps } from "../types";

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

export default function Modal({ children, isVisible, onClose }: IModalProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  if (!isVisible || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__card} onClick={stopPropagation}>
        <div className={styles.modal__content}>
          {children}
        </div>
        <div className={styles.modal__footer}>
          <button className={styles["modal__close-btn"]} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
