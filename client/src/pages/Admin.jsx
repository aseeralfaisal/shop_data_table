import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import DataTable from '../components/DataTable'
import Api from '../services/Api.interceptor'
import '../App.css'

const Admin = () => {
    const navigate = useNavigate()
    const [isItemView, setIsItemView] = useState(true)
    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])

    const dataUpdated = useSelector((state) => state.slice.dataUpdated)

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemResponse = await Api.get('/item')
                setItems(itemResponse.data)
                const userResponse = await Api.get('/getusers')
                setUsers(userResponse.data)
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/')
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
                isAdminRole
                columns={columns}
                items={isItemView ? items : users}
                itemView={isItemView}
                setItemView={setIsItemView}
            />
        </>
    );
};

export default Admin;
