import Character, {CharacterBaseStatName} from "./Character";
import {FC, forwardRef, useCallback, useMemo} from "react";
import List, {ListProps} from "@mui/material/List";
import ListItem, {ListItemProps} from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import capitalize from "@mui/material/utils/capitalize";
import Hardware from "@mui/icons-material/Hardware";
import Accessibility from "@mui/icons-material/Accessibility";
import Psychology from "@mui/icons-material/Psychology";
import Speed from "@mui/icons-material/Speed";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconProps, SvgIconTypeMap} from "@mui/material/SvgIcon";

export type CharacterPreviewBaseStatListItemProps = ListItemProps & {
    stat: CharacterBaseStatName;
    value: number;
};

export const CharacterPreviewBaseStatListItem: FC<
    CharacterPreviewBaseStatListItemProps
> = ({stat, value, ...rest}) => {
    const icons = useMemo(() => {
        return new Map([
            ["strength", Hardware],
            ["agility", Speed],
            ["intelligence", Psychology],
            ["charisma", Accessibility],
        ]);
    }, []);
    const selectIcon = useCallback(
        (stat: CharacterBaseStatName) => {
            const Icon = icons.get(stat) as OverridableComponent<SvgIconTypeMap>;
            return (props: SvgIconProps) => <Icon {...props} />;
        },
        [icons]
    );

    const progress = (value / Character.maxBaseStats[stat]) * 100;
    return (
        <ListItem {...rest}>
            <Grid2 container columns={9} columnSpacing={2} sx={{width: "100%"}}>
                <Grid2 xs={1} alignContent="center">
                    {selectIcon(stat)({
                        sx: {
                            color:
                                value >= Character.maxSkillLevel
                                    ? Character.baseStatsColors[stat].primary
                                    : "black",
                        },
                    })}
                </Grid2>
                <Grid2 xs={4} alignContent="center">
                    <ListItemText primary={capitalize(stat)}/>
                </Grid2>
                <Grid2 xs={3} alignContent="center">
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            backgroundColor: Character.baseStatsColors[stat].secondary,
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: Character.baseStatsColors[stat].primary,
                            },
                        }}
                    />
                </Grid2>
                <Grid2 xs={1} alignContent="center">
                    <ListItemText primary={value} sx={{marginLeft: "auto"}}/>
                </Grid2>
            </Grid2>
        </ListItem>
    );
};

export type CharacterPreviewBaseStatsListProps = ListProps & {
    stats: [CharacterBaseStatName, number][];
};

export const CharacterPreviewBaseStatsList = forwardRef<
    HTMLUListElement,
    CharacterPreviewBaseStatsListProps
>(({stats, ...rest}, ref) => {
    return (
        <List {...rest} ref={ref}>
            {stats.map(([stat, value], index) => (
                <CharacterPreviewBaseStatListItem
                    key={index}
                    stat={stat}
                    value={value}
                />
            ))}
        </List>
    );
});

export default CharacterPreviewBaseStatsList;
