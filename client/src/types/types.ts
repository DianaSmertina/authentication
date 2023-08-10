export interface IUser {
    id: number;
    name: string;
    email: string;
    reg_date: string;
    last_log_date: string;
    status: string;
    password_hash?: string;
    isChecked?: boolean;
}

export interface IAuthData {
    email: string;
    password: string;
    name?: string | undefined;
}
