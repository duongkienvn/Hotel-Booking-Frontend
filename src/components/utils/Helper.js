import {jwtDecode} from "jwt-decode";

export const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .filter(word => word.trim() !== "")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;

    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function getUserRole(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.roles || null;
  } catch {
    return [localStorage.getItem("userRole")];
  }
}