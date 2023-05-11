import { createSlice } from '@reduxjs/toolkit'

export const Slice = createSlice({
    name: 'slice',
    initialState: {
        isAdminRole: false,
        isUserRole: true,
        isFormUpdateMode : false,
        dataUpdated: false
    },
    reducers: {
        setIsAdminRole: (state, action) => {
            state.isAdminRole = action.payload
        },
        setIsUserRole: (state, action) => {
            state.isUserRole = action.payload
        },
        setIsFormUpdateMode: (state, action) => {
            state.isFormUpdateMode  = action.payload
        },
        setDataUpdated: (state, action) => {
            state.dataUpdated = action.payload
        }
    },
})

export const { setIsUserRole, setIsAdminRole, setIsFormUpdateMode, setDataUpdated } = Slice.actions