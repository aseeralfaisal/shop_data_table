import React from 'react'
import MaterialReactTable from 'material-react-table'
import HeaderComponent from '../components/Header'
import AccountMenu from '../components/Menu'
import { ButtonGroup, Button, ListItemIcon, MenuItem } from '@mui/material'
import { ChangeCircle, DeleteSweep, EditNote } from '@mui/icons-material'


const DataTable = (props) => {
    const { columns, products, pageSize = 10, isAdmin = false } = props

    const globalSearch = (row, id, filterValue) => {
        return row.getValue(id).toLowerCase().startsWith(filterValue.toLowerCase())
    }

    return (
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
                columnOrder: isAdmin ?
                    [
                        'mrt-row-select',
                        'id',
                        'name',
                        'created_by',
                        'mrt-row-actions',
                    ]
                    :
                    [
                        'mrt-row-select',
                        'id',
                        'name',
                        'created_by',
                    ],
            }}
            renderRowActionMenuItems={() => {
                return (
                    <>
                        {isAdmin ?
                            <>
                                <MenuItem>
                                    <ListItemIcon>
                                        <EditNote fontSize="small" />
                                    </ListItemIcon>
                                    Edit
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <DeleteSweep fontSize="small" />
                                    </ListItemIcon>
                                    Delete
                                </MenuItem>
                            </> : null}
                    </>
                )
            }}
            positionToolbarAlertBanner="bottom"
            renderTopToolbarCustomActions={() => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <AccountMenu />
                        {isAdmin ?
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <HeaderComponent isAdmin titleSize={16} logoSize={42} align='flex-start' />
                                <ButtonGroup variant="outlined" aria-label="split button">
                                    <Button>User View</Button>
                                    <Button size="small" >
                                        <ChangeCircle />
                                    </Button>
                                </ButtonGroup>
                            </div>
                            :
                            <HeaderComponent titleSize={16} logoSize={42} align='flex-start' />
                        }
                    </div>
                )
            }}
        />
    )
}

export default DataTable