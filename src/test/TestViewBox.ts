import {styled} from "@mui/material";
import {flexCenter, flexWrap} from "../styles/flex.ts";
import Box from "@mui/material/Box";

export const TestViewBox = styled(Box)`
    ${flexCenter};
    ${flexWrap};
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
`;

export default TestViewBox;