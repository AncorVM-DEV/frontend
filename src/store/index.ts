import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

// Store global de la aplicación
export const store = configureStore({
  reducer: {
    // Aquí registramos nuestro slice
    authenticator: authReducer,
  },
})

// Tipos para TypeScript (useSelector / useDispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
