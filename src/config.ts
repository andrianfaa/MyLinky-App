const config = {
  BASE_URL: process.env.REACT_APP_BASE_URL as string || "http://localhost:3000",
  API: {
    URL: `${process.env.REACT_APP_API_URL as string}/v1.1.0`,
    KEY: process.env.REACT_APP_API_KEY as string,
  },
};

export default config;
