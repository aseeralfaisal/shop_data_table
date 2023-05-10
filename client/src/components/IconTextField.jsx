import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const IconTextField = ({ label, icon = null, width = 500, type = 'text', value, setValue }) => (
    <TextField
        label={label}
        sx={{ width }}
        type={type}
        value={value}
        autoFocus
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