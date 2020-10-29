import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import quartoReducer from '../features/quarto/quartoSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    quarto: quartoReducer
  },
});
