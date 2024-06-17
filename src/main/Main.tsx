import Dialog from "@mui/material/Dialog";
import Editor from "../editor/Editor.tsx";
import Character, {CharacterProps} from "../Character.ts";
import {FC, useCallback, useEffect, useState} from "react";
import useCharactersStore from "../useCharactersStore.tsx";
import CharacterPreviewCardsList from "../CharacterPreviewCardsList.tsx";
import Container from "@mui/material/Container";
import RpgCharacterMakerAppBar from "../RpgCharacterMakerAppBar.tsx";

export const Main: FC = () => {
    const {characters, addCharacter, updateCharacter, removeCharacter, setCharacters} = useCharactersStore();
    const [editingCharacterIndex, setEditingCharacterIndex] = useState<number | undefined>();

    const handleSave = useCallback((character: Character) => {
        if (editingCharacterIndex === undefined) {
            throw new Error("No character to edit");
        }

        updateCharacter(editingCharacterIndex, character);
        setEditingCharacterIndex(undefined);
    }, [editingCharacterIndex, updateCharacter]);

    const handleCancel = useCallback(() => {
        setEditingCharacterIndex(undefined);
    }, []);

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

    useEffect(() => {
        const savedCharacters = localStorage.getItem("characters");
        if (savedCharacters) {
            const characters = (JSON.parse(savedCharacters) as CharacterProps[]).map((props) => new Character(props))
            console.log(characters);
            setCharacters(characters);

            const savedEditingIndex = localStorage.getItem("editingIndex");
            if (savedEditingIndex) {
                const index = parseInt(savedEditingIndex);
                if (index >= 0 && index < characters.length) {
                    setEditingCharacterIndex(index);
                } else {
                    localStorage.removeItem("editingIndex");
                }
            }
        }
    }, [setCharacters]);

    useEffect(() => {
        if (characters.length !== 0) {
            localStorage.setItem("characters", JSON.stringify(characters));
        }
    }, [characters]);

    useEffect(() => {
        if (editingCharacterIndex !== undefined) {
            localStorage.setItem("editingIndex", editingCharacterIndex.toString());
        } else {
            localStorage.removeItem("editingIndex");
        }
    }, [editingCharacterIndex]);

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
                    onEdit={setEditingCharacterIndex}
                    onDuplicate={handleDuplicateCharacter}
                    onExport={handleExportCharacter}
                    onImport={handleImportCharacter}
                />
                <Dialog maxWidth="xl" open={editingCharacterIndex !== undefined}>
                    {editingCharacterIndex !== undefined && (
                        <Editor character={characters[editingCharacterIndex]} onSave={handleSave}
                                onCancel={handleCancel}/>
                    )}
                </Dialog>
            </Container>
        </>
    )
};