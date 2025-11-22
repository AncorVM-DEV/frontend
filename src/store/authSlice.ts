import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Tipo del estado de autenticación
export interface AuthState {
  isAutenticated: boolean
  userName: string
  userRol: string
}
// Estado inicial: usuario NO autenticado
const initialAuthState: AuthState = {
  isAutenticated: false,
  userName: '',
  userRol: '',
}
// Slice de autenticación: login / logout
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    // El reducer login: el usuario está autenticado
    // action.payload tendrá { name, rol }
    login: (
      state,
      action: PayloadAction<{ name: string; rol: string }>
    ) => {
      const userData = action.payload // nombre y rol del usuario
      state.isAutenticated = true
      state.userName = userData.name
      state.userRol = userData.rol
    },

    // El reducer logout: usuario NO autenticado (estado inicial)
    logout: (state) => {
      state.isAutenticated = false
      state.userName = ''
      state.userRol = ''
    },
  },
})
// Exportamos acciones y reducer
export const authActions = authSlice.actions
export default authSlice.reducer
