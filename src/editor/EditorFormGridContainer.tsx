import {FC} from "react";
import EditorFormGrid from "./EditorFormGrid.ts";
import {Grid2Props} from "@mui/material/Unstable_Grid2";

export type EditorFormGridContainerProps = Omit<Grid2Props, "container">;

export const EditorFormGridContainer: FC<EditorFormGridContainerProps> = ({...rest}) => {
    return (
        <EditorFormGrid container spacing={2} flexGrow={1} {...rest} />
    );
};

export default EditorFormGridContainer;
