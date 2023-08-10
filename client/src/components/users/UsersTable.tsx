import { Table } from "react-bootstrap";
import { IUser } from "../../types/types";
import UserRow from "./UserRow";
import { ChangeEvent, useCallback, useState } from "react";

export default function UsersTable({
    users,
}: {
    users: Array<IUser> | undefined;
}) {
    const [selectAllSelected, setSelectAllSelected] = useState(false);
    const [checked, setChecked] = useState(
        new Array(users?.length).fill(false)
    );

    const handleOptionChange = useCallback(
        (index: number) => (newValueEvent: ChangeEvent<HTMLInputElement>) => {
            const newValue = newValueEvent.target?.checked;
            const newChecked = [...checked];
            newChecked[index] = newValue;
            setChecked(newChecked);
        },
        [checked]
    );

    const handleSelectAllChange = useCallback(
        (selectAllEvent: ChangeEvent<HTMLInputElement>) => {
            const selectAllValue = selectAllEvent.target.checked;
            setSelectAllSelected(selectAllValue);
            setChecked(new Array(users?.length).fill(selectAllValue));
        },
        []
    );

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
                    <tr key={user.id}>
                        <input
                            type="checkbox"
                            checked={checked[i]}
                            onChange={handleOptionChange(i)}
                        />
                        <UserRow key={user.id} user={user} />
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
