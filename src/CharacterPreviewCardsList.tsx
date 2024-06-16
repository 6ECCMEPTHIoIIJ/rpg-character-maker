import Character from "./Character";
import {FC, useEffect, useRef, useState} from "react";
import {CharacterPreviewActions, CharacterPreviewActionsProps,} from "./CharacterPreviewActions";
import Box, {BoxProps} from "@mui/material/Box";
import {CharacterPreviewCard} from "./CharacterPreviewCard";
import AddCharacterButton, {AddCharacterButtonProps,} from "./AddCharacterButton";

export type CharacterPreviewCardsListProps = BoxProps &
    Pick<
        CharacterPreviewActionsProps,
        "onEdit" | "onDelete" | "onDuplicate" | "onExport"
    > &
    Pick<AddCharacterButtonProps, "onAdd" | "onImport"> & {
    characters: Character[];
};

export const CharacterPreviewCardsList: FC<CharacterPreviewCardsListProps> = ({
                                                                                  characters,
                                                                                  onEdit,
                                                                                  onDelete,
                                                                                  onDuplicate,
                                                                                  onExport,
                                                                                  onAdd,
                                                                                  onImport,
                                                                                  sx,
                                                                                  ...rest
                                                                              }) => {
    const lastCardRef = useRef<HTMLDivElement>(null);
    const [lastCardHeight, setLastCardHeight] = useState<number | undefined>(
        undefined
    );

    useEffect(() => {
        if (lastCardRef.current) {
            setLastCardHeight(lastCardRef.current.clientHeight);
        }
    }, [characters]);

    return (
        <Box
            {...rest}
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="start"
            gap={4}
            sx={{...sx, width: "100%"}}
        >
            {characters.map((character, i) => (
                <Box key={i} display="flex" flexDirection="column" gap={2}>
                    <CharacterPreviewCard
                        character={character}
                        sx={{width: "280px", height: lastCardHeight, minHeight: "450px"}}
                        ref={lastCardRef}
                    />
                    <CharacterPreviewActions
                        index={i}
                        onEdit={onEdit}
                        onExport={onExport}
                        onDuplicate={onDuplicate}
                        onDelete={onDelete}
                    />
                </Box>
            ))}
            <AddCharacterButton
                sx={{width: "280px", height: lastCardHeight, minHeight: "450px"}}
                onAdd={onAdd}
                onImport={onImport}
            />
        </Box>
    );
};

export default CharacterPreviewCardsList;
