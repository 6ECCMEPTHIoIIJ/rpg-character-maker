import {css, styled} from "@mui/material";
import Slider from "@mui/material/Slider";

const sliderElement = css`
    height: 20px;
    border-radius: 3px;
`;

export const EditorWideSlider = styled(Slider)`
    .MuiSlider-rail {
        ${sliderElement};
    }

    .MuiSlider-track {
        ${sliderElement};
        display: inline-block;
        border-style: none;
    }

    .MuiSlider-thumb {
        ${sliderElement};
        width: 7px;
        color: white;
    }

    .MuiSlider-mark {
        height: 10px;
    }

    transition: width 0.2s, margin-right 0.2s;
`;

export default EditorWideSlider;

