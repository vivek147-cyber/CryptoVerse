import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const CryptoApiHeaders={
    'X-RapidAPI-Key': 'b98e7be559mshc5d2168c9535cc5p186d39jsn77038b127497',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl="https://coinranking1.p.rapidapi.com/";

//single url to add headers and endpoint
const createRequest = (url) => ({ url, headers:CryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery:fetchBaseQuery({ baseUrl }),
    endpoints:(builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`) 
        }),
        getCryptoDetails: builder.query({
            query: (uuid) => createRequest(`/coin/${uuid}`) 
        }),
        getCryptoHistory: builder.query({
            query: ({ uuid, timeperiod }) => createRequest(`coin/${uuid}/history?timeperiod=${timeperiod}`),
          }),
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;