// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import { PATH } from "../config";
import { WEB_PAGES } from "./views";



const routes = [
  {
    path: PATH.LOGIN,
    element: <WEB_PAGES.LOGIN />
  },
  
  {
    path: PATH.FORGOTPASSWORD,
    element: <WEB_PAGES.FORGOTPASSWORD />,
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: PATH.DASHBOARD,
        element: <WEB_PAGES.DASHBOARD />,
      },
      {
        path: PATH.PROFILE,
        element: <WEB_PAGES.PROFILE />,
      },
      // {
      //   path: PATH.USERS,
      //   element: <WEB_PAGES.USERS />,
      // },
      {
        path: PATH.AllCHECK,
        element: <WEB_PAGES.ALLCHECk />,
      },
      {
        path: PATH.CREATECHECK,
        element: <WEB_PAGES.CREATECHECK />,
      },
      {
        path: PATH.CREATETEAMCHECK,
        element: <WEB_PAGES.CREATETEAMCHECK />,
      },
      {
        path: PATH.ALLTEAMCHECKS,
        element: <WEB_PAGES.ALLTEAMCHECKS />,
      },
      {
        path: PATH.ALLEMPLOYEES,
        element: <WEB_PAGES.ALLEMPLOYEES />,
      },
      {
        path: PATH.CREATEEMPLOYEE,
        element: <WEB_PAGES.CREATEEMPLOYEE />,
      },

      {
        path: PATH.ALLREQUESTS,
        element: <WEB_PAGES.ALLREQUESTS />,
      },
      {
        path: PATH.CREATEREQUEST,
        element: <WEB_PAGES.CREATEREQUEST />,
      },
      {
        path: PATH.CREATETEAMREQUEST,
        element: <WEB_PAGES.CREATETEAMREQUEST />,
      },
      {
        path: PATH.ALLTEAMREQUESTS,
        element: <WEB_PAGES.ALLTEAMREQUESTS />,
      },
      {
        path: PATH.TEAMLEADEMPLOYEES,
        element: <WEB_PAGES.TEAMLEADEMPLOYEES />
      }
      // e-chart route
      // {
      //   path: "/charts/echarts",
      //   element: <AppEchart />,
      //   auth: authRoles.editor
      // }
    ]
  },

  // // session pages route
  // ...sessionRoutes
];

export default routes;
