import { useMemo } from 'react'
import '../App.css'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'

const Admin = () => {
    const columns = useMemo(() => [
        {
            id: 'id',
            header: 'ID',
            accessorKey: 'id',
            size: 50,
        },
        {
            accessorKey: 'name',
            enableClickToCopy: true,
            header: 'Name',
            size: 150,
            Cell: ({ renderedCellValue }) => (<Box component='span'>{renderedCellValue}</Box>),
        },
        {
            accessorKey: 'created_by',
            enableClickToCopy: true,
            header: 'Created By',
            size: 150,
            Cell: ({ renderedCellValue }) => (<Box component='span'>{renderedCellValue}</Box>)
        },
    ], []);

    const data = [{ id: 1, name: 'Lux Soap', created_by: 'Saad' }]
    return (
        <>
            <DataTable
                isAdmin
                columns={columns}
                products={data}
            />
        </>
    );
};

export default Admin;
