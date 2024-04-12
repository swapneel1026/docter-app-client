export async function setCookieToLocalStorage() {
  const API_URL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_PROD_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL;

  try {
    const res = await fetch(`${API_URL}/api/user/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user details");
    }

    const token = await res.json();

    if (!token.cookie) {
      return null;
    } else {
      localStorage.setItem(
        "tokenDetails",
        JSON.stringify({
          token: token?.cookieValue,
          loggedin: true,
        })
      );
      return true;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}
