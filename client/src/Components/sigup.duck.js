import axios from "axios";
const api_base_url = "http://localhost:5000";

// Action types
const UPDATE_FORM_DATA = "UPDATE_FORM_DATA";
const ERROR_FORM_DATA = "ERROR_FORM_DATA";
const LOGIN_FORM_SUCCESS = "LOGIN_FORM_SUCCESS";
const LOGIN_FORM_ERROR = "LOGIN_FORM_ERROR";
const CHANGE_SIGNUP_STATUS = "CHANGE_SIGNUP_STATUS";
//reducer
const initialState = {
  formStatusCode: null,
  loginFormStatusCode: null,
  jwtAuthCode: null,
  loginFormMsg: "",
};
// Action creators
export const updateFormData = (data) => ({
  type: UPDATE_FORM_DATA,
  payload: data,
});
export const errorFormData = (data) => ({
  type: ERROR_FORM_DATA,
  payload: data,
});
export const loginFormSuccess = (data) => ({
  type: LOGIN_FORM_SUCCESS,
  payload: data,
});
export const loginFormError = (data) => ({
  type: LOGIN_FORM_ERROR,
  payload: data,
});
export const changeSignUpStatus = (data) => ({
  type: CHANGE_SIGNUP_STATUS,
  payload: data,
});
// Reducers
const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_DATA:
      return {
        ...state,
        formStatusCode: action.payload.status,

        // isuserAdded: true,
      };
    case ERROR_FORM_DATA:
      return {
        ...state,
        formStatusCode: action.payload.status,
      };
    case LOGIN_FORM_SUCCESS: {
      return {
        ...state,
        loginFormStatusCode: action.payload.status,
        jwtAuthCode: action.payload.token,
        loginFormMsg: action.payload.msg,
      };
    }
    case LOGIN_FORM_ERROR: {
      return {
        ...state,
        loginFormStatusCode: action.payload.status,
        loginFormMsg: action.payload.data,
        jwtAuthCode: null,
      };
    }
    case CHANGE_SIGNUP_STATUS: {
      return {
        ...state,
        formStatusCode: null,
      };
    }
    default:
      return state;
  }
};
export default formReducer;
//thunk
export const getSignUpData = (signUpUser) => async (dispatch, getState) => {
  try {
    const { name, userName, password } = signUpUser;
    const Data = await axios.post(`${api_base_url}/signUp`, {
      name,
      userName,
      password,
    });
    dispatch(updateFormData(Data));
  } catch (err) {
    dispatch(errorFormData(err.response));
  }
};
export const getLoginData = (loginUser) => async (dispatch, getState) => {
  try {
    const { userName, password } = loginUser;
    const Data = await axios.post(`${api_base_url}/`, {
      userName,
      password,
    });
    dispatch(loginFormSuccess(Data.data));
    console.log(134, Data);
  } catch (err) {
    dispatch(loginFormError(err.response));
    console.log(err);
  }
};
