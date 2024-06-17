import {FC, useRef} from "react";
import Input, {InputProps} from "@mui/material/Input";

export type EditorFormInputNumberProps = Omit<InputProps, "inputProps" | "onChange" | "onBlur"> & {
    min?: number,
    max?: number,
    onChange?: (value: number) => void,
};


export const EditorFormInputNumber: FC<EditorFormInputNumberProps> = ({min = 0, max = 100, onChange, ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const parseValue = (value: string) => {
        return Number(value ? value : 0);
    }

    return (
        <>
            <Input inputProps={{
                min,
                max,
                type: "number",
            }}
                   disabled={max === min}
                   onChange={(e) => {
                       onChange?.(parseValue(e.target.value));
                   }}

                   onBlur={() => {
                       if (!inputRef.current) return;
                       const value = parseValue(inputRef.current.value);
                       if (value < min) onChange?.(min);
                       else if (value > max) onChange?.(max);
                   }}

                   inputRef={inputRef}

                   {...rest}
            />
        </>
    );
};

export default EditorFormInputNumber;