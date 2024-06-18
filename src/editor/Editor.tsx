import {Character} from "../Character.ts";
import {FC, useMemo, useState} from "react";
import EditorForm from "./EditorForm.ts";
import EditorFormHeader from "./EditorFormHeader.ts";
import Divider from "@mui/material/Divider";
import EditorFormContent from "./EditorFormContent.ts";
import Stack from "@mui/material/Stack";
import EditorFormGridContainer from "./EditorFormGridContainer.tsx";
import EditorFormGrid from "./EditorFormGrid.ts";
import FlexBox from "../FlexBox.ts";
import EditorFormActions from "./EditorFormActions.ts";
import Button from "@mui/material/Button";
import EditorFormSliderMaster from "./EditorFormSliderMaster.tsx";
import getEntries from "../getEntries.ts";
import {Controller, useForm} from "react-hook-form";
import EditorFormSliderSlave from "./EditorFormSliderSlave.tsx";
import EditorFormInputText from "./EditorFormInputText.tsx";

export type EditorProps = {
    character: Character,
    onSave?: (character: Character) => void,
    onCancel?: () => void,
}

export const Editor: FC<EditorProps> = ({
                                            character: {
                                                name: characterName,
                                                baseStats: characterStats,
                                                skills: characterSkills
                                            },
                                            onSave,
                                            onCancel
                                        }) => {
    const defaultUsedStatsPoints = useMemo(() => getEntries(characterStats).reduce((acc, [, value]) => acc + value, 0), [characterStats]);
    const defaultUsedSkillPoints = useMemo(() => getEntries(characterSkills).reduce((acc, [, value]) => acc + value, 0), [characterSkills]);
    const [usedStatsPoints, setUsedStatsPoints] = useState(defaultUsedStatsPoints);
    const [usedSkillPoints, setUsedSkillPoints] = useState(defaultUsedSkillPoints);
    const {control, watch, setValue} = useForm({
        defaultValues: {
            name: characterName,
            stats: characterStats,
            skills: characterSkills,
        }
    });


    const name = watch("name");
    const stats = watch("stats");
    const skills = watch("skills");

    const handleRevert = () => {
        setValue("name", characterName);
        setValue("stats", characterStats);
        setValue("skills", characterSkills);
        setUsedStatsPoints(defaultUsedStatsPoints);
        setUsedSkillPoints(defaultUsedSkillPoints);
    }

    const handleSave = () => {
        onSave?.(new Character({name, stats, skills}));
    }

    return (
        <FlexBox justifyContent="center" alignItems="center">
            <EditorForm>
                <EditorFormHeader title="Edit Character">
                </EditorFormHeader>
                <Divider/>
                <EditorFormContent>
                    <Stack direction="column" spacing={3}>
                        <Controller name={`name`} control={control} render={({field: {onChange, value}}) => (
                            <EditorFormInputText value={value} onChange={onChange}/>
                        )}/>
                        {getEntries(stats).map(([stat, statValue], i) => (
                            <EditorFormGridContainer key={i} columns={{xs: 4, sm: 12}}>
                                <EditorFormGrid xs={3} minWidth="max-content">
                                    <Controller
                                        name={`stats.${stat}`}
                                        control={control}
                                        render={({field: {onChange}}) => (
                                            <EditorFormSliderMaster
                                                max={Character.totalStatPoints - usedStatsPoints + statValue}
                                                potential={Character.maxBaseStats[stat]}
                                                label={stat}
                                                value={statValue}
                                                color={Character.baseStatsColors[stat].primary}
                                                onChange={(value) => {
                                                    onChange(value);
                                                    setUsedStatsPoints(usedStatsPoints + value - statValue);
                                                    const skillsEntries = getEntries(skills);
                                                    setValue("skills", skillsEntries.reduce((acc, [skill, skillValue]) => {
                                                        acc[skill] = stat === Character.skillsBaseStats[skill] ? Math.min(value, skillValue) : skillValue;
                                                        return acc;
                                                    }, {...Character.zeroSkills}));
                                                    setUsedSkillPoints(skillsEntries.reduce((acc, [, skillValue]) => acc + skillValue, 0));
                                                }}/>
                                        )}/>
                                </EditorFormGrid>
                                <EditorFormGrid xs={9}>
                                    <FlexBox gap={3}>
                                        {getEntries(skills).filter(([skill]) => stat === Character.skillsBaseStats[skill]).map(([skill, skillValue], i) => {
                                            return (
                                                <Controller
                                                    key={i}
                                                    name={`skills.${skill}`}
                                                    control={control}
                                                    render={({field}) => (
                                                        <EditorFormSliderSlave
                                                            max={Character.totalSkillPoints - usedSkillPoints + skillValue}
                                                            potential={Character.maxSkillLevel}
                                                            masterValue={statValue}
                                                            label={skill}
                                                            value={skillValue}
                                                            color={Character.skillsColors[skill].primary}
                                                            onChange={(value) => {
                                                                field.onChange(value);
                                                                setUsedSkillPoints(usedSkillPoints + value - skillValue);
                                                            }}/>
                                                    )}/>
                                            )
                                        })}
                                    </FlexBox>
                                </EditorFormGrid>
                            </EditorFormGridContainer>
                        ))}
                    </Stack>
                </EditorFormContent>
                <Divider/>
                <EditorFormActions>
                    <Button onClick={handleSave}>
                        Save changes
                    </Button>
                    <Button onClick={handleRevert}>
                        Revert changes
                    </Button>
                    <Button color="error" onClick={onCancel}>
                        Cancel
                    </Button>
                </EditorFormActions>
            </EditorForm>
        </FlexBox>
    );
};
export default Editor;