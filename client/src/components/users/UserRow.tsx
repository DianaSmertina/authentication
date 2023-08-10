import { IUser } from "../../types/types";

interface IUserRowProps {
    user: IUser;
}

export default function UserRow({ user }: IUserRowProps) {
    const createDate = (dateFromServer: string) => {
        return new Date(dateFromServer).toLocaleDateString();
    };

    const createTableData = (currentUser: IUser) => {
        currentUser.reg_date = createDate(user.reg_date);
        currentUser.last_log_date = createDate(user.last_log_date);
        return Object.entries(user)
            .slice(0, 6)
            .map((el) => <td key={el[0]}>{el[1]}</td>);
    };

    return createTableData(user);
}
