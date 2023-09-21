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
