import {FC, useCallback, useState} from "react";
import RpgCharacterMakerAppBar from "./RpgCharacterMakerAppBar";
import Container from "@mui/material/Container";
import useCharactersStore from "./useCharactersStore";
import Character, {CharacterProps} from "./Character";
import {CharacterEditor} from "./CharacterEditor.tsx";
import CharacterPreviewCardsList from "./CharacterPreviewCardsList.tsx";

export const MyCharacters: FC = () => {
    const {characters, addCharacter, removeCharacter} = useCharactersStore();
    const [editingCharacter, setEditingCharacter] = useState<Character | undefined>();
    const handleDuplicateCharacter = useCallback(
        (index: number) => {
            const character = characters[index];
            addCharacter(character);
        },
        [addCharacter, characters]
    );

    const handleExportCharacter = useCallback(
        (index: number) => {
            const character = characters[index];
            const characterJson = JSON.stringify([character]);
            const blob = new Blob([characterJson], {type: "application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${character.name}.json`;
            a.click();
        },
        [characters]
    );

    const handleImportCharacter = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const characterJson = reader.result as string;
                const charactersProps = JSON.parse(characterJson) as CharacterProps[];
                charactersProps.forEach((characterProps) =>
                    addCharacter(new Character(characterProps))
                );
            };
            reader.readAsText(file);
        };
        input.click();
    }, [addCharacter]);

    return (
        <>
            <RpgCharacterMakerAppBar/>
            <Container
                sx={{
                    paddingTop: "40px",
                    paddingBottom: "40px",
                }}
            >
                <CharacterPreviewCardsList
                    characters={characters}
                    onAdd={addCharacter}
                    onDelete={removeCharacter}
                    onEdit={(i) => {
                        setEditingCharacter(characters[i])
                    }}
                    onDuplicate={handleDuplicateCharacter}
                    onExport={handleExportCharacter}
                    onImport={handleImportCharacter}
                />
            </Container>
            {!!editingCharacter && (
                <Container
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1800,
                        "&:before": {
                            content:  '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: -1,
                        }
                    }}
                >
                    <CharacterEditor character={editingCharacter} onSave={(c) => {
                        addCharacter(new Character(
                            {name: c.name, stats: {...c.baseStats}, skills: {...c.skills}}
                        ));
                        setEditingCharacter(undefined);
                    }}/>
                </Container>
            )}
        </>
    );
};

export default MyCharacters;
