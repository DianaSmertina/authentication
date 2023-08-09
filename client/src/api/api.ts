import { IAuthData, IUser } from "../types/types";

export class Api {
    private static base = "http://localhost:5000/api";

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
        const response = await fetch(`${Api.base}/user`);
        const data = await response.json();
        return data;
    }
}
