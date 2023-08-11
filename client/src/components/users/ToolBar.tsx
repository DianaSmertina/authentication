import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./ToolBar.scss";
import { Api } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface IToolBarProps {
    currentUser: string;
    selectedEmails: Array<string>;
    setCurrentUser: Dispatch<SetStateAction<string>>;
    getUsers: () => Promise<void>;
}

export default function ToolBar({
    currentUser,
    selectedEmails,
    setCurrentUser,
    getUsers,
}: IToolBarProps) {
    const navigate = useNavigate();

    const handleUser = async (newStatus: string, action: string) => {
        if (!(await isStatusActive())) return;
        const updatePromises = [];
        for (const email of selectedEmails) {
            let updatePromise;
            if (action === "changeStatus") {
                updatePromise = Api.updateStatus({
                    email: email,
                    status: newStatus,
                });
            } else {
                updatePromise = Api.deleteUser(email);
            }
            updatePromises.push(updatePromise);
        }
        try {
            await Promise.all(updatePromises);
            toast.info(`Selected users are ${newStatus}`);
            await getUsers();
            checkSelectedEmails(newStatus);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const checkSelectedEmails = (newStatus: string) => {
        if (newStatus === "active") return;
        if (selectedEmails.includes(currentUser)) {
            logOut();
        }
    };

    const logOut = () => {
        setCurrentUser("");
        navigate("/sign-in");
    };

    const isStatusActive = async () => {
        const status = await Api.checkStatus(currentUser);
        if (status === "active") return true;
        toast.info("You were blocked or deleted");
        setTimeout(() => {
            logOut();
        }, 2000);
        return false;
    };

    return (
        <>
            <ToastContainer />
            <Stack direction="horizontal" gap={1} className="mb-2">
                <Button
                    className="btn btn-primary"
                    size="sm"
                    onClick={async () =>
                        await handleUser("blocked", "changeStatus")
                    }
                >
                    Block
                </Button>
                <Button
                    className="btn btn-primary btn-picture unblock"
                    size="sm"
                    onClick={async () =>
                        await handleUser("active", "changeStatus")
                    }
                />
                <Button
                    className="btn btn-primary btn-picture delete"
                    size="sm"
                    onClick={async () => await handleUser("deleted", "delete")}
                />
            </Stack>
        </>
    );
}
