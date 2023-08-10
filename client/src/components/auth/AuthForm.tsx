import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAuthData } from "../../types/types";
import { Api } from "../../api/api";
import { Dispatch, SetStateAction } from "react";

interface IAuthFormProps {
    formType: "signIn" | "signUp";
    setCurrentUser: Dispatch<SetStateAction<string>>;
}

export default function AuthForm({ formType, setCurrentUser }: IAuthFormProps) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IAuthData>({
        mode: "onSubmit",
    });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IAuthData> = async (formData) => {
        try {
            let data;
            if (formType === "signIn") {
                data = await Api.signIn({
                    email: formData.email,
                    password: formData.password,
                });
                await Api.updateLogDate({ email: formData.email });
            } else {
                data = await Api.signUp({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                });
            }

            if (typeof data !== "string") {
                toast.error(data.message);
            } else {
                setCurrentUser(formData.email);
                navigate("/users");
            }
        } catch (error) {
            toast.error(`${formType} error: ${error}`);
        }
    };

    const onSwitchForm = () => {
        if (formType === "signIn") {
            navigate("/sign-up");
        } else {
            navigate("/sign-in");
        }
    };

    return (
        <>
            <ToastContainer />
            <h1>{formType === "signIn" ? "Sign In" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {formType === "signUp" && (
                    <>
                        <input
                            placeholder="Your name"
                            type="name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && <div>Please enter your name</div>}
                    </>
                )}
                <input
                    placeholder="Your e-mail"
                    type="email"
                    {...register("email", {
                        required: true,
                    })}
                />
                {errors.email && <div>Please enter the email</div>}
                <input
                    placeholder="Create password"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                ></input>
                {errors.password && <div>Please enter password</div>}
                <input type="submit" value="Submit"></input>
                <input
                    type="button"
                    value={`Switch to ${
                        formType === "signIn" ? "Sign Up" : "Sign In"
                    }`}
                    onClick={onSwitchForm}
                ></input>
            </form>
        </>
    );
}
