
import { deleteLeaveRequest, editLeaveRequest, getAllLeaves, getUserLeaves, requestLeave, updateLeaveStatus } from "../../api";
import { FAILURE, REQUEST, SUCCESS, LEAVE_REQUEST } from "../utilities";



export function REQUESTLEAVE(leaveData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(LEAVE_REQUEST.CREATE_LEAVE_REQUEST));
        requestLeave(leaveData)
            .then(response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(LEAVE_REQUEST.CREATE_LEAVE_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(LEAVE_REQUEST.CREATE_LEAVE_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            })
            .catch(error => {

                dispatch(FAILURE(LEAVE_REQUEST.CREATE_LEAVE_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            });
    };
};
export function GETALLLEAVES(data, failure) {
    return dispatch => {
        dispatch(REQUEST(LEAVE_REQUEST.GET_ALL_LEAVES_REQUEST));
        getAllLeaves(data).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(LEAVE_REQUEST.GET_ALL_LEAVES_SUCCESS, response.data.data));
                } else {
                    dispatch(FAILURE(LEAVE_REQUEST.GET_ALL_LEAVES_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(LEAVE_REQUEST.GET_ALL_LEAVES_FAILURE, error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};
export function EDITLEAVEREQUEST(data, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(LEAVE_REQUEST.EDIT_LEAVE_REQUEST));
        editLeaveRequest(data).then(
            response => {
                if (response.data.succeeded) {

                    dispatch(SUCCESS(LEAVE_REQUEST.EDIT_LEAVE_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext(response.data.data);
                    }
                } else {
                    dispatch(FAILURE(LEAVE_REQUEST.EDIT_LEAVE_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(LEAVE_REQUEST.EDIT_LEAVE_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};
export function DELETELEAVEREQUEST(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(LEAVE_REQUEST.DELETE_LEAVE_REQUEST));
        deleteLeaveRequest(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(LEAVE_REQUEST.DELETE_LEAVE_SUCCESS,id));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(LEAVE_REQUEST.DELETE_LEAVE_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(LEAVE_REQUEST.DELETE_LEAVE_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

export function GETUSERLEAVES(id, moveToNext, failure,) {
    return dispatch => {
        dispatch(REQUEST(LEAVE_REQUEST.GET_USER_LEAVES_REQUEST));
        getUserLeaves(id).then(
            response => {

                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(LEAVE_REQUEST.GET_USER_LEAVES_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext(response.data.data);
                    }
                } else {
                    dispatch(FAILURE(LEAVE_REQUEST.GET_USER_LEAVES_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(LEAVE_REQUEST.GET_USER_LEAVES_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

export function UPDATELEAVESTATUS(id, status, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(LEAVE_REQUEST.UPDATE_LEAVE_STATUS_REQUEST));
        updateLeaveStatus(id, status).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(LEAVE_REQUEST.UPDATE_LEAVE_STATUS_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(LEAVE_REQUEST.UPDATE_LEAVE_STATUS_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(LEAVE_REQUEST.UPDATE_LEAVE_STATUS_FAILURE.error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

