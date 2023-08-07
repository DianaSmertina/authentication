import { useEffect, useState } from "react";

export default function App() {
    const [users, setUsers] = useState();
    const base = "http://localhost:5000/api";

    const getUsers = async () => {
        try {
            const response = await fetch(`${base}/user`);
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return <div>{users}</div>;
}
