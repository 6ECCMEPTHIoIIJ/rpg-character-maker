import {styled} from "@mui/material";
import Card from "@mui/material/Card";
import {flexColumn} from "../styles/flex.ts";

export const EditorForm = styled(Card)`
    ${flexColumn};
    margin-left: auto;
    min-width: 300px;
    max-height: 100%;
`;

export default EditorForm;