import {FC} from "react";
import TestViewBox from "./TestViewBox.ts";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Editor from "../editor/Editor.tsx";


export const TestView: FC = () => {
    return (
        <TestViewBox>
            <Dialog maxWidth="xl" open={true}>
                <DialogContent
                sx={{
                    padding: 0
                }}>
                    <Editor>

                    </Editor>
                </DialogContent>
            </Dialog>
        </TestViewBox>
    );
}

export default TestView;