import { combineReducers } from "redux";
import { userReducer } from "./user";
import { attendanceReducer } from "./checkin/attendanceReducer";
import { leaveReducer } from "./leave";

export const rootReducer = combineReducers({
    user: userReducer,
    attendance: attendanceReducer,
    leave: leaveReducer,
});


