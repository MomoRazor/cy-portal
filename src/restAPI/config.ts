import { logoutResponseInterceptor, requestInterceptor } from '@sector-eleven-ltd/se-react-toolkit';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig?.baseUrl;

export const axios11 = axios.create({
    baseURL: baseURL
});

axios11.interceptors.request.use(async (config) => {
    const header = await requestInterceptor(config, true);
    return header;
});

axios11.interceptors.response.use(
    (response) => {
        return response;
    },
    (e) => logoutResponseInterceptor(e, undefined, '/logout')
);
