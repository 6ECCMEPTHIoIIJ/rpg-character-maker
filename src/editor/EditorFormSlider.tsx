import EditorWideSlider from "./EditorWideSlider.ts";
import {SliderProps} from "@mui/material/Slider";
import {styled} from "@mui/material";

export type EditorFormSliderProps = Omit<SliderProps, "onChange" | "onBlur"> & {
    onChange?: (value: number) => void,
};

export const EditorFormSlider = styled(({onChange, min = 0, max = 100, ...rest}: EditorFormSliderProps) => {
    const marks = Array.from({length: max - min - 1}, (_, i) => ({value: i + 1}));

    return (
        <EditorWideSlider
            min={min}
            max={max}
            marks={marks}
            disabled={max === min}
            onChange={(_, value) => {
                onChange?.(value as number);
            }}
            {...rest}
        />
    );
})(() => ({
    minWidth: "150px",
}));

export default EditorFormSlider;