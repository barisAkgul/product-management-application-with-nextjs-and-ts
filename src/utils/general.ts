export const getFromLocalStorage = (
  storageName: string,
  defaultValue: string
): string => {
  // To check if we are on the client side
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(storageName);

    return value || defaultValue;
  }

  return defaultValue;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
