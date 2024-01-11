import {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { StoreAlert } from '../store/alertStore';
import { EToastStatus } from "../components/shared/ToastAlert";

export interface IToken {
    token: string;
    refreshToken: string;
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token: IToken = JSON.parse(sessionStorage.getItem('token') as string);
    if (config.headers != null)
    {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {    
    StoreAlert.alert.setAlert(EToastStatus.FAIL, error.response?.data?.message, null);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = async (error: AxiosError) => {
    // Network Error means backend is crashed or there is another network issue
    if (error.message === "Network Error")
    {
        // Prepare object error response structure to be used to display error message in app
        if (!error.response) {
            error.response = { data: {}, status: 0, statusText: '', headers: {}, config: error.config, request: {} };
        }
        if (!error.response.data) {
            error.response.data = {};
        }

        // Prepare message to be displayed in error 
        error.response.data.message = "Impossible d'accéder au serveur actuellement. Veuillez vérifier votre connexion Internet et réessayer dans quelques instants.";
        return Promise.reject(error);
    };
    return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};