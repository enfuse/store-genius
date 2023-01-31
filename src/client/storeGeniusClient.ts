import axios, { AxiosRequestConfig } from "axios";

export const storeClient = axios.create({
    baseURL: '/store-genius',
    timeout: 10000,
  });

export const sendFeedback = (name: string, 
                                email: string,
                                feedback: string,
                            options?: AxiosRequestConfig): Promise<any> => {
    return storeClient.post('/feedback', {name, email, feedback})
                            .then(res => res.data)
                            .catch(e=>console.log(e));
};