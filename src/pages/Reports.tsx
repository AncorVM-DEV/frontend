import React, { useState } from 'react'
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material'
import InformeColeccion from '../components/InformeColeccion'

export default function Reports() {
  const [showReport, setShowReport] = useState(false)
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateReport = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:3030/getItems')
      if (!response.ok) {
        throw new Error('Error al obtener los datos')
      }
      const json = await response.json()
      setReportData(json.data || [])
      setShowReport(true)
    } catch (err) {
      console.error(err)
      setError('No se pudo cargar el informe. Asegúrate de que el servidor está funcionando.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Página Reports de Ancor Valentín Martín
      </Typography>

      <Box sx={{ my: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateReport}
          disabled={loading}
        >
          {loading ? 'Generando...' : 'INFORME COLECCION'}
        </Button>
      </Box>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {showReport && (
        <Box sx={{ mt: 4 }}>
          <InformeColeccion data={reportData} />
        </Box>
      )}
    </Box>
  )
}
