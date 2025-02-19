import { LEAVE_REQUEST } from "app/redux/actions/utilities";

const INITIAL_STATE = {
    createLeaveRequestLoading: false,
    createLeaveRequestSuccess: false,
    createLeaveRequestFailure: false,
    createLeaveRequestError: null,
    leaveData: [],

    allLeavesLoading: false,
    allLeavesSuccess: false,
    allLeavesFailure: false,
    allLeavesError: null,
    allLeavesData: null,

    editLeaveRequestLoading: false,
    editLeaveRequestSuccess: false,
    editLeaveRequestFailure: false,
    editLeaveRequestError: null,

    getLeaveByIdLoading: false,
    getLeaveByIdSuccess: false,
    getLeaveByIdFailure: false,
    getLeaveByIdError: null,
    leaveByIdData: null,

    deleteLeaveRequestLoading: false,
    deleteLeaveRequestSuccess: false,
    deleteLeaveRequestFailure: false,
    deleteLeaveRequestError: null,


    userLeavesLoading: false,
    userLeavesSuccess: false,
    userLeavesFailure: false,
    userLeavesError: null,
    userLeavesData: null,

    updateLeaveStatusLoading: false,
    updateLeaveStatusSuccess: false,
    updateLeaveStatusFailure: false,
    updateLeaveStatusError: null,
};

