import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ isAuth }: { isAuth: boolean }) {
    return isAuth ? <Outlet /> : <Navigate to="/sign-in" />;
}
