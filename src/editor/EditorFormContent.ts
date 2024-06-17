import {styled} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {flexColumn} from "../styles/flex.ts";

export const EditorFormContent = styled(CardContent)`
    ${flexColumn};
    overflow-y: auto;
`;

export default EditorFormContent;