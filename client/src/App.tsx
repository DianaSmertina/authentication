import { Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Users from "./components/users/Users";
import { useState } from "react";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

export default function App() {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn setIsAuth={setIsAuth} />} />
            <Route path="/sign-up" element={<SignUp setIsAuth={setIsAuth} />} />
            <Route element={<PrivateRoute isAuth={isAuth} />}>
                <Route path="/users" element={<Users />} />
            </Route>
        </Routes>
    );
}
