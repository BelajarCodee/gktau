// Redux slice atau state management yang sesuai
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Data sesi pengguna
    // ... state lainnya
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // ... reducers lainnya
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
