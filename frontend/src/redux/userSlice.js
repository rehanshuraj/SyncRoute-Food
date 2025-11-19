import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    }
  },
});

export const { setUserData, finishLoading } = userSlice.actions;
export default userSlice.reducer;
