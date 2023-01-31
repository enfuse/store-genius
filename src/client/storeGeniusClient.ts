import axios, { AxiosRequestConfig } from "axios";

export const storeClient = axios.create({
    baseURL: '/store-genius',
    timeout: 10000,
  });

export const sendFeedback = (email: string,
                                feedback: string): Promise<any> => {
    return storeClient.post('/feedback', {email, feedback});
//    TODO Christian remove name from backend
};