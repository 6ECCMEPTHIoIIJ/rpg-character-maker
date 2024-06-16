import {FC} from "react";
import ScrollableAppBar from "./ScrollableAppBar";
import Typography from "@mui/material/Typography";

export const RpgCharacterMakerAppBar: FC = () => {
    return (
        <ScrollableAppBar>
            <Typography variant="h3" component="div">
                RPG Character maker
            </Typography>
            <Typography
                variant="h6"
                component="a"
                href="https://github.com/6ECCMEPTHIoIIJ?tab=repositories"
            >
                By 6ECCMEPTHIoIIJ
            </Typography>
        </ScrollableAppBar>
    );
};


export default RpgCharacterMakerAppBar;