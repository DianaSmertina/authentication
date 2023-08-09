export interface IUser {
    id: number;
    name: string;
    email: string;
    reg_date: string;
    last_log_date: string;
    status: string;
    password_hash: string;
}

export interface IAuthData {
    email: string;
    password: string;
    name?: string | undefined;
}
