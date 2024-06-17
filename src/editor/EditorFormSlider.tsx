import EditorWideSlider from "./EditorWideSlider.ts";
import {SliderProps} from "@mui/material/Slider";
import { styled} from "@mui/material";

export type EditorFormSliderProps = Omit<SliderProps, "onChange" | "onBlur"> & {
    onChange?: (value: number) => void,
    potential?: number,
};

export const EditorFormSlider = styled(({
                                            onChange,
                                            min = 0,
                                            max = 100,
                                            potential = max,
                                            ...rest
                                        }: EditorFormSliderProps) => {
    const disabled = max <= min;
    const maxLimited = Math.min(Math.max(min + 1, max), potential);
    const marks = Array.from({length: maxLimited - min - 1}, (_, i) => ({value: i + 1}));

    return (
        <EditorWideSlider
            min={min}
            max={maxLimited}
            marks={marks}
            disabled={disabled}
            onChange={(_, value) => {
                onChange?.(value as number);
            }}
            {...rest}
        />
    );
})(({min = 0, max = 100, potential = Math.max(min + 1, max)}) => {
    const maxLimited = Math.min(Math.max(min + 1, max), potential);

    const width = `${150 * maxLimited / potential}px`;
    const marginRight = `${150 * (potential - maxLimited) / potential}px`;
    return {
        width,
        marginRight,
    };
});

export default EditorFormSlider;