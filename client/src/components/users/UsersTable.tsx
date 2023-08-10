import { Table } from "react-bootstrap";
import { IUser } from "../../types/types";
import UserRow from "./UserRow";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";

interface IUsersTableProps {
    users: Array<IUser> | undefined;
    setSelectedEmails: Dispatch<SetStateAction<string[]>>;
}

export default function UsersTable({
    users,
    setSelectedEmails,
}: IUsersTableProps) {
    const [selectAllSelected, setSelectAllSelected] = useState(false);
    const [checked, setChecked] = useState(
        new Array(users?.length).fill(false)
    );

    useEffect(() => {
        setSelectedEmails(() => {
            const emails: Array<string> = [];
            checked.forEach((el, i) => {
                if (el && users) emails.push(users[i].email);
            });
            return emails;
        });
    }, [checked]);

    const handleOptionChange = useCallback(
        (index: number) => (newValueEvent: ChangeEvent<HTMLInputElement>) => {
            const newValue = newValueEvent.target?.checked;
            const newChecked = [...checked];
            newChecked[index] = newValue;
            setChecked(newChecked);
        },
        [checked]
    );

    const handleSelectAllChange = (
        selectAllEvent: ChangeEvent<HTMLInputElement>
    ) => {
        const selectAllValue = selectAllEvent.target.checked;
        setSelectAllSelected(selectAllValue);
        setChecked(new Array(users?.length).fill(selectAllValue));
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectAllSelected}
                            onChange={handleSelectAllChange}
                        />
                    </th>
                    <th>id</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Registration date</th>
                    <th>Last login date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user, i) => (
                    <tr key={user.id} className="text-align-center">
                        <td>
                            <input
                                type="checkbox"
                                checked={checked[i]}
                                onChange={handleOptionChange(i)}
                            />
                        </td>
                        <UserRow key={user.id} user={user} />
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
