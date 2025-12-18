export const API_BASE_URL = "https://649b5496bf7c145d023a3abb.mockapi.io/cards";
export const REQUEST_TIMEOUT = 10000;
export const ERROR_DISPLAY_DURATION = 3000;

export const ERROR_MESSAGES = {
  LOAD_ERROR: "Произошла ошибка загрузки",
  FAVORITE_ERROR: "Не удалось обновить избранное",
  COMMENT_ERROR: "Не удалось отправить комментарий",
  REQUEST_TIMEOUT: "Превышено время ожидания",
  UNKNOWN_ERROR: "Неизвестная ошибка",
} as const;
