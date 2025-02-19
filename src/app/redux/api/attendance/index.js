import axios from "axios";
import { APP_SETTINGS } from "../../../../config";
import { getAuthHeaders } from "app/assets/genericActions";


export function checkInUser(checkInData, auth) {
    return axios.post(APP_SETTINGS.API_PATH.attendance.checkInUser, checkInData, getAuthHeaders(auth))
};

export function getUserAttendance(userId) {
    return axios.get(`${APP_SETTINGS.API_PATH.attendance.getUserAttendance}/${userId}`)
};

export function deleteAttendanceByAdmin(attendanceId, auth) {
    return axios.delete(`${APP_SETTINGS.API_PATH.attendance.deleteAttendanceByAdmin}/${attendanceId}`, getAuthHeaders(auth))
};

export function editAttendanceByUser(attendanceData, auth) {
    return axios.put(`${APP_SETTINGS.API_PATH.attendance.editAttendanceByUser}`, attendanceData, getAuthHeaders(auth))
};

export function getAttendanceDetailById(id) {
    return axios.get(`${APP_SETTINGS.API_PATH.attendance.getAttendanceDetailById}/${id}`)
};






