import { Dispatch, SetStateAction } from "react";
import AuthForm from "./AuthForm";

export default function SignUp({
    setCurrentUser,
}: {
    setCurrentUser: Dispatch<SetStateAction<string>>;
}) {
    return <AuthForm formType="signUp" setCurrentUser={setCurrentUser} />;
}
