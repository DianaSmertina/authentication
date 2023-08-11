import { IAuthData, IUser } from "../types/types";

export class Api {
    private static base = "https://authentication-n6p6.onrender.com/api";

    static async signIn(
        data: IAuthData
    ): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/sign-in`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async signUp(
        data: IAuthData
    ): Promise<string | { message: string }> {
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
        const response = await fetch(`${Api.base}/users`);
        const data = await response.json();
        data.forEach((el: IUser) => {
            delete el.password_hash;
        });
        return data;
    }

    static async updateLogDate(data: {
        email: string;
    }): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/sign-in`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async updateStatus(data: {
        email: string;
        status: string;
    }): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/user`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async checkStatus(email: string): Promise<string> {
        const response = await fetch(`${Api.base}/user/${email}`);
        const status = await response.json();
        return status;
    }

    static async deleteUser(
        email: string
    ): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/delete-user/${email}`, {
            method: "DELETE",
        });
        const result = await response.json();
        return result;
    }
}
