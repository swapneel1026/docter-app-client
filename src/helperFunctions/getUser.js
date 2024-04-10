import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export function getUser() {
  const token = Cookies.get("token");
  if (token == undefined) {
    return null;
  }

  const userDetails = jwtDecode(token);
  return userDetails;
}
