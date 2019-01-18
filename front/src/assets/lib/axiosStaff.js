const config = (data, url, method, token) => {
    return {
        method,
        baseURL: "http://localhost:5000/api-orders",
        data,
        url,
        headers: {
                authorization:
                    `Bearer ${localStorage.getItem("staffToken")}` || `Bearer ${token}`
            }
    };
};

export default config;