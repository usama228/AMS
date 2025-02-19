import { ATTENDANCE_REQUEST } from 'app/redux/actions/utilities';

const INITIAL_STATE = {
  checkInUserLoading: false,
  checkInUserSuccess: false,
  checkInUserFailure: false,
  checkInUserError: null,

  userAttendanceLoading: false,
  userAttendanceSuccess: false,
  userAttendanceFailure: false,
  userAttendanceError: null,
  attendanceData: [],

  deleteAttendanceLoading: false,
  deleteAttendanceSuccess: false,
  deleteAttendanceFailure: false,
  deleteAttendanceError: null,

  editAttendanceLoading: false,
  editAttendanceSuccess: false,
  editAttendanceFailure: false,
  editAttendanceError: null,

  attendanceDetailLoading: false,
  attendanceDetailSuccess: false,
  attendanceDetailFailure: false,
  attendanceDetailError: null,
  attendanceDetailData: null,
};

export const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ATTENDANCE_REQUEST.RESET_ATTENDANCE_DATA:
      return {
        ...state,
        userLoading: false,
        userSuccess: false,
        userFailure: false,
        userError: null,
        user: null,
        createLoading: false,
        createSuccess: false,
        createFailure: false,
        createError: null,
      }

    case ATTENDANCE_REQUEST.CHECKIN_USER_REQUEST:
      return {
        ...state,
        checkInUserLoading: true,
        checkInUserSuccess: false,
        checkInUserFailure: false,
        checkInUserError: null,
      };

    case ATTENDANCE_REQUEST.CHECKIN_USER_SUCCESS:
      return {
        ...state,
        checkInUserLoading: false,
        checkInUserSuccess: true,
        checkInUserFailure: false,
        checkInUserError: null,
        checkInData: action.payload,
      };

    case ATTENDANCE_REQUEST.CHECKIN_USER_FAILURE:
      return {
        ...state,
        checkInUserLoading: false,
        checkInUserSuccess: false,
        checkInUserFailure: true,
        checkInUserError: action.payload,
      };

    case ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_REQUEST:
      return {
        ...state,
        userAttendanceLoading: true,
        userAttendanceSuccess: false,
        userAttendanceFailure: false,
        userAttendanceError: null,
      };

    case ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_SUCCESS:
      return {
        ...state,
        userAttendanceLoading: false,
        userAttendanceSuccess: true,
        userAttendanceFailure: false,
        userAttendanceError: null,
        attendanceData: action.payload,
      };

    case ATTENDANCE_REQUEST.GET_USER_ATTENDANCE_FAILURE:
      return {
        ...state,
        userAttendanceLoading: false,
        userAttendanceSuccess: false,
        userAttendanceFailure: true,
        userAttendanceError: action.payload,
      };

    case ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_REQUEST:
      return {
        ...state,
        deleteAttendanceLoading: true,
        deleteAttendanceSuccess: false,
        deleteAttendanceFailure: false,
        deleteAttendanceError: null,
      };

    case ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_SUCCESS:
      return {
        ...state,
        deleteAttendanceLoading: false,
        deleteAttendanceSuccess: true,
        deleteAttendanceFailure: false,
        deleteAttendanceError: null,
        attendanceData: state.attendanceData.filter(item => item.id !== action.payload.id),
      };

    case ATTENDANCE_REQUEST.DELETE_ATTENDANCE_BY_ADMIN_FAILURE:
      return {
        ...state,
        deleteAttendanceLoading: false,
        deleteAttendanceSuccess: false,
        deleteAttendanceFailure: true,
        deleteAttendanceError: action.payload,
      };
    case ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_REQUEST:
      return {
        ...state,
        editAttendanceLoading: true,
        editAttendanceSuccess: false,
        editAttendanceFailure: false,
        editAttendanceError: null,
      };

    case ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_SUCCESS:
      let myList = state.attendanceData
      for (let i = 0; i < myList.length; i++) {
        if (myList[i].id === action.payload.id) {
          myList[i].id = action.payload
        }
      }
      return {
        ...state,
        editAttendanceLoading: false,
        editAttendanceSuccess: true,
        editAttendanceFailure: false,
        editAttendanceError: null,
        attendanceData: myList
      };

    case ATTENDANCE_REQUEST.EDIT_ATTENDANCE_BY_USER_FAILURE:
      return {
        ...state,
        editAttendanceLoading: false,
        editAttendanceSuccess: false,
        editAttendanceFailure: true,
        editAttendanceError: action.payload,
      };

    case ATTENDANCE_REQUEST.GET_ATTENDANCE_DETAIL_BY_ID_REQUEST:
      return {
        ...state,
        attendanceDetailLoading: true,
        attendanceDetailSuccess: false,
        attendanceDetailFailure: false,
        attendanceDetailError: null,
      };

    case ATTENDANCE_REQUEST.GET_ATTENDANCE_DETAIL_BY_ID_SUCCESS:
      return {
        ...state,
        attendanceDetailLoading: false,
        attendanceDetailSuccess: true,
        attendanceDetailFailure: false,
        attendanceDetailError: null,
        attendanceDetailData: action.payload,
      };

    case ATTENDANCE_REQUEST.GET_ATTENDANCE_DETAIL_BY_ID_FAILURE:
      return {
        ...state,
        attendanceDetailLoading: false,
        attendanceDetailSuccess: false,
        attendanceDetailFailure: true,
        attendanceDetailError: action.payload,
      };
    default:
      return state;
  }
};
