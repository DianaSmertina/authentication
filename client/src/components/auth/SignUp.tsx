import { Dispatch, SetStateAction } from "react";
import AuthForm from "./AuthForm";

export default function SignUp({
    setIsAuth,
}: {
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}) {
    return <AuthForm formType="signUp" setIsAuth={setIsAuth} />;
}
