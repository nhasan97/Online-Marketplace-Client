import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import AddJobs from "../pages/AddJobs";
import MyPostedJobs from "../pages/My-posted-jobs/MyPostedJobs";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";
import CategoricalPopularity from "../pages/CategoricalPopularity";
import JobDetailsAndBidPlacement from "../pages/JobDetailsAndBidPlacement/JobDetailsAndBidPlacement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/popularity",
        element: <CategoricalPopularity></CategoricalPopularity>,
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
        path: "/job-details/:id",
        element: (
          <PrivateRoute>
            <JobDetailsAndBidPlacement></JobDetailsAndBidPlacement>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/bid-requests",
        element: (
          <PrivateRoute>
            <BidRequests></BidRequests>
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
