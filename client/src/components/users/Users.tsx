import { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { IUser } from "../../types/types";
import UsersTable from "./UsersTable";
import ToolBar from "./ToolBar";

export default function Users() {
    const [users, setUsers] = useState<Array<IUser>>();

    const getUsers = async () => {
        try {
            const data = await Api.getUsers();
            data.forEach((el) => {
                delete el.password_hash;
                el.isChecked = false;
            });
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <ToolBar />
            <UsersTable users={users} />
        </>
    );
}
