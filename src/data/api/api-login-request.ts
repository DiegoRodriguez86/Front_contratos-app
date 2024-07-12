import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


interface IAxiosRequestConfig extends InternalAxiosRequestConfig {}

interface IApiFunction<T,R> {
    (url:string, data: T, config?: IAxiosRequestConfig): Promise<R>;
}

interface IAxiosInstance extends AxiosInstance{
    post: IApiFunction<any, any>;
}

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
    },
}) as IAxiosInstance;

instance.interceptors.request.use(
    async (config: IAxiosRequestConfig) => {
        config.headers = ({
            ...config.headers,

        } as AxiosHeaders) || {};
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default instance;