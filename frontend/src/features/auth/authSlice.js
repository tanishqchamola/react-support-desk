import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// createAsyncThunk is used to deal with async functions

// @desc Register new user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
	console.log(user);
});

// @desc Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	console.log(user);
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export default authSlice.reducer;
