import axios from "axios";
import { APP_SETTINGS } from "../../../../config";
import { getFilteredQuery } from "app/assets/genericActions";


export function requestLeave(leaveData) {
    return axios.post(APP_SETTINGS.API_PATH.leave.requestLeave, leaveData)
};

export function getAllLeaves(data) {
    return axios.get(`${APP_SETTINGS.API_PATH.leave.getAllLeaves}?${getFilteredQuery(data)}`)
};

export function editLeaveRequest(leaveData) {
    return axios.put(`${APP_SETTINGS.API_PATH.leave.editLeaveRequest}`, leaveData)
};

export function deleteLeaveRequest(id) {
    return axios.delete(`${APP_SETTINGS.API_PATH.leave.deleteLeaveRequest}/${id}`)
};

export function getUserLeaves(id) {
    return axios.get(`${APP_SETTINGS.API_PATH.leave.getUserLeaves}/${id}`)
};

export function updateLeaveStatus(id, status) {
    return axios.put(`${APP_SETTINGS.API_PATH.leave.updateLeaveStatus.replace(':id', id)}`, { status: status })
};
