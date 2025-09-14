
import { createSlice } from '@reduxjs/toolkit';
const rootSlice = createSlice({
    name: 'root',
    initialState: {
        loading: false,
        portfolioData: null,
        reloadData: false,
        theme: 'dark', // 'light' or 'dark' - dark is default
    },
    reducers: {
        ShowLoading: (state, action) => {
            state.loading = true;
        },
        HideLoading: (state, action) => {
            state.loading = false;
        },
        SetPortfolioData: (state, action) => {
            state.portfolioData = action.payload;
        },
        ReloadData:(state,action) =>{
            state.reloadData=action.payload;
        },
        ToggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
        SetTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetPortfolioData, ReloadData, ToggleTheme, SetTheme } = rootSlice.actions;