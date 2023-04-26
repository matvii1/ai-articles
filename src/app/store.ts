import { articleApi } from '@/api/article-api'
import counterReducer from '@/features/counter-slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
