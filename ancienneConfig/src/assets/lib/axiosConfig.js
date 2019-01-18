

const config = (data,url,method) => {

   return  {
        method,
        baseURL: 'http://localhost:3000/api/',
        data,
        url,

    };
}


export default config;