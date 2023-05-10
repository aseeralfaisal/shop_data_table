import React, { useEffect, useMemo, useState } from 'react'
import '../App.css'
import MaterialReactTable from 'material-react-table'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from '../components/Header'
import Api from '../services/interceptor'

const pageSize = 10

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