export const leaveReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LEAVE_REQUEST.CREATE_LEAVE_REQUEST:
            return {
                ...state,
                createLeaveRequestLoading: true,
                createLeaveRequestSuccess: false,
                createLeaveRequestFailure: false,
                createLeaveRequestError: null,
            };

        case LEAVE_REQUEST.CREATE_LEAVE_SUCCESS:
            return {
                ...state,
                createLeaveRequestLoading: false,
                createLeaveRequestSuccess: true,
                createLeaveRequestFailure: false,
                createLeaveRequestError: null,
                leaveData: action.payload,
            };

        case LEAVE_REQUEST.CREATE_LEAVE_FAILURE:
            return {
                ...state,
                createLeaveRequestLoading: false,
                createLeaveRequestSuccess: false,
                createLeaveRequestFailure: true,
                createLeaveRequestError: action.payload,
            };

        case LEAVE_REQUEST.GET_ALL_LEAVES_REQUEST:
            return {
                ...state,
                allLeavesLoading: true,
                allLeavesSuccess: false,
                allLeavesFailure: false,
                allLeavesError: null,
            };

        case LEAVE_REQUEST.GET_ALL_LEAVES_SUCCESS:
            return {
                ...state,
                allLeavesLoading: false,
                allLeavesSuccess: true,
                allLeavesFailure: false,
                allLeavesError: null,
                allLeavesData: action.payload,
            };

        case LEAVE_REQUEST.GET_ALL_LEAVES_FAILURE:
            return {
                ...state,
                allLeavesLoading: false,
                allLeavesSuccess: false,
                allLeavesFailure: true,
                allLeavesError: action.payload,
            };

        case LEAVE_REQUEST.EDIT_LEAVE_REQUEST:
            return {
                ...state,
                editLeaveRequestLoading: true,
                editLeaveRequestSuccess: false,
                editLeaveRequestFailure: false,
                editLeaveRequestError: null,
            };

        case LEAVE_REQUEST.EDIT_LEAVE_SUCCESS:
            let myList = state.leaveData
            for (let i = 0; i < myList.length; i++) {
                if (myList[i].id === action.payload.id) {
                    myList[i].id = action.payload
                }
            }
            return {
                ...state,
                editLeaveRequestLoading: false,
                editLeaveRequestSuccess: true,
                editLeaveRequestFailure: false,
                editLeaveRequestError: null,
                leaveData: myList,
            };

        case LEAVE_REQUEST.EDIT_LEAVE_FAILURE:
            return {
                ...state,
                editLeaveRequestLoading: false,
                editLeaveRequestSuccess: false,
                editLeaveRequestFailure: true,
                editLeaveRequestError: action.payload,
            };
        case LEAVE_REQUEST.GET_LEAVE_BY_ID_REQUEST:
            return {
                ...state,
                getLeaveByIdLoading: true,
                getLeaveByIdSuccess: false,
                getLeaveByIdFailure: false,
                getLeaveByIdError: null,
            };

        case LEAVE_REQUEST.GET_LEAVE_BY_ID_SUCCESS:
            return {
                ...state,
                getLeaveByIdLoading: false,
                getLeaveByIdSuccess: true,
                getLeaveByIdFailure: false,
                getLeaveByIdError: null,
                leaveByIdData: action.payload,
            };

        case LEAVE_REQUEST.GET_LEAVE_BY_ID_FAILURE:
            return {
                ...state,
                getLeaveByIdLoading: false,
                getLeaveByIdSuccess: false,
                getLeaveByIdFailure: true,
                getLeaveByIdError: action.payload,
            };

        case LEAVE_REQUEST.DELETE_LEAVE_REQUEST:
            return {
                ...state,
                deleteLeaveRequestLoading: true,
                deleteLeaveRequestSuccess: false,
                deleteLeaveRequestFailure: false,
                deleteLeaveRequestError: null,
            };

        case LEAVE_REQUEST.DELETE_LEAVE_SUCCESS:
                       return {
                ...state,
                deleteLeaveRequestLoading: false,
                deleteLeaveRequestSuccess: true,
                deleteLeaveRequestFailure: false,
                deleteLeaveRequestError: null,
            };

        case LEAVE_REQUEST.DELETE_LEAVE_FAILURE:
            return {
                ...state,
                deleteLeaveRequestLoading: false,
                deleteLeaveRequestSuccess: false,
                deleteLeaveRequestFailure: true,
                deleteLeaveRequestError: action.payload,
            };

        case LEAVE_REQUEST.GET_USER_LEAVES_REQUEST:
            return {
                ...state,
                userLeavesLoading: true,
                userLeavesSuccess: false,
                userLeavesFailure: false,
                userLeavesError: null,
            };

        case LEAVE_REQUEST.GET_USER_LEAVES_SUCCESS:
            return {
                ...state,
                userLeavesLoading: false,
                userLeavesSuccess: true,
                userLeavesFailure: false,
                userLeavesError: null,
                userLeavesData: action.payload,
            };

        case LEAVE_REQUEST.GET_USER_LEAVES_FAILURE:
            return {
                ...state,
                userLeavesLoading: false,
                userLeavesSuccess: false,
                userLeavesFailure: true,
                userLeavesError: action.payload,
            };

        case LEAVE_REQUEST.UPDATE_LEAVE_STATUS_REQUEST:
            return {
                ...state,
                updateLeaveStatusLoading: true,
                updateLeaveStatusSuccess: false,
                updateLeaveStatusFailure: false,
                updateLeaveStatusError: null,
            };

            case LEAVE_REQUEST.UPDATE_LEAVE_STATUS_SUCCESS:
                const { id, status } = action.payload;
                return {
                    ...state,
                    updateLeaveStatusLoading: false,
                    updateLeaveStatusSuccess: true,
                    updateLeaveStatusFailure: false,
                    updateLeaveStatusError: null,
                    leaveData: Array.isArray(state.leaveData) 
                        ? state.leaveData.map(leave =>
                            leave.id === id ? { ...leave, status } : leave
                        )
                        : [], 
                };
            


        case LEAVE_REQUEST.UPDATE_LEAVE_STATUS_FAILURE:
            return {
                ...state,
                updateLeaveStatusLoading: false,
                updateLeaveStatusSuccess: false,
                updateLeaveStatusFailure: true,
                updateLeaveStatusError: action.payload,
            };


        default:
            return state;
    }
};
