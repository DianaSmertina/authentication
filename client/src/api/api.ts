export class Api {
    private static base = "http://localhost:5000/api";

    static async signIn(data: {
        email: string;
        password: string;
    }): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/sign-in`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async signUp(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async getUsers(): Promise<Array<IUser>> {
        const response = await fetch(`${Api.base}/user`);
        const data = await response.json();
        return data;
    }
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    reg_date: string;
    last_log_date: string;
    status: string;
    password_hash: string;
}
