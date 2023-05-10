import React, { useState } from 'react'
import MaterialReactTable from 'material-react-table'
import HeaderComponent from '../components/Header'
import AccountMenu from '../components/Menu'
import { ButtonGroup, Button, ListItemIcon, MenuItem, colors } from '@mui/material'
import { Add, AddCircle, ChangeCircle, DeleteSweep, EditNote } from '@mui/icons-material'
import ModalForm from './ModalForm'


const DataTable = (props) => {
    const { columns, products, pageSize = 10, isAdmin = false } = props
    const [itemView, setItemView] = useState(true)

    const changeAdminView = () => setItemView(!itemView)

    const globalSearch = (row, id, filterValue) => {
        return row.getValue(id).toLowerCase().startsWith(filterValue.toLowerCase())
    }


    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <ModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} itemView={itemView} />
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
                        <div>
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
                        </div>
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
                                    <ButtonGroup variant="outlined">
                                        <Button
                                            sx={{ color: colors.grey[800] }}
                                            onClick={changeAdminView}
                                        >
                                            {itemView ? 'Item View' : 'User View'}
                                        </Button>
                                        <Button
                                            sx={{ color: colors.grey[800] }}
                                            onClick={changeAdminView} size="small"
                                        >
                                            <ChangeCircle />
                                        </Button>
                                    </ButtonGroup>
                                    <Button
                                        startIcon={<AddCircle />}
                                        sx={{ color: colors.grey[800] }}
                                        variant='outlined'
                                        size="medium"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        {itemView ? 'Add Item' : 'Add Users'}
                                    </Button>
                                </div>
                                :
                                <HeaderComponent titleSize={16} logoSize={42} align='flex-start' />
                            }
                        </div>
                    )
                }}
            />
        </>
    )
}

export default DataTable