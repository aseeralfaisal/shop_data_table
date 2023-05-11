import { FileDownload } from '@mui/icons-material'
import { Button, colors } from '@mui/material'
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

export default ExportButton