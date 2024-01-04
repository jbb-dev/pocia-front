import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
  } from "axios";
import { Store } from '../store/rootStore';
import { StoreAlert } from '../store/alertStore';
import { clearTokens } from "./api";
import { EToastStatus } from "../components/shared/ToastAlert";

const { REACT_APP_API_URL } = process.env;
export interface IToken {
    token: string;
    refreshToken: string;
};

// USE FOR REFRESH TOKEN IN ORDER TO AVOIR LOOP REQUEST/RESPONSE
const axios_instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

const setIsAuth = (isAuth: boolean) => Store.user.setIsAuth(isAuth);

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.log('onRequest')
    const tokens: IToken = JSON.parse(sessionStorage.getItem('tokens') as string);
    const accessToken = tokens?.token;
    if (config.headers != null)
    {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.log('onRequestError')
    
    StoreAlert.alert.setAlert(EToastStatus.FAIL, error.response?.data?.message, null);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.log('onResponse')
    return response;
};

const onResponseError = async (error: AxiosError) => {
    console.log('onResponseError, error = ', error)
    const config = error.config as any;
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
        // Access Token was expired
        if ( error.response?.status === 401 && error.response?.data?.message === "Le token d'identification n'est plus valide" && !config._retry) 
        {
            config._retry = true; // TO AVOID LOOP
            try 
            {
                console.log('NEW TRY ON RESPONSE ERROR')
                const tokens: IToken = JSON.parse(sessionStorage.getItem('tokens') as string);
                const refreshToken = tokens?.refreshToken;  

                const response = await axios.post(`${REACT_APP_API_URL}/api/auth/refreshToken`, { refreshToken } );
                if (response.data.accessToken)
                {
                    tokens.token = response.data.accessToken;
                    const updatedTokens = JSON.stringify(tokens);
                    sessionStorage.setItem('tokens', updatedTokens);
                    setIsAuth(true);
                    config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                };
                return axios_instance(config);
            } 
            catch (_error) 
            {
                const err = _error as AxiosError;
                setIsAuth(false);
                if (err.response != null)
                {
                    StoreAlert.alert.setAlert(EToastStatus.FAIL, err.response.data.message, null);
                    clearTokens();
                }
                return Promise.reject(_error);
            };
    };
    return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};