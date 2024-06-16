import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import ButtonGroup, { ButtonGroupProps } from "@mui/material/ButtonGroup";
import { FC, useCallback } from "react";
import Add from "@mui/icons-material/Add";
import Upload from "@mui/icons-material/Upload";

type CharacterButtonProps = ButtonProps;

const CharacterButton: FC<CharacterButtonProps> = ({
  sx,
  children,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      variant="outlined"
      title="Click to upload existing character from disk"
      sx={{
        ...sx,
        flexGrow: 1,
        transition: "flex-grow 0.5s",
        "&:hover": {
          flexGrow: 4,
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {children}
      </Box>
    </Button>
  );
};

export type AddCharacterButtonProps = ButtonGroupProps & {
  onAdd?: () => void;
  onImport?: () => void;
};

export const AddCharacterButton: FC<AddCharacterButtonProps> = ({
  onAdd,
  onImport,
  sx,
  ...rest
}) => {
  const handleAdd = useCallback(() => {
    onAdd?.();
  }, [onAdd]);

  const handleImport = useCallback(() => {
    onImport?.();
  }, [onImport]);

  return (
    <ButtonGroup
      {...rest}
      orientation="vertical"
      sx={{
        ...sx,
        display: "flex",
      }}
    >
      <CharacterButton onClick={handleAdd}>
        <Add sx={{ width: "50px", height: "auto" }} />
        Create new character
      </CharacterButton>
      <CharacterButton onClick={handleImport}>
        <Upload sx={{ width: "50px", height: "auto" }} />
        Upload existing character from disk
      </CharacterButton>
    </ButtonGroup>
  );
};

export default AddCharacterButton;
