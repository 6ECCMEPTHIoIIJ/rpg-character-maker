import CardMedia, {CardMediaProps} from "@mui/material/CardMedia";
import Character, {CharacterClassName} from "./Character";
import {forwardRef} from "react";
import capitalize from "@mui/material/utils/capitalize";

export type CharacterPreviewImageProps = CardMediaProps & {
    clazz: CharacterClassName;
};

export const CharacterPreviewImage = forwardRef<
    HTMLImageElement,
    CharacterPreviewImageProps
>(({clazz}, ref) => {
    return (
        <CardMedia
            ref={ref}
            component="img"
            image={`${Character.classImages[clazz]}`}
            alt={`${capitalize(clazz)} class`}
            sx={{
                filter: "brightness(0.9) contrast(0.9) saturate(1.2)",
                objectPosition: "top",
                aspectRatio: "5/4",
            }}
        />
    );
});

export default CharacterPreviewImage;
