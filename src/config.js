export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const PATH = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  AllLeaves: '/allleaves',
  PROFILE: '/profile',
  USERS: '/users/:role',
  FORGOTPASSWORD: '/forgot-password',
  AllCHECK: '/all-check',
  CREATECHECK: '/create-check/:id',
  CREATETEAMCHECK: '/create-team-check/:id',
  ALLTEAMCHECKS: '/all-team-checks',
  ALLEMPLOYEES: '/all-employees',
  CREATEEMPLOYEE: '/employee/:id',
  ALLREQUESTS: '/all-requests',
  CREATEREQUEST: '/create-request/:id',
  CREATETEAMREQUEST: '/create-team-request/:id',
  ALLTEAMREQUESTS: '/all-team-requests',
  TEAMLEADEMPLOYEES: '/team-members'
}
const PAGE_LIMIT = 10;
const baseUrl = "http://192.168.10.10:5000/api";
const APP_SETTINGS = {
  API_PATH: {
    USER: {
      login: baseUrl + "/users/login",
      logout: baseUrl + "/users/logout",
      getAllUsers: baseUrl + "/users/user",
      getUser: `${baseUrl}/users/user`,
      updateUser: baseUrl + "/users/user",
      changePassword: baseUrl + "/users/changepassword",
      remove: baseUrl + "/users/user",
      create: baseUrl + "/users/user",
      getUsersByTeamLead: baseUrl + '/users/teamUsers'
    },
    AVATAR: {
      addImage: baseUrl + '/images/avatar'
    },
    attendance: {
      checkInUser: baseUrl + "/attendance",
      getUserAttendance: baseUrl + "/attendance/user",
      editAttendanceByUser: baseUrl + "/attendance",
      getAllCheckedInEmployees: baseUrl + "/attendance",
      deleteAttendanceByAdmin: baseUrl + "/attendance",
      getAttendanceDetailById: baseUrl + "/attendance"
    },
    leave: {
      requestLeave: baseUrl + "/leave",
      getAllLeaves: baseUrl + "/leaves",
      editLeaveRequest: baseUrl + "/leave",
      deleteLeaveRequest: baseUrl + "/leaves",
      getAllLeavesByTeamLead: baseUrl + "/leaves/team",
      updateLeaveStatus: baseUrl + "/leave/:id/status",
      getUserLeaves: baseUrl + "/leave",

    }
  }
};

const MONTHLIST = [
  {
    id: 1,
    value: 'January'
  },
  {
    id: 2,
    value: 'Feburary'
  },
  {
    id: 3,
    value: 'March'
  },
  {
    id: 4,
    value: 'April'
  },
  {
    id: 5,
    value: 'May'
  },
  {
    id: 6,
    value: 'June'
  },
  {
    id: 7,
    value: 'July'
  },
  {
    id: 8,
    value: 'August'
  },
  {
    id: 9,
    value: 'September'
  },
  {
    id: 10,
    value: 'October'
  },
  {
    id: 11,
    value: 'November'
  },
  {
    id: 12,
    value: 'December'
  }
]
const ROLE = [
  {
    id: '',
    value: "All"
  },
  {
    id: 'admin',
    value: "Admin"
  },
  {
    id: 'employee',
    value: "Employee"
  }
];
const TEAMLEADFILTER = [
  {
    id: '',
    name: 'All',
  },
  {
    id: true,
    name: 'Team Lead'
  },
  {
    id: false,
    name: 'Non Team Lead'
  }
];
const STATUSFILTER = [
  {
    id: 'active',
    name: 'Active'
  },
  {
    id: 'inactive',
    name: 'Inactive'
  }
];

const USER_ROLE_LIST = {
  ADMIN: 'admin',
  SUPERADMIN: 'superAdmin',
  CUSTOMER: 'customer'
};
const STATUS = [
  {
    id: 'Approved',
    value: 'Approved'
  },
  {
    id: 'Rejected',
    value: 'Rejected'
  },
  {
    id: 'Pending',
    value: 'Pending'
  }
];



export { MONTHLIST, TEAMLEADFILTER, USER_ROLE_LIST, STATUSFILTER, ROLE, APP_SETTINGS, PAGE_LIMIT, STATUS };
