const config = () => ({
  BASE_URL: window.location.protocol.startsWith("https")
    ? "https://analy-dashboard.vercel.app"
    : "http://localhost:3000",
  authHeader: (token: string) => ({ Authorization: "Bearer " + token }),
});

export default config;
