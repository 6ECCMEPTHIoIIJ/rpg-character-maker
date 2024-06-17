import {styled, TypographyProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import capitalize from "@mui/material/utils/capitalize";

export type EditorFormSliderLabelProps = TypographyProps;

export const EditorFormSliderLabel = styled(({content = "", ...rest}: EditorFormSliderLabelProps) => {
    return (
        <Typography
            component="div"
            variant="caption"
            {...rest}
        >
            {capitalize(content)}
        </Typography>
    );
})(() => ({
    minWidth: "70px",
}));

export default EditorFormSliderLabel;