import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const IconTextField = ({ label, icon, width = 500, type = 'text', value, setValue }) => (
    <TextField
        label={label}
        sx={{ width }}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    {icon}
                </InputAdornment>
            ),
        }}
    />
);


export default IconTextField