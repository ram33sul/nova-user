import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NotFound from "./pages/notfound/notfound";
import Signup from "./pages/signup/signup";
import Submission from "./pages/submission/submission.component";

export const routePaths = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SUBMISSION: "/submission",
};

const routes = [
  {
    path: routePaths.HOME,
    element: <Home />,
    shouldLogin: true,
  },
  {
    path: routePaths.LOGIN,
    element: <Login />,
    shouldLogout: true,
  },
  {
    path: routePaths.SIGNUP,
    element: <Signup />,
    shouldLogout: true,
  },
  {
    path: routePaths.SUBMISSION,
    element: <Submission />,
    shouldLogin: true,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
