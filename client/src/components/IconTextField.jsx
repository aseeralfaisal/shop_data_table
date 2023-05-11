import React from 'react'
import { InputAdornment, TextField } from '@mui/material'

const IconTextField = ({ label, icon = null, width = 500, type = 'text', value, setValue }) => (
    <TextField
        label={label}
        sx={{ width }}
        type={type}
        value={value}
        variant='outlined'
        required
        fullWidth
        onChange={(event) => setValue(event.target.value)}
        InputProps={icon ? {
            startAdornment: (
                <InputAdornment position="start">
                    {icon}
                </InputAdornment>
            ),
        } : null}
    />
);


export default IconTextField