import axios, { AxiosRequestConfig } from "axios";

export const promptClient = axios.create({
    baseURL: '/prompt',
    timeout: 10000,
  });

export const getBeerRecommendation = (beers: string, 
                                shoppingList: string,
                            options?: AxiosRequestConfig): Promise<any> => {
    return promptClient.post('/beer-recommendation', {beers, shoppingList})
                            .then(res => res.data)
                            .catch(e=>console.log(e));
};