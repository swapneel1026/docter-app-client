import { jwtDecode } from "jwt-decode";

export function getPayload() {
  const tokenDetails = JSON.parse(localStorage.getItem("tokenDetails"));
  try {
    const payload = jwtDecode(tokenDetails.token);
    return payload;
  } catch (error) {
    return null;
  }
}
