const config = (data, url, method) => {
  return {
    method,
    baseURL: "http://localhost:5000/api-orders/",
    data,
    url
  };
};

export default config;
