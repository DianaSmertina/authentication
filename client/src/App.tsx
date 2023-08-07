import { useEffect } from "react";
import { Api } from "./api/api";

export default function App() {
    const getUsers = async () => {
        try {
            const data = await Api.getUsers();
            console.log(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const signUp = async () => {
        try {
            const data = await Api.signUp({
                email: "123@gmail.com",
                password: "123",
                name: "Kate",
            });
            console.log(data);
        } catch (error) {
            console.error("Sign-up error:", error);
        }
    };

    const signIn = async () => {
        try {
            const data = await Api.signIn({
                email: "123@gmail.com",
                password: "123",
            });
            console.log(data);
        } catch (error) {
            console.error("Sign-in error:", error);
        }
    };

    useEffect(() => {
        getUsers();
        signUp();
        signIn();
    }, []);

    return <div>Hi!</div>;
}
