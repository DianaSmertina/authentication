import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./ToolBar.scss";

export default function ToolBar() {
    return (
        <Stack direction="horizontal" gap={1} className="mb-2">
            <Button className="btn btn-primary" size="sm">
                Block
            </Button>
            <Button className="btn btn-primary btn-picture unblock" size="sm" />
            <Button className="btn btn-primary btn-picture delete" size="sm" />
        </Stack>
    );
}
