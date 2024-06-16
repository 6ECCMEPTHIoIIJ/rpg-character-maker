import { FC, useCallback, useEffect } from "react";
import RpgCharacterMakerAppBar from "./RpgCharacterMakerAppBar";
import CharacterPreviewCardsList from "./CharacterPreviewCardsList";
import Container from "@mui/material/Container";
import useCharactersStore from "./useCharactersStore";

export const MyCharacters: FC = () => {
  const { characters, addCharacter, removeCharacter } = useCharactersStore();

  const handleDuplicateCharacter = useCallback(
    (index: number) => {
      const character = characters[index];
      addCharacter(character);
    },
    [addCharacter, characters]
  );

  const handleExportCharacter = useCallback((index: number) => {
    const character = characters[index];
    const characterJson = JSON.stringify(character);
    const blob = new Blob([characterJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.name}.json`;
    a.click();
  }, [characters]);

  return (
    <>
      <RpgCharacterMakerAppBar />
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
          onDuplicate={handleDuplicateCharacter}
          onExport={handleExportCharacter}
        />
      </Container>
    </>
  );
};

export default MyCharacters;
