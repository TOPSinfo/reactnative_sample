import Config from '@config/Config';
import { createSlice } from "@reduxjs/toolkit"

export interface State {
    isTestMode: boolean;
    reactivate: boolean;
    deletedId: any | null;
}

const tabSlice = createSlice({
    name: "testMode",
    initialState: {
        isTestMode: Config.apiUrl == 'https://api-v2staging.App.com'?true:false,
        reactivate: false,
        deletedId:null
    },
    reducers: {
        setTestMode: (state, action) => {
            state.isTestMode = action.payload
        },
        setReactivate:(state,action) => {
            state.reactivate = action.payload
        },
        setDeletedUserId:(state,action) => {
            state.deletedId = action.payload
        }
    }
})

export default tabSlice.reducer;

export const { setTestMode,setReactivate,setDeletedUserId } = tabSlice.actions;
