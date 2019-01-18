const config = (data, url, method, token) => {
  return {
    method,
    baseURL: "http://localhost:5000/api/",
    data,
    url,
    headers: {
      authorization:
        `Bearer ${localStorage.getItem("ZappoToken")}` || `Bearer ${token}`
    }
  };
};

export default config;
