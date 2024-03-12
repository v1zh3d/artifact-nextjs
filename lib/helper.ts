export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("authToken") || ""
    : "";
};

export const saveValuesInLocalStorage = (obj: Record<string, any>) => {
  const jsonObj = JSON.stringify(obj);
  localStorage.setItem("userFormValues", jsonObj);
};

export const getValuesInLocalStorage = () => {
  return typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userFormValues") || "{}")
    : {};
};

export const checkObjectValues = (obj: Record<string, any>): boolean => {
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] &&
      obj[key].length > 0
    ) {
      return true;
    }
  }
  return false;
};
