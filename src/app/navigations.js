import { PATH } from "../config";

export const navigations = [
  { name: "Dashboard", path: PATH.DASHBOARD, icon: "dashboard", forRole: ['admin', 'employee'] },
  {
    name: "Employees",
    icon: "group",
    forRole: ['admin'],
    forAll: true,
    children: [
      { name: "All Employees", forAll: true, path: PATH.ALLEMPLOYEES, iconText: "E", forRole: ['admin'] },
      { name: "Create Employee", forAll: true, path: PATH.CREATEEMPLOYEE.replace(":id", 'new'), iconText: "E", forRole: ['admin'] }
    ]
  },
  {
    name: "Check In Out",
    icon: "group",
    forRole: ['admin', 'employee'],
    forAll: true,
    children: [
      { name: "Check-In-Out", forAll: true, path: PATH.AllCHECK, iconText: "E", forRole: ['admin', 'employee'] },
      { name: "New Check-In", forAll: true, path: PATH.CREATECHECK.replace(":id", 'new'), iconText: "E", forRole: ['admin', 'employee'] }
    ]
  },
  {
    name: "Team Check In Out",
    icon: "group",
    path: PATH.TEAMLEADEMPLOYEES,
    forRole: ['employee'],
    forAll: false,
    onlyForTeamLead: true,
    children: [
      { name: "Team Check-In-Out", forAll: false, onlyForTeamLead: true, path: PATH.ALLTEAMCHECKS, iconText: "E", forRole: ['employee'] },
      { name: "Team Check-In", forAll: false, onlyForTeamLead: true, path: PATH.CREATETEAMCHECK.replace(":id", 'new'), iconText: "E", forRole: ['employee'] },
    ]
  },
  {
    name: "Team Leaves",
    icon: "group",
    path: PATH.TEAMLEADEMPLOYEES,
    forRole: ['employee'],
    forAll: false,
    onlyForTeamLead: true,
    children: [
      { name: "Team Leaves", forAll: false, onlyForTeamLead: true, path: PATH.ALLTEAMREQUESTS, iconText: "E", forRole: ['employee'] },
      { name: "Create Team Leave", forAll: false, onlyForTeamLead: true, path: PATH.CREATETEAMREQUEST.replace(":id", 'new'), iconText: "E", forRole: ['employee'] }
    ]
  },
  {
    name: "Leaves",
    icon: "calendar_today",
    forRole: ['admin', 'employee'],
    forAll: true,
    children: [
      { name: "All Leaves", forAll: true, path: PATH.ALLREQUESTS, iconText: "E", forRole: ['admin', 'employee'] },
      { name: "Create Leave", forAll: true, path: PATH.CREATEREQUEST.replace(":id", 'new'), iconText: "E", forRole: ['admin', 'employee'] }
    ]
  },
];
