import {FC, useState} from "react";
import Divider from "@mui/material/Divider";
import EditorForm from "./EditorForm.ts";
import EditorFormHeader from "./EditorFormHeader.ts";
import EditorFormContent from "./EditorFormContent.ts";
import EditorFormSlider from "./EditorFormSlider.tsx";
import EditorFormInputNumber from "./EditorFormInputNumber.tsx";
import EditorFormSliderLabel from "./EditorFormSliderLabel.tsx";
import FlexBox from "../FlexBox.ts";
import EditorFormGrid from "./EditorFormGrid.ts";
import EditorFormGridContainer from "./EditorFormGridContainer.tsx";

export const Editor: FC = () => {
    const [firstValue, setFirstValue] = useState<number>(0);
    const [secondValue, setSecondValue] = useState<number>(0);
    return (
        <EditorForm>
            <EditorFormHeader title="Edit Character"/>
            <Divider/>
            <EditorFormContent>
                <FlexBox gap={3} alignItems="start">
                    <EditorFormGridContainer>
                        <EditorFormGrid xs>
                            <EditorFormSliderLabel content="first value"/>
                            <EditorFormSlider max={10} value={firstValue} onChange={(value) => {
                                setFirstValue(value);
                                if (value < secondValue) setSecondValue(value);
                            }}/>
                        </EditorFormGrid>
                        <EditorFormGrid>
                            <EditorFormInputNumber max={10} value={firstValue} onChange={(value) => {
                                setFirstValue(value);
                                if (value < secondValue) setSecondValue(value);
                            }}/>
                        </EditorFormGrid>
                    </EditorFormGridContainer>
                    <Divider variant="middle" orientation="vertical" flexItem/>
                    <FlexBox gap={3} alignItems="start">
                        <EditorFormGridContainer>
                            <EditorFormGrid xs>
                                <EditorFormSliderLabel content="second value"/>
                                <EditorFormSlider max={Math.min(firstValue, 5)}
                                                  value={secondValue} onChange={
                                    (value) => setSecondValue(value)
                                }
                                />
                            </EditorFormGrid>
                            <EditorFormGrid>
                                <EditorFormSliderLabel content="apprentice"/>
                            </EditorFormGrid>
                        </EditorFormGridContainer>
                        <EditorFormGridContainer>
                            <EditorFormGrid xs>
                                <EditorFormSliderLabel content="second value"/>
                                <EditorFormSlider max={Math.min(firstValue, 5)}
                                                  value={secondValue} onChange={
                                    (value) => setSecondValue(value)
                                }
                                />
                            </EditorFormGrid>
                            <EditorFormGrid>
                                <EditorFormSliderLabel content="master"/>
                            </EditorFormGrid>
                        </EditorFormGridContainer>
                    </FlexBox>
                </FlexBox>
            </EditorFormContent>
        </EditorForm>
    )
        ;
}

export default Editor;
