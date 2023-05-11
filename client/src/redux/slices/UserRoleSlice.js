import { createSlice } from '@reduxjs/toolkit'

export const userRoleSlice = createSlice({
    name: 'userRole',
    initialState: {
        isAdmin: false,
        isUser: true
    },
    reducers: {
        changeAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        changeUser: (state, action) => {
            state.isUser = action.payload
        },
    },
})

export const { changeUser, changeAdmin } = userRoleSlice.actions