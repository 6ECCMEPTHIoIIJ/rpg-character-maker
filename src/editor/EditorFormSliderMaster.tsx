import {FC} from "react";
import FlexBox from "../FlexBox.ts";
import Box from "@mui/material/Box";
import EditorFormSliderLabel from "./EditorFormSliderLabel.tsx";
import EditorFormSlider, {EditorFormSliderProps} from "./EditorFormSlider.tsx";
import EditorFormInputNumber from "./EditorFormInputNumber.tsx";

export type EditorFormSliderMasterProps = Pick<EditorFormSliderProps, "onChange" | "max" | "potential" | "value"> & {
    label?: string;
    color?: string;
};

export const EditorFormSliderMaster: FC<EditorFormSliderMasterProps> = ({
                                                                            label,
                                                                            color,
                                                                            max,
                                                                            potential,
                                                                            ...rest
                                                                        }) => {
    return (<FlexBox gap={2} alignItems="center">
        <Box>
            <EditorFormSliderLabel content={label}/>
            <EditorFormSlider max={max} potential={potential}
                              sx={{
                                  color,
                              }}  {...rest}/>
        </Box>
        <EditorFormInputNumber max={max} {...rest}/>
    </FlexBox>);
};

export default EditorFormSliderMaster;