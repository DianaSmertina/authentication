import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Api } from "../../api/api";
import { IUser } from "../../types/types";
import UsersTable from "./UsersTable";
import ToolBar from "./ToolBar";

interface IUsersProps {
    currentUser: string;
    setCurrentUser: Dispatch<SetStateAction<string>>;
}

export default function Users({ currentUser, setCurrentUser }: IUsersProps) {
    const [users, setUsers] = useState<Array<IUser>>();
    const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);

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
            <ToolBar
                currentUser={currentUser}
                selectedEmails={selectedEmails}
                setCurrentUser={setCurrentUser}
            />
            <UsersTable users={users} setSelectedEmails={setSelectedEmails} />
        </>
    );
}
