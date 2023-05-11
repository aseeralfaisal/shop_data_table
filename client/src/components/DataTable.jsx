import React, { useState } from 'react'
import MaterialReactTable from 'material-react-table'
import HeaderComponent from '../components/Header'
import AccountMenu from '../components/Menu'
import { ButtonGroup, Button, ListItemIcon, MenuItem, colors } from '@mui/material'
import { Add, AddCircle, ChangeCircle, DeleteSweep, EditNote, FileDownload } from '@mui/icons-material'
import ModalForm from './ModalForm'
import Api from '../services/Api.interceptor'
import { ExportToCsv } from 'export-to-csv'

const ExportButton = ({ table, columns }) => {

    const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original))
    }
    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    }

    const csvExporter = new ExportToCsv(csvOptions)
    
    return (
        <Button
            disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            sx={{ color: colors.grey[800] }}
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownload />}
            variant="outlined"
            size='medium'
        >
            Export
        </Button>
    )
}

const DataTable = (props) => {

    const { columns, items, pageSize = 10, isAdmin = false, dataUpdated, setDataUpdated, itemView, setItemView } = props

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateInfoModal, setIsUpdateInfoModal] = useState(false)

    const changeAdminView = () => setItemView(!itemView)

    const globalSearch = (row, id, filterValue) => {
        return row.getValue(id).toLowerCase().startsWith(filterValue.toLowerCase())
    }

    const removeUserOrItem = async (name) => {
        try {
            let res = null
            if (itemView) {
                res = Api.post('/deleteitem', { name }, {
                    headers: {
                        "x-user-role": 'admin'
                    }
                })
            } else {
                res = await Api.post('/deleteuser', { name }, {
                    headers: {
                        "x-user-role": 'admin'
                    }
                })
            }
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
                isUpdateInfoModal={isUpdateInfoModal}
                setIsUpdateInfoModal={setIsUpdateInfoModal}
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
                enableSelectAll
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
                                    <MenuItem onClick={() => setIsModalOpen(!isModalOpen)}>
                                        <ListItemIcon>
                                            <EditNote fontSize="small" />
                                        </ListItemIcon>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={() => removeUserOrItem(val.row.original.name)}>
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
                renderTopToolbarCustomActions={({ table }) => {
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
                                    <ExportButton table={table} columns={columns} />
                                </div>
                                :
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                                    <HeaderComponent titleSize={16} logoSize={42} align='flex-start' />
                                    <ExportButton table={table} columns={columns} />
                                </div>
                            }
                        </div>
                    )
                }}
            />
        </>
    )
}

export default DataTable