import React, { useEffect, useMemo, useState } from 'react';
import '../App.css'
import MaterialReactTable from 'material-react-table';
import { Box} from '@mui/material';
import * as colors from "@mui/material/colors"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/Header';

const baseURI = import.meta.env.VITE_BASE_URI
const pageSize = 10

const ShoppingApp = () => {
  const navigate = useNavigate()
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
        console.log({ newAccessToken })
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
        if (response.status === 401) {
          await refreshAccessToken()
        }
        navigate('/')
      }
    }

    getItems()
  }, [])

  const globalSearch = (row, id, filterValue) => {
    return row.getValue(id).toLowerCase().startsWith(filterValue.toLowerCase())
  }

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

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={products}
        enableColumnFilterModes
        enableGrouping
        enableRowSelection
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableSelectAll={false}
        filterFns={{ globalSearch }}
        enableStickyHeader
        enableStickyFooter
        globalFilterFn="globalSearch"
        muiTablePaginationProps={{
          rowsPerPageOptions: [pageSize, 15]
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
            '& tr:nth-of-type(odd)': {
              backgroundColor: palette.grey[50],
            },
          }),
        }}
        initialState={{
          showColumnFilters: true,
          pagination: { pageSize: pageSize },
          columnOrder: [
            'mrt-row-select',
            'id',
            'name',
            'created_by',
            // 'mrt-row-actions',
          ],
        }}
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={() => (<HeaderComponent titleSize={16} logoSize={42} />)}
      />
    </>
  );
};

export default ShoppingApp;
