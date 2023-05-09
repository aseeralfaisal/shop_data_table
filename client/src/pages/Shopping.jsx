import React, { useEffect, useMemo, useState } from 'react';
import '../App.css'
import MaterialReactTable from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { ShoppingCart, Tune } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';

const baseURI = import.meta.env.VITE_BASE_URI

const ShoppingApp = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const token = Cookies.get('refreshToken')
        console.log({ refreshToken: token })
        const response = await axios.post(`${baseURI}/refresh-token`, {
          token
        })
        const newAccessToken = response.data.accessToken
        Cookies.set('accessToken', newAccessToken)
      } catch (error) {
        console.log('Failed to refresh access token', error)
      }
    }

    const getItems = async () => {
      try {
        const accessToken = Cookies.get('accessToken')
        const response = await axios.get(`${baseURI}/item`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        setProducts(response.data)
      } catch ({ response }) {
        if (response.status === 403) {
          await refreshAccessToken()
          const newAccessToken = Cookies.get('accessToken')
          newAccessToken && await getItems()
        } else {
          console.log('API call failed', response)
        }
      }
    }

    getItems()
  }, [])



  const globalSearch = (row, id, filterValue) => {
    return row.getValue(id).toLowerCase().startsWith(filterValue.toLowerCase())
  }

  const columns = useMemo(
    () => [
      {
        id: 'all', //id used to define `group` column
        columns: [
          {
            accessorFn: (row) => `${row.id}`, //accessorFn used to join multiple data into a single cell
            id: 'id', //id is still required when using accessorFn instead of accessorKey
            header: 'ID',
            accessorKey: 'id',
            size: 50,
          },
          {
            accessorKey: 'name', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Name',
            size: 150,
          },
          {
            accessorKey: 'created_by', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Created By',
            size: 150,
          },
        ],
      },
    ],
    [],
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={products}
        enableColumnFilterModes
        enableRowSelection
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableSelectAll={false}
        filterFns={{ globalSearch }}
        globalFilterFn="globalSearch"
        muiTablePaginationProps={{
          rowsPerPageOptions: [8, 15]
        }}
        muiTableHeadCellProps={{
          sx: ({ palette }) => ({
            fontWeight: 600,
            fontSize: 16,
            color: palette.text.primary
          }),
        }}
        muiTableBodyCellProps={{
          sx: ({ palette }) => ({
            fontWeight: 600,
            fontSize: 14,
            color: palette.text.primary,

          }),
        }}
        muiTableBodyProps={{
          sx: ({ palette }) => ({
            '& tr:nth-of-type(even)': {
              backgroundColor: palette.grey[50],
            },
          }),
        }}
        initialState={{
          showColumnFilters: true,
          pagination: { pageSize: 8 },
          columnOrder: [
            'mrt-row-select',
            'id',
            'name',
            'created_by',
            // 'mrt-row-actions',
          ],
        }}
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ShoppingCart sx={{ fontSize: 40, color: "#333" }} />
              <Typography variant='h3' fontFamily="Poppins"
                color="#333" fontSize={18} fontWeight={600}>Shopping App</Typography>
            </Box>
          )
        }}
      />
    </ >
  );
};

export default ShoppingApp;
