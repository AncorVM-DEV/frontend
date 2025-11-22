import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Paper,
  Avatar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import { authActions } from '../store/authSlice'

const bdUser = 'ancor'  
const bdPasswd = '1234'  

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // no recarga la página

    console.log('Usuario introducido:', usuario)
    console.log('Contraseña introducida:', password)

    if (usuario === bdUser && password === bdPasswd) {
      setError(null)

      const data = { user: usuario }

      // Cambiamos el estado del store a login
      dispatch(
        authActions.login({
          name: data.user,
          rol: 'administrador', // o 'invitado', 'standard', etc.
        }),
      )

      // Navegamos a /home
      navigate('/home')
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Paper sx={{ p: 4, width: '100%' }} elevation={3}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}
        >
          <Avatar sx={{ mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Acceso a la aplicación
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <TextField
            label="Contraseña"
            fullWidth
            margin="normal"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
              {error}
            </Alert>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Acceder
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
