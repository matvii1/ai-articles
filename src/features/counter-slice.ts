import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

type TypeInitialState = {
  counter: number
}

const initialState: TypeInitialState = {
  counter: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter += 1
    },
  },
})

export default counterSlice.reducer
export const { increment } = counterSlice.actions
export const getCount = (state: RootState) => state.counter.counter
