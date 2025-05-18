import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import GuestRoute from "../utils/GuestRoute";
import Register from "./Register";

//actions and loaders
import { action as registerAction } from "./Register";
import Uploader from "../components/OnTesting/Uploader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: "ciao",
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
        action: registerAction,
      },
      {
        path: "uploader",
        element: <Uploader />,
      },
    ],
  },
]);
