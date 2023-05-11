import { createSlice } from '@reduxjs/toolkit'

export const formRoleSlice = createSlice({
    name: 'formRole',
    initialState: {
        formWillUpdate: false,
    },
    reducers: {
        changeFormRole: (state, action) => {
            state.formWillUpdate = action.payload
        },
    },
})

export const { changeFormRole, changeNameValue } = formRoleSlice.actions