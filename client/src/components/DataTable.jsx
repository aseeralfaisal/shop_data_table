import React, { useState } from 'react'
import MaterialReactTable from 'material-react-table'
import HeaderComponent from '../components/Header'
import AccountMenu from '../components/Menu'
import { ButtonGroup, Button, ListItemIcon, MenuItem, colors } from '@mui/material'
import { Add, AddCircle, ChangeCircle, DeleteSweep, EditNote } from '@mui/icons-material'
import ModalForm from './ModalForm'
import Api from '../services/Api.interceptor'


const DataTable = (props) => {
    const { columns, items, pageSize = 10, isAdmin = false, dataUpdated, setDataUpdated, itemView, setItemView } = props
    const [isModalOpen, setIsModalOpen] = useState(false)

    const changeAdminView = () => setItemView(!itemView)

    const globalSearch = (row, id, filterValue) => {
        return row.getValue(id).toLowerCase().startsWith(filterValue.toLowerCase())
    }

    const deleteUser = async (name) => {
        try {
            const res = await Api.post('/deleteuser', { name })
            console.log(res.data)
            setDataUpdated(!dataUpdated)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ModalForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                itemView={itemView}
                dataUpdated={dataUpdated}
                setDataUpdated={setDataUpdated}
            />
            <MaterialReactTable
                enableRowNumbers
                rowNumberMode='original'
                columns={columns}
                data={items}
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
                            'mrt-row-numbers',
                            'name',
                            'created_by',
                            'mrt-row-actions',
                        ]
                        :
                        [
                            'mrt-row-select',
                            'mrt-row-numbers',
                            'name',
                            'created_by',
                        ],
                }}
                renderRowActionMenuItems={(val) => {
                    return (
                        <div>
                            {isAdmin ?
                                <>
                                <MenuItem onClick={() => deleteUser(val.row.original.name)}>
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