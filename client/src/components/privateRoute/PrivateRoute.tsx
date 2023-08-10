import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ currentUser }: { currentUser: string }) {
    return currentUser !== "" ? <Outlet /> : <Navigate to="/sign-in" />;
}
