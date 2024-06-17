import {FC} from "react";
import FlexBox from "../FlexBox.ts";
import Box from "@mui/material/Box";
import EditorFormSliderLabel from "./EditorFormSliderLabel.tsx";
import EditorFormSlider from "./EditorFormSlider.tsx";

import {EditorFormSliderMasterProps} from "./EditorFormSliderMaster.tsx";
import Character from "../Character.ts";

export type EditorFormSliderSlaveProps = EditorFormSliderMasterProps & {
    masterValue?: number,
};

export const EditorFormSliderSlave: FC<EditorFormSliderSlaveProps> = ({
                                                                          label,
                                                                          masterValue,
                                                                          max,
                                                                          color,
                                                                          value,
                                                                          ...rest
                                                                      }) => {
    return (
        <FlexBox gap={2} alignItems="center">
            <Box>
                <EditorFormSliderLabel content={label}/>
                <EditorFormSlider max={masterValue && max && Math.min(masterValue, max)} sx={{
                    color,
                }} value={value} {...rest}/>
            </Box>
            <EditorFormSliderLabel content={Character.skillLevelsNames[value as number]}/>
        </FlexBox>
    )
};

export default EditorFormSliderSlave;
