import { forwardRef, useCallback, useState } from "react";
import Character from "./Character";
import CharacterPreviewImage from "./CharacterPreviewImage";
import CharacterPreviewBaseStatsList from "./CharacterPreviewListBaseStats";
import CharacterPreviewDerivedStatsList from "./CharacterPreviewDerivedStatsList";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import capitalize from "@mui/material/utils/capitalize";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export type CharacterPreviewCardProps = CardProps & {
  character: Character;
};

export const CharacterPreviewCard = forwardRef<
  HTMLDivElement,
  CharacterPreviewCardProps
>(({ character, sx, ...rest }, ref) => {
  const baseStats = character.getBaseStats();
  const derivedStats = character.getDerivedStats();
  const clazz = character.getClass(character.getMainStat());

  const [reversed, setReversed] = useState(false);

  const handleClick = useCallback(() => {
    setReversed((к) => !к);
  }, []);

  return (
    <Card
      {...rest}
      ref={ref}
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.5s, filter 0.5s, zIndex 0.5s",
        "&:hover": {
          transform:
            "scale(1.05) perspective(400px) rotate3D(1, 1, 0, -10deg) translate(5px, -20px)",
          filter: "drop-shadow(-5px 20px 0.1rem rgba(0, 0, 0, 0.3))",
          zIndex: 1,
        },
      }}
    >
      <CardActionArea title="Click to toggle details" onClick={handleClick}>
        <Collapse in={!reversed}>
          <CharacterPreviewImage clazz={clazz} />
        </Collapse>
        <Collapse in={reversed}>
          <CharacterPreviewBaseStatsList stats={baseStats} />
        </Collapse>
        <Divider />
        <CharacterPreviewDerivedStatsList stats={derivedStats} />
        <Divider />
      </CardActionArea>

      <Box>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "start",
          }}
        >
          <Box sx={{ maxWidth: "70%" }}>
            <Typography
              component="div"
              variant="h5"
              title={character.name}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {character.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: Character.classColors[clazz] }}
            >
              {capitalize(clazz)}
            </Typography>
          </Box>

          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleClick}
            title="Click to toggle details"
          >
            <KeyboardArrowUp
              style={{
                transform: `rotate(${reversed ? 180 : 0}deg)`,
              }}
              sx={{
                transition: "transform 0.2s",
              }}
            />
          </IconButton>
        </CardContent>
      </Box>
    </Card>
  );
});
