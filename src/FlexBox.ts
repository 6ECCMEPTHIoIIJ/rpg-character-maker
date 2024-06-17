import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import {flexWrap} from "./styles/flex.ts";

export const FlexBox = styled(Box)`
    ${flexWrap};
    flex-grow: 1;
`;

export default FlexBox;