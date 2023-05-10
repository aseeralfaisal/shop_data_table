import React, { useEffect, useMemo, useState } from 'react'
import '../App.css'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api.interceptor'
import DataTable from '../components/DataTable'

const ShoppingApp = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await Api.get(`/item`)
        setProducts(response.data)
      } catch (error) {
        if (response.status === 401) {
          console.log(error)
          navigate('/')
        }
      }
    }
    getItems()
  }, [])

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
      <DataTable
        columns={columns}
        products={products}
      />
    </>
  );
};

export default ShoppingApp;
