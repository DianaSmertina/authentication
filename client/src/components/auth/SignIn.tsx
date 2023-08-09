import { Dispatch, SetStateAction } from "react";
import AuthForm from "./AuthForm";

export default function SignIn({
    setIsAuth,
}: {
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}) {
    return <AuthForm formType="signIn" setIsAuth={setIsAuth} />;
}
