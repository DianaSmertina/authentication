import { Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Users from "./components/users/Users";
import { useState } from "react";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

export default function App() {
    const [currentUser, setCurrentUser] = useState("");

    return (
        <Routes>
            <Route
                path="/"
                element={<SignIn setCurrentUser={setCurrentUser} />}
            />
            <Route
                path="/sign-up"
                element={<SignUp setCurrentUser={setCurrentUser} />}
            />
            <Route element={<PrivateRoute currentUser={currentUser} />}>
                <Route
                    path="/users"
                    element={
                        <Users
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}
