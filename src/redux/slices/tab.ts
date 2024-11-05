import { createSlice } from "@reduxjs/toolkit"
export interface State {
    currentTab: boolean;
    sessionLoader:boolean
}
  
const tabSlice = createSlice({
    name: "tab",
    initialState: {
        currentTab: false,
        sessionLoader:false
    },
    reducers: {
        setTabCurrentView: (state, action) => {
            state.currentTab = action.payload
        },
        setSessionLoader:(state,action) => {
            state.sessionLoader = action.payload
        }
    }
})

export default tabSlice.reducer;

export const { setTabCurrentView,setSessionLoader } = tabSlice.actions;
