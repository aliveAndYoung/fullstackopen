import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotifications(state, action) {
            return action.payload;
        },
    },
});
const { setNotifications } = notificationSlice.actions;

const setNotification = (notification, time) => {
    return async (dispatch) => {
        dispatch(setNotifications(notification));
        setTimeout(() => {
            dispatch(setNotifications(""));
        }, time * 1000);
    };
};
export { setNotification };
export default notificationSlice.reducer;
