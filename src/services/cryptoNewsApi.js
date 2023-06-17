import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const CryptoApiHeaders={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'b98e7be559mshc5d2168c9535cc5p186d39jsn77038b127497',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl="https://bing-news-search1.p.rapidapi.com";

//single url to add headers and endpoint
const createRequest = (url) => ({ url, headers:CryptoApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery:fetchBaseQuery({ baseUrl }),
    endpoints:(builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`) 
        })
    })
});

export const { useGetCryptoNewsQuery, } = cryptoNewsApi;