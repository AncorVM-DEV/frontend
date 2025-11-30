// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface ItemType {
  id?: number;
  nombre: string; // nombre de la carta
  marca: string;  // expansión / set
  tipo: string;   // tipo de energía: fuego, agua, etc.
  precio: number; // valor aproximado en €
}

const itemInitialState: ItemType = {
  nombre: '',
  marca: '',
  tipo: '',
  precio: 0,
};

const Dashboard: React.FC = () => {
  const [item, setItem] = useState<ItemType>(itemInitialState);
  const [tablaDatos, setTablaDatos] = useState<ItemType[]>([]);

  // --------- Cargar cartas al entrar ----------
  async function cargarItems() {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const json = await response.json();
      setTablaDatos(json.data || []);
    } catch (error) {
      console.error('Error al obtener las cartas', error);
      alert('No se han podido cargar las cartas desde la base de datos');
    }
  }

  useEffect(() => {
    void cargarItems();
  }, []);

  // --------- Insertar nueva carta ----------
  async function manejarInsertar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validación muy básica
    if (!item.nombre.trim() || !item.marca.trim() || !item.tipo.trim()) {
      alert('Rellena nombre, expansión y tipo de la carta');
      return;
    }
    if (item.precio < 0) {
      alert('El precio no puede ser negativo');
      return;
    }

    try {
      const qs = new URLSearchParams({
        nombre: item.nombre,
        marca: item.marca,
        tipo: item.tipo,
        precio: String(item.precio),
      }).toString();

      const response = await fetch(`http://localhost:3030/addItem?${qs}`);
      const filas = await response.json();

      if (filas > 0) {
        alert('Carta guardada con éxito');
        setItem(itemInitialState);
        void cargarItems(); // refrescar tabla
      } else {
        alert('No se ha podido guardar la carta');
      }
    } catch (error) {
      console.error('Error al insertar carta', error);
      alert('Se ha producido un error insertando la carta');
    }
  }

  // --------- Borrar carta ----------
  async function manejarBorrar(id?: number) {
    if (!id) return;

    const confirmar = window.confirm(
      `¿Seguro que quieres borrar la carta con id ${id}?`
    );
    if (!confirmar) return;

    try {
      const response = await fetch(
        `http://localhost:3030/deleteItem?id=${id}`
      );
      const filas = await response.json();

      if (filas > 0) {
        alert('Carta eliminada correctamente');
        void cargarItems();
      } else {
        alert('No se ha podido eliminar la carta');
      }
    } catch (error) {
      console.error('Error al borrar carta', error);
      alert('Se ha producido un error borrando la carta');
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Gestión de colección de cartas Pokémon
      </Typography>

      {/* ---------- Formulario ---------- */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          component="form"
          onSubmit={manejarInsertar}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <TextField
            label="Nombre de la carta"
            value={item.nombre}
            onChange={(e) =>
              setItem((prev) => ({ ...prev, nombre: e.target.value }))
            }
            fullWidth
          />
          <TextField
            label="Expansión / set"
            value={item.marca}
            onChange={(e) =>
              setItem((prev) => ({ ...prev, marca: e.target.value }))
            }
            fullWidth
          />
          <TextField
            label="Tipo (Fuego, Agua, etc.)"
            value={item.tipo}
            onChange={(e) =>
              setItem((prev) => ({ ...prev, tipo: e.target.value }))
            }
            fullWidth
          />
          <TextField
            label="Precio estimado (€)"
            type="number"
            value={item.precio}
            onChange={(e) =>
              setItem((prev) => ({
                ...prev,
                precio: Number(e.target.value),
              }))
            }
            fullWidth
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
              mt: { xs: 1, md: 0 },
            }}
          >
            <Button type="submit" variant="contained">
              + Insertar carta
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* ---------- Tabla ---------- */}
      <TableContainer component={Paper}>
        <Table aria-label="Tabla de cartas Pokémon">
          <TableHead>
            <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Expansión</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio (€)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tablaDatos.map((fila) => (
              <TableRow key={fila.id}>
                <TableCell>
                  <Button
                    onClick={() => manejarBorrar(fila.id)}
                    title="Borrar carta"
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell>{fila.nombre}</TableCell>
                <TableCell>{fila.marca}</TableCell>
                <TableCell>{fila.tipo}</TableCell>
                <TableCell>{fila.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
