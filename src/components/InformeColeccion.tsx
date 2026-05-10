import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';

interface ItemType {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

interface InformeColeccionProps {
    data: ItemType[];
}

const InformeColeccion: React.FC<InformeColeccionProps> = ({ data }) => {
    // Saco la suma de los precios (consigna UT3A1: mostrar el total de la colección)
    const totalPrecio = data.reduce((acc, curr) => acc + Number(curr.precio || 0), 0);

    // Columnas que voy a mostrar en la tabla
    const columns = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Marca', field: 'marca', filtering: true },
        { title: 'Tipo', field: 'tipo', filtering: true },
        { title: 'Precio', field: 'precio', type: 'numeric' as const },
    ];

    return (
        <div style={{ maxWidth: '100%', padding: '20px' }}>
            <MaterialTable
                title="Informe de Colección"
                columns={columns}
                data={data}
                // @ts-ignore
                options={{
                    draggable: true, // dejo mover las columnas
                    columnsButton: true, // botón para elegir qué columnas se ven
                    filtering: true, // habilito filtros por columna
                    exportMenu: [
                        {
                            label: 'Exportar a PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'InformeColeccion'),
                        },
                        {
                            label: 'Exportar a CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'InformeColeccion'),
                        },
                    ],
                    headerStyle: {
                        backgroundColor: '#01579b', // azul oscuro de mi paleta
                        color: '#FFF',
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                }}
            />

            {/* Antes intentaba meter el total como una fila extra dentro del Body de la tabla
                pero eso me reventaba el componente porque props.components.Body no existe en
                @material-table/core v6. Lo saco fuera en un Paper, queda más limpio y no peta. */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Paper sx={{ px: 3, py: 1.5, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Total Precio: {totalPrecio.toFixed(2)} €
                    </Typography>
                </Paper>
            </Box>
        </div>
    );
};

export default InformeColeccion;

