import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/instance`
});

if (!process.env.NEXT_PUBLIC_BASE_URL.includes("localhost")) {
    // Add a request interceptor
    axiosInstance.interceptors.request.use(function (config) {
        // Add the ngrok-skip-browser-warning header to the request
        config.headers['ngrok-skip-browser-warning'] = 'true';        
        return config;
    }, function (error) {
        // Do something with request error        
        return Promise.reject(error);
    });
}
