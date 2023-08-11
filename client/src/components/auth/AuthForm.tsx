import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAuthData } from "../../types/types";
import { Api } from "../../api/api";
import { Dispatch, SetStateAction } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

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
                if (!(await isStatusActive(formData.email))) return;
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

    const isStatusActive = async (email: string) => {
        const status = await Api.checkStatus(email);
        if (status === "blocked") {
            toast.info("Your status is blocked");
            return false;
        }
        return true;
    };

    const onSwitchForm = () => {
        if (formType === "signIn") {
            navigate("/sign-up");
        } else {
            navigate("/");
        }
    };

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center vh-100"
        >
            <ToastContainer />
            <Row className="border p-5">
                <Row>
                    <h1>{formType === "signIn" ? "Sign In" : "Sign Up"}</h1>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {formType === "signUp" && (
                            <Form.Group className="mb-3">
                                <Form.Label>Your name:</Form.Label>
                                <Form.Control
                                    placeholder="Name"
                                    type="name"
                                    {...register("name", {
                                        required: true,
                                    })}
                                />
                                {errors.name && (
                                    <Form.Text>
                                        Please enter your name
                                    </Form.Text>
                                )}
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                placeholder="example@gmail.com"
                                type="email"
                                {...register("email", {
                                    required: true,
                                })}
                            />
                            {errors.email && (
                                <Form.Text>Please enter the email</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                placeholder="Enter password"
                                type="password"
                                {...register("password", {
                                    required: true,
                                })}
                            ></Form.Control>
                            {errors.password && (
                                <Form.Text>Please enter password</Form.Text>
                            )}
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            value="Submit"
                            className="mr-2"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={onSwitchForm}
                            variant="secondary"
                        >{`Switch to ${
                            formType === "signIn" ? "Sign Up" : "Sign In"
                        }`}</Button>
                    </Form>
                </Row>
            </Row>
        </Container>
    );
}
