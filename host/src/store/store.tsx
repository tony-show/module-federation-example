import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1
    },
    decremented: (state) => {
      state.value -= 1
    },
  },
})

export const { actions } = counterSlice

const store = configureStore({
  reducer: counterSlice.reducer
})

export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)
