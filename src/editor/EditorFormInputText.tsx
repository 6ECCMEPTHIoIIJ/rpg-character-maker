import {FC} from "react";
import TextField, {TextFieldProps} from "@mui/material/TextField";

export type EditorFormInputTextProps = TextFieldProps;
export const EditorFormInputText: FC<EditorFormInputTextProps> = ({...rest}) => {
    return (
        <TextField
            variant="standard"
            margin="normal"
            label="Name"
            {...rest}
        />
    );
};

export default EditorFormInputText;