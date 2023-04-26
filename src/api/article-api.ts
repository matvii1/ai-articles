import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://article-extractor-and-summarizer.p.rapidapi.com/'

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        import.meta.env.VITE_RAPID_API_KEY as string
      )

      headers.set(
        'X-RapidAPI-Host',
        'article-extractor-and-summarizer.p.rapidapi.com'
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: ({ url }) => {
        return `/summarize?url=${encodeURIComponent(url)}&length=3`
      },
    }),
  }),
})

export const { useLazyGetSummaryQuery } = articleApi
