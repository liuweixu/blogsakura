import { request } from "@/backend/utils/request";
import { createSlice } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import type { AppDispatch } from "@/backend/store";
import { getToken, setToken as _setToken } from "@/backend/utils";

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || "",
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 本地存一份
      _setToken(action.payload); //防止与方法同名
    },
  },
});

//异步方法
const fetchLogin = (loginForm: FieldValues) => {
  return async (dispatch: AppDispatch) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};
const { setToken } = userStore.actions;

const userReducer = userStore.reducer;

export { fetchLogin, setToken };

export default userReducer;
