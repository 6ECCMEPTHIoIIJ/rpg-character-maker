import {forwardRef, useCallback, useEffect, useState} from "react";
import Character from "./Character";
import CharacterPreviewImage from "./CharacterPreviewImage";
import CharacterPreviewBaseStatsList from "./CharacterPreviewListBaseStats";
import CharacterPreviewDerivedStatsList from "./CharacterPreviewDerivedStatsList";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import capitalize from "@mui/material/utils/capitalize";
import Card, {CardProps} from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import EditorFormGridContainer from "./editor/EditorFormGridContainer.tsx";
import EditorFormGrid from "./editor/EditorFormGrid.ts";

export type CharacterPreviewCardProps = CardProps & {
    character: Character;
    editing?: boolean;
};

export const CharacterPreviewCard = forwardRef<
        HTMLDivElement,
        CharacterPreviewCardProps
    >(({character, editing, sx, ...rest}, ref
        ) => {
            const [inBattle, setInBattle] = useState(false);
            const baseStats = character.getBaseStats();
            const derivedStats = character.getDerivedStats();
            const maxHealth = Character.derivedStats.health(character.baseStats);
            const [currentHealth, setCurrentHealth] = useState(maxHealth);
            const clazz = character.getClass(character.getMainStat());

            const [reversed, setReversed] = useState(false);

            const handleClick = useCallback(() => {
                setReversed((r) => !r);
            }, []);

            useEffect(() => {
                if (editing) {
                    setInBattle(false);
                }
            }, [editing]);

            return (
                <>
                    <Card
                        {...rest}
                        ref={ref}
                        sx={{
                            ...sx,
                            width: "300px",
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
                        <Box sx={{
                            position: "relative"
                        }}>
                            {!inBattle && <Button variant="contained"
                                                  onClick={() => {
                                                      setInBattle(true);
                                                      setCurrentHealth(maxHealth);
                                                  }}
                                                  sx={{
                                                      fontSize: 40,
                                                      position: "absolute",
                                                      top: "0",
                                                      left: "0",
                                                      bottom: "0",
                                                      right: 0,
                                                      zIndex: 1000,
                                                      opacity: 0,
                                                      transition: "opacity 0.5s",
                                                      "&:hover": {
                                                          opacity: 0.8
                                                      },
                                                  }}>Battle</Button>}
                            {inBattle && <Button variant="contained" color="error"
                                                 onClick={
                                                     () => {
                                                         const damaged = currentHealth - 1;
                                                         setCurrentHealth(damaged);
                                                         if (damaged <= 0) {
                                                             setInBattle(false);
                                                             setCurrentHealth(damaged);
                                                         }
                                                     }
                                                 }
                                                 sx={{
                                                     fontSize: 40,
                                                     position: "absolute",
                                                     top: "0",
                                                     left: "0",
                                                     bottom: "0",
                                                     right: 0,
                                                     zIndex: 1000,
                                                     opacity: 0,
                                                     transition: "opacity 0.5s",
                                                     "&:hover": {
                                                         opacity: 0.8
                                                     },
                                                 }}>Take damage</Button>}
                            <Collapse in={!reversed}>
                                <CharacterPreviewImage clazz={clazz}/>
                            </Collapse>
                            <Collapse in={reversed}>
                                <CharacterPreviewBaseStatsList stats={baseStats}/>
                            </Collapse>
                            <Divider/>
                            <CharacterPreviewDerivedStatsList stats={derivedStats}/>
                            <Divider/>
                        </Box>
                        <Box>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    alignItems: "start",
                                }}
                            >
                                <Box sx={{maxWidth: "70%"}}>
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
                                        sx={{color: Character.classColors[clazz]}}
                                    >
                                        {capitalize(clazz)}
                                    </Typography>
                                </Box>

                                <IconButton
                                    sx={{marginLeft: "auto"}}
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
                    <Collapse in={inBattle}>
                        <EditorFormGridContainer spacing={2} paddingLeft="30px">
                            <EditorFormGrid xs={8}>
                                <LinearProgress
                                    variant="determinate"
                                    value={currentHealth / maxHealth * 100}
                                    sx={{
                                        height: "30px",
                                        margin: "auto",
                                        backgroundColor: Character.derivedStatsColors.health.secondary,
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: Character.derivedStatsColors.health.primary,
                                        },
                                    }}
                                />
                            </EditorFormGrid>
                            <EditorFormGrid xs={4}>
                                <Typography>
                                    {currentHealth} / {maxHealth}
                                </Typography>
                            </EditorFormGrid>
                        </EditorFormGridContainer>
                    </Collapse>
                </>
            );
        }
    )
;
