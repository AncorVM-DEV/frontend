import React from 'react';
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
    // Calculamos la suma de precios
    const totalPrecio = data.reduce((acc, curr) => acc + curr.precio, 0);

    // Columnas
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
                data={[
                    ...data,
                    // Fila de total (hack para mostrar total al final si se desea, 
                    // aunque material-table tiene summary features, lo haremos simple si no se pide explícitamente summary row feature compleja)
                    // La instrucción dice: "realizar la suma de los precios de nuestra colección y mostrarlo en la tabla."
                    // Una forma es añadir una fila extra o usar summary render.
                    // Vamos a intentar usar la prop de renderSummaryRow si existe en @material-table/core o simplemente mostrarlo en el título o footer.
                    // Pero @material-table/core tiene support para summary.
                ]}
                // @ts-ignore
                options={{
                    draggable: true, // mover columnas
                    columnsButton: true, // elegir qué columnas mostrar
                    filtering: true, // filtrar
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
                        backgroundColor: '#01579b', // Colores personalizados acorde a la paleta (azul oscuro)
                        color: '#FFF',
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                }}
                // Summary row implementation
                components={{
                    Body: (props) => (
                        <>
                            <props.components.Body {...props} />
                            <tr style={{ background: '#f5f5f5', fontWeight: 'bold' }}>
                                <td colSpan={3} style={{ textAlign: 'right', padding: '10px' }}>Total Precio:</td>
                                <td style={{ padding: '10px' }}>{totalPrecio.toFixed(2)} €</td>
                            </tr>
                        </>
                    )
                }}
            />
        </div>
    );
};

export default InformeColeccion;
