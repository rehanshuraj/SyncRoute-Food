import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        UserData: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.currentUser = action.payload;
        },
    },
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;