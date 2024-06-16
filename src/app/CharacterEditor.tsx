import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { Character } from "./Character";
import Container, { ContainerProps } from "@mui/material/Container";
import Card from "@mui/material/Card";
import {
  Button,
  ButtonGroup,
  FormGroup,
  Input,
  List,
  ListItem,
  ListItemButton,
  Slider,
  Stack,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { CharacterCard } from "./CharacterCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Add } from "@mui/icons-material";

export type CharacterEditorProps = ContainerProps & {
  character: Character;
};

export const CharacterEditor: FC<CharacterEditorProps> = ({
  character: initialCharacter,
  ...rest
}) => {
  const [character, setCharacter] = useState(initialCharacter);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter(new Character(event.target.value, character.stats));
  };

  return (
    <Container {...rest}>
      <Grid
        container
        spacing={8}
        alignItems="center"
        columns={{ xs: 1, sm: 5, md: 12 }}
      >
        <CharacterCard
          character={character}
          xs={1}
          sm={2}
          md={4}
          justifyItems="center"
          alignItems="stretch"
          sx={{ width: "350px" }}
        />
        <Grid xs={1} sm={3} md={8}>
          <Card>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              padding="60px"
            >
              <TextField
                label="Name"
                inputProps={{ maxLength: 27 }}
                value={character.name}
                variant="outlined"
                onChange={handleNameChange}
                fullWidth
                sx={{ margin: "20px" }}
              />
              <List>
                {Object.entries(character.stats).map(([stat, value], index) => (
                  <ListItem key={index}>
                    <Box sx={{ width: 250 }}>
                      <Typography gutterBottom>{stat}</Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid xs>
                          <Slider
                            value={value ?? 0}
                            onChange={(_, newValue) => {
                              setCharacter(
                                new Character(character.name, {
                                  ...character.stats,
                                  [stat]: newValue,
                                })
                              );
                            }}
                            step={5}
                            marks
                            aria-labelledby="input-slider"
                          />
                        </Grid>
                        <Grid>
                          <Input
                            value={value}
                            size="small"
                            onChange={(event) => {
                              const newValue = parseInt(event.target.value);
                              setCharacter(
                                new Character(character.name, {
                                  ...character.stats,
                                  [stat]: newValue,
                                })
                              );
                            }}
                            onBlur={() => {
                              if (value < 0) {
                                setCharacter(
                                  new Character(character.name, {
                                    ...character.stats,
                                    [stat]: 0,
                                  })
                                );
                              } else if (value > 100) {
                                setCharacter(
                                  new Character(character.name, {
                                    ...character.stats,
                                    [stat]: 100,
                                  })
                                );
                              }
                            }}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: "number",
                              "aria-labelledby": "input-slider",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
