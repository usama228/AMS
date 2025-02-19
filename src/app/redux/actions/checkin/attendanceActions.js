

import { checkInUser, deleteAttendanceByAdmin, editAttendanceByUser, getAttendanceDetailById, getUserAttendance } from "../../api";
import { FAILURE, REQUEST, SUCCESS, ATTENDANCE_REQUEST } from "../utilities";


export function CHECKINUSER(checkInData,auth, moveToNext, failure) {
  return dispatch => {
    dispatch(REQUEST(ATTENDANCE_REQUEST.CHECKIN_USER_REQUEST));
    checkInUser(checkInData,auth)
      .then(response => {
      
        if (response.data.succeeded === true) {
          dispatch(SUCCESS(ATTENDANCE_REQUEST.CHECKIN_USER_SUCCESS, response.data.data));
          if (moveToNext) {
             moveToNext();
          }
        } else {
          dispatch(FAILURE(ATTENDANCE_REQUEST.CHECKIN_USER_FAILURE, response.data.message));
          if (failure) {
            failure(response.data.message);
          }
        }
      })
      .catch(error => {
        console.error("Error during check-in:", error);
        dispatch(FAILURE(ATTENDANCE_REQUEST.CHECKIN_USER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
        if (failure) {
          failure(error?.response?.data?.message ? error.response.data.message : error.message);
        }
      });
  };
};

export function GETUSERATTENDANCE(userId, failure, moveToNext) {
  return dispatch => {
    dispatch(REQUEST(ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_REQUEST));
    getUserAttendance(userId).then(
      response => {
    
        if (response.data.succeeded === true) {
      
          dispatch(SUCCESS(ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_SUCCESS, response.data.data));
          if (moveToNext) {
            moveToNext();
          }
        } else {
          dispatch(FAILURE(ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_FAILURE, response.data.message));
          if (failure) {
            failure(response.data.message);
          }
        }
      },
      error => {
        dispatch(FAILURE(ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_FAILURE, error.message));
        if (failure) {
          failure(error.message);
        }
      }
    );
  };
};

export function GETATTENDANCEDETAILBYID(id, moveToNext, failure) {
  return dispatch => {
    dispatch(REQUEST(ATTENDANCE_REQUEST.GET_ATTENDANCE_DETAIL_BY_ID_REQUEST));
    getAttendanceDetailById(id).then(
      response => {
      
        if (response.data.succeeded === true) {
         
          dispatch(SUCCESS(ATTENDANCE_REQUEST.GET_ATTENDANCE_DETAIL_BY_ID_SUCCESS, response.data.data));
          if (moveToNext) {
            moveToNext(response.data.data);
          }
        } else {
          dispatch(FAILURE(ATTENDANCE_REQUEST.GET_ATTENDANCE_DETAIL_BY_ID_FAILURE, response.data.message));
          if (failure) {
            failure(response.data.message);
          }
        }
      },
      error => {
        dispatch(FAILURE(ATTENDANCE_REQUEST.error?.response?.data?.message ? error.response.data.message : error.message));
        if (failure) {
          failure(error?.response?.data?.message ? error.response.data.message : error.message);
        }
      }
    );
  };
};

export function DELETEATTENDANCEBYADMIN(attendanceId, auth, moveToNext, failure) {
  return dispatch => {
    dispatch(REQUEST(ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_REQUEST));
    deleteAttendanceByAdmin(attendanceId, auth).then(
      response => {
        if (response.data.succeeded) {
        
          dispatch(SUCCESS(ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_SUCCESS, response.data.data));
          if (moveToNext) {
            moveToNext();
          }
        } else {
          dispatch(FAILURE(ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_FAILURE, response.data.message));
          if (failure) {
            failure(response.data.message);
          }
        }
      },
      error => {
        dispatch(FAILURE(ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
        if (failure) {
          failure(error?.response?.data?.message ? error.response.data.message : error.message);
        }
      }
    );
  };
};

export function EDITATTENDANCEBYUSER(data, auth,moveToNext, failure) {
  return dispatch => {
    dispatch(REQUEST(ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_REQUEST));
    editAttendanceByUser(data,auth).then(
      response => {
        if (response.data.succeeded) {
         
          dispatch(SUCCESS(ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_SUCCESS, response.data.data));
          if (moveToNext) {
            moveToNext(response.data.data);
          }
        } else {
          dispatch(FAILURE(ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_FAILURE, response.data.message));
          if (failure) {
            failure(response.data.message);
          }
        }
      },
      error => {
        dispatch(FAILURE(ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
        if (failure) {
          failure(error?.response?.data?.message ? error.response.data.message : error.message);
        }
      }
    );
  };
};




