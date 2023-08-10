import { Dispatch, SetStateAction } from "react";
import AuthForm from "./AuthForm";

export default function SignIn({
    setCurrentUser,
}: {
    setCurrentUser: Dispatch<SetStateAction<string>>;
}) {
    return <AuthForm formType="signIn" setCurrentUser={setCurrentUser} />;
}
