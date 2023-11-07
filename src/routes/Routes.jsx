import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import AddJobs from "../pages/AddJobs";
import MyPostedJobs from "../pages/My-posted-jobs/MyPostedJobs";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      // My bids page
      // x Add job page
      // x My posted jobs
      // ○ Bid Request page
      // ○ Job detail page

      {
        path: "/",
        element: <Home></Home>,
        errorElement: <Error></Error>,
      },
      {
        path: "/add-jobs",
        element: (
          <PrivateRoute>
            <AddJobs></AddJobs>
          </PrivateRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/my-posted-jobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
        errorElement: <Error></Error>,
      },
      {
        path: "/login",
        element: <Login></Login>,
        errorElement: <Error></Error>,
      },
    ],
  },
]);

export default router;
