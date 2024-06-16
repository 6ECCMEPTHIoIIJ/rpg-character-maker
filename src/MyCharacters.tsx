import { FC } from "react";
import RpgCharacterMakerAppBar from "./RpgCharacterMakerAppBar";
import CharacterPreviewCardsList from "./CharacterPreviewCardsList";
import Container from "@mui/material/Container";

export const MyCharacters: FC = () => {
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
            characters={[]}
        />
      </Container>
    </>
  );
};

export default MyCharacters;
