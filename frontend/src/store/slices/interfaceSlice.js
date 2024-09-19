import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginModal: false,
    signUpModal: false,
    alert: {
        visible: false,
        message: '',
        severity: 'success',
    },
};

const interfaceSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setLoginModal: (state) => {
            state.loginModal = !state.loginModal;
        },
        setSignUpModal: (state) => {
            state.signUpModal = !state.signUpModal;
        },
        showAlert: (state, action) => {
            state.alert.visible = true;
            state.alert.message = action.payload.message;
            state.alert.severity = action.payload.severity || 'success';
        },
        hideAlert: (state) => {
            state.alert.visible = false;
            state.alert.message = '';
            state.alert.severity = 'success';
        },
    }
});

export const { setLoginModal, setSignUpModal, showAlert, hideAlert } = interfaceSlice.actions;
export default interfaceSlice.reducer;
