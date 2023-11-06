import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import AddJobs from "../pages/AddJobs";
import MyPostedJobs from "../pages/My-posted-jobs/MyPostedJobs";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      // My bids page
      // x Add job page
      // ○ My posted jobs
      // ○ Bid Request page
      // ○ Job detail page

      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-jobs",
        element: (
          <PrivateRoute>
            <AddJobs></AddJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posted-jobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
