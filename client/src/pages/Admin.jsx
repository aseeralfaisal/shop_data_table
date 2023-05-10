import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'
import Api from '../services/Api.interceptor'

const Admin = () => {
    const navigate = useNavigate()
    const [isItemView, setIsItemView] = useState(true)
    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])
    const [dataUpdated, setDataUpdated] = useState(false)

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemResponse = await Api.get('/item')
                setItems(itemResponse.data)
                const userResponse = await Api.get('/getusers')
                setUsers(userResponse.data)
            } catch (error) {
                console.log(error)
                if (error.response.status === 401) {
                    navigate('/admin')
                }
            }
        }
        getItems()
        return () => getItems()
    }, [dataUpdated])

    const columns = useMemo(() => [
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

    return (
        <>
            <DataTable
                isAdmin
                columns={columns}
                items={isItemView ? items : users}
                itemView={isItemView}
                setItemView={setIsItemView}
                dataUpdated={dataUpdated}
                setDataUpdated={setDataUpdated}
            />
        </>
    );
};

export default Admin;
