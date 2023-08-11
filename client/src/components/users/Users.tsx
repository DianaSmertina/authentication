import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Api } from "../../api/api";
import { IUser } from "../../types/types";
import UsersTable from "./UsersTable";
import ToolBar from "./ToolBar";
import { Container, Row, Col } from "react-bootstrap";

interface IUsersProps {
    currentUser: string;
    setCurrentUser: Dispatch<SetStateAction<string>>;
}

export default function Users({ currentUser, setCurrentUser }: IUsersProps) {
    const [users, setUsers] = useState<Array<IUser>>();
    const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);

    const getUsers = async () => {
        try {
            const data = await Api.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center vh-100"
        >
            <Row>
                <Row className="mb-3 justify-content-between">
                    <Col className="col-auto">
                        <ToolBar
                            currentUser={currentUser}
                            selectedEmails={selectedEmails}
                            setCurrentUser={setCurrentUser}
                            getUsers={getUsers}
                        />
                    </Col>
                    <Col className="col-auto">
                        <div>Current user: {currentUser}</div>
                    </Col>
                </Row>
                <Row>
                    <UsersTable
                        users={users}
                        setSelectedEmails={setSelectedEmails}
                    />
                </Row>
            </Row>
        </Container>
    );
}
