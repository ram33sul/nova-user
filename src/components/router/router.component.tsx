import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../../Routes";

const HOME = "/";
const LOGIN = "/login";

export default function Router() {
  const { user } = useSelector((state: RootState) => state);
  return (
    <Routes>
      {routes.map(({ path, element, shouldLogin, shouldLogout }) => {
        const elem =
          shouldLogin && !user ? (
            <Navigate to={LOGIN} />
          ) : shouldLogout && user ? (
            <Navigate to={HOME} />
          ) : (
            element
          );
        return <Route key={path} path={path} element={elem} />;
      })}
    </Routes>
  );
}
