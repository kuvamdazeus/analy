const config = {
  BASE_URL: "http://localhost:3000",
  authHeader: (token: string) => ({ Authorization: "Bearer " + token }),
};

export default config;
