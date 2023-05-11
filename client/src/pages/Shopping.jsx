import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Api from '../services/Api.interceptor'
import DataTable from '../components/DataTable'
import '../App.css'

const ShoppingApp = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await Api.get(`/item`)
        setItems(response.data)
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/')
        }
      }
    }
    getItems()
  }, [])

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      enableClickToCopy: true,
      header: 'Name',
      size: 150,
      Cell: ({ renderedCellValue }) => <Box component='span'>{renderedCellValue}</Box>
    },
    {
      accessorKey: 'created_by',
      enableClickToCopy: true,
      header: 'Created By',
      size: 150,
      Cell: ({ renderedCellValue }) => <Box component='span'>{renderedCellValue}</Box>
    },
  ], []);

  return (
    <>
      <DataTable columns={columns} items={items} />
    </>
  );
};

export default ShoppingApp;
