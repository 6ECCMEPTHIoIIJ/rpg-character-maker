import Card from "@mui/material/Card";
import Character from "./Character.ts";
import {FC, useCallback, useEffect, useState} from "react";
import CardContent from "@mui/material/CardContent";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Slider from "@mui/material/Slider";
import useEditableCharacter from "./useEditableCharacter.ts";
import Input from "@mui/material/Input";
import {CardActions, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Cancel, Save, Undo} from "@mui/icons-material";
import ButtonGroup from "@mui/material/ButtonGroup";
import capitalize from "@mui/material/utils/capitalize";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box, {BoxProps} from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {CharacterPreviewCard} from "./CharacterPreviewCard.tsx";

export type CharacterEditorProps = BoxProps & {
    character: Character;
    onSave?: (character: Character) => void;
}

export const CharacterEditor: FC<CharacterEditorProps> = ({onSave, character, ...rest}) => {
    const {
        name,
        stats,
        setCharacter,
        getStats,
        getSkills,
        updateName,
        updateStat,
        updateSkill
    } = useEditableCharacter();
    const [previewCharacter,] = useState<Character>(new Character({
        name: character.name,
        stats: {...character.baseStats},
        skills: {...character.skills},
    }));

    const restore = useCallback(() => {
        previewCharacter.name = character.name;
        previewCharacter.baseStats = {...character.baseStats};
        previewCharacter.skills = {...character.skills};
        setCharacter(previewCharacter);
        updateName(character.name);
        character.getBaseStats().forEach(([stat, value]) => {
            updateStat(stat, value);
        });
        character.getSkills().forEach(([skill, value]) => {
            updateSkill(skill, value);
        });
    }, [character, setCharacter, updateName, updateSkill, updateStat]);

    useEffect(() => {
        restore();
    }, [restore]);


    return (
        <Box  {...rest} display="flex" alignItems="center" gap={3}>
            <CharacterPreviewCard character={previewCharacter} sx={{width: "300px"}}/>
            <Card>
                <CardActions sx={{justifyContent: "end", padding: 0}}>
                    <ButtonGroup>
                        <Button sx={{borderTopLeftRadius: 0}} onClick={() => onSave?.(previewCharacter)}>
                            <Save/>
                        </Button>
                        <Button onClick={() => restore()}>
                            <Undo/>
                        </Button>
                        <Button color="error" sx={{borderBottomRightRadius: 0}}>
                            <Cancel color="error"/>
                        </Button>
                    </ButtonGroup>
                </CardActions>
                <CardContent sx={{paddingLeft: "40px"}}>
                    <TextField variant="standard" value={name} onChange={(event) => {
                        updateName(event.target.value);
                    }}
                               inputProps={{
                                   maxLength: 20,
                               }}
                               sx={{
                                   width: "100%",
                                   minWidth: "200px",
                                   maxWidth: "400px",
                                   marginBottom: "30px",
                               }}/>
                    {getStats().map(([stat, value], i) => (
                        <>
                            <Box display="flex" key={i}>
                                <Box sx={{minWidth: "250px", paddingTop: "20px"}}>
                                    <Grid2 container spacing={2} sx={{width: "100%"}}>
                                        <Grid2 xs={5}>
                                            <ListItemText primary={capitalize(stat)}/>
                                        </Grid2>
                                        <Grid2 xs={5}>
                                            <Slider min={0} max={Character.maxBaseStats[stat]} marks={[
                                                {
                                                    value: Character.maxSkillLevel,
                                                }
                                            ]}
                                                    value={value}
                                                    onChange={(_, v) => {
                                                        updateStat(stat, v as number);
                                                    }}
                                                    sx={{
                                                        color: Character.baseStatsColors[stat].primary,
                                                        "& .MuiSlider-thumb": {
                                                            width: 0,
                                                        },
                                                        "& .MuiSlider-rail": {
                                                            backgroundColor: Character.baseStatsColors[stat].secondary,
                                                            height: "20px",
                                                            borderRadius: "3px",
                                                            borderColor: "black",
                                                        },
                                                        "& .MuiSlider-track": {
                                                            height: "20px",
                                                            borderRadius: "3px",
                                                        },
                                                    }}/>
                                        </Grid2>

                                        <Grid2 xs={2}>
                                            <Input
                                                size="small"
                                                value={value}
                                                onChange={(e) => {
                                                    const v = parseInt(e.target.value);
                                                    updateStat(stat, !v || isNaN(v) ? 0 : v);
                                                }}
                                                onBlur={() => {
                                                    if (value < 0) {
                                                        updateStat(stat, 0);
                                                    } else if (value > Character.maxBaseStats[stat]) {
                                                        updateStat(stat, Character.maxBaseStats[stat]);
                                                    }
                                                }}
                                                inputProps={{
                                                    min: 0,
                                                    max: Character.maxBaseStats[stat],
                                                    type: "number",
                                                }}
                                            />
                                        </Grid2>
                                    </Grid2>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem/>
                                <List sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 3,
                                    flexGrow: 3,
                                }}>
                                    {getSkills().filter(([skill,]) => Character.skillsBaseStats[skill] === stat).map(([skill, value], i) => (
                                        <ListItem key={i} sx={{maxWidth: "250px"}}>
                                            <Grid2 container spacing={2} sx={{width: "100%"}}>
                                                <Grid2 xs={6}>
                                                    <ListItemText primary={capitalize(skill)}
                                                                  secondary={Character.skillLevelsNames[value]}/>
                                                </Grid2>
                                                <Grid2 xs={6}>
                                                    <Slider
                                                        min={0}
                                                        max={Character.maxSkillLevel}
                                                        value={value}
                                                        onChange={(_, v) => {
                                                            updateSkill(skill, v as number);
                                                        }}
                                                        marks={[
                                                            {
                                                                value: Math.min(stats[Character.skillsBaseStats[skill]], Character.maxSkillLevel),
                                                                label: "|"
                                                            }
                                                        ]}
                                                        sx={{
                                                            color: Character.skillsColors[skill].primary,
                                                            "& .MuiSlider-markLabel": {
                                                                color: Character.skillsColors[skill].primary,
                                                            },
                                                            "& .MuiSlider-thumb": {
                                                                width: 0,
                                                            },
                                                            "& .MuiSlider-rail": {
                                                                backgroundColor: Character.skillsColors[skill].secondary,
                                                                height: "20px",
                                                                borderRadius: "3px",
                                                                borderColor: "black",
                                                            },
                                                            "& .MuiSlider-track": {
                                                                height: "20px",
                                                                borderRadius: "3px",
                                                            },
                                                        }}
                                                    />
                                                </Grid2>
                                            </Grid2>
                                        </ListItem>))}
                                </List>
                            </Box>
                        </>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
}