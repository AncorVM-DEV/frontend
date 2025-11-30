import React from 'react'
import { Box, Typography, Button } from '@mui/material'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { authActions } from '../store/authSlice'
// Router
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Menu from '../components/Menu'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Obtenemos los datos del usuario desde el store (authenticator)
  const userData = useSelector((state: RootState) => state.authenticator)
  // Para comprobar qué llega del store (para la captura con la consola)
  console.log('Datos del usuario en el store:', userData)
  const manejarSalir = () => {
    dispatch(authActions.logout())
    navigate('/')
  }

  return (
    <Box>
      <Menu />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Página Home de Ancor Valentín Martín
        </Typography>

        <Typography sx={{ mb: 2 }}>
          {userData.isAutenticated
            ? `Hola, ${userData.userName} (${userData.userRol})`
            : 'No has iniciado sesión.'}
        </Typography>

        <Dashboard />

        <Button variant="outlined" onClick={manejarSalir} sx={{ mt: 2 }}>
          Salir
        </Button>
      </Box>
    </Box>
  )
}
