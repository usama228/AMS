import Login from "./login";
import Dashboard from './dashboard';
import Profile from "./profile";
import ForgotPassword from "./forgot-password";
import AllCheck from "./checks/AllCheck.js";
import CreateCheck from "./checks/CraeteCheck";
import AllEmployees from "./employee";
import CreateEmployee from "./employee/CreateEmployee";
import AllRequests from "./leave";
import CreateRequest from "./leave/CreateRequest";
import TeamLeadEmployees from "./TeamLeadEmployee";
import CreateTeamCheck from "./team-checks/CreateTeamCheck";
import AllTeamChecks from "./team-checks/AllTeamChecks";
import AllTeamRequests from "./team-leaves/AllTeamRequests";
import CreateTeamRequest from "./team-leaves/CreateTeamRequest";

export const WEB_PAGES = {
    LOGIN: Login,
    DASHBOARD: Dashboard,
    PROFILE: Profile,
    FORGOTPASSWORD: ForgotPassword,
    ALLCHECk: AllCheck,
    CREATECHECK: CreateCheck,
    CREATETEAMCHECK: CreateTeamCheck,
    ALLTEAMCHECKS: AllTeamChecks,
    ALLEMPLOYEES: AllEmployees,
    CREATEEMPLOYEE: CreateEmployee,
    ALLREQUESTS: AllRequests,
    CREATEREQUEST: CreateRequest,
    ALLTEAMREQUESTS: AllTeamRequests,
    CREATETEAMREQUEST: CreateTeamRequest,
    TEAMLEADEMPLOYEES: TeamLeadEmployees

}
