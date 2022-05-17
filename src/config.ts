const config = {
  api: {
    url: `${process.env.REACT_APP_API_URL as string}/v1.1.0`,
    key: process.env.REACT_APP_API_KEY as string,
  },
};

export default config;
