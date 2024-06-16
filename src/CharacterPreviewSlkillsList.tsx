import Character, { CharacterDerivedStatName } from "./Character";
import { FC } from "react";
import List, { ListProps } from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import capitalize from "@mui/material/utils/capitalize";
import Air from "@mui/icons-material/Air";
import ElectricBolt from "@mui/icons-material/ElectricBolt";
import Favorite from "@mui/icons-material/Favorite";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material";

export type CharacterPreviewDerivedStatListItemProps = ListItemProps & {
  stat: CharacterDerivedStatName;
  value: number;
};

export const CharacterPreviewDerivedStatListItem: FC<
  CharacterPreviewDerivedStatListItemProps
> = ({ stat, value, ...rest }) => {
  const progress = (value / Character.maxDerivedStats[stat]) * 100;

  const icons = new Map([
    ["health", Favorite],
    ["dodge", Air],
    ["energy", ElectricBolt],
  ]);
  const selectIcon = (stat: CharacterDerivedStatName) => {
    const Icon = icons.get(stat) as OverridableComponent<SvgIconTypeMap>;
    return (props: SvgIconProps) => <Icon {...props} />;
  };

  return (
    <ListItem {...rest}>
      <Grid2 container columns={9} columnSpacing={2} sx={{ width: "100%" }}>
        <Grid2 xs={1} alignContent="center">
          {selectIcon(stat)({
            sx: {
              color: Character.derivedStatsColors[stat].primary,
            },
          })}
        </Grid2>
        <Grid2 xs={4} alignContent="center">
          <ListItemText primary={capitalize(stat)} />
        </Grid2>
        <Grid2 xs={3} alignContent="center">
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: Character.derivedStatsColors[stat].secondary,
              "& .MuiLinearProgress-bar": {
                backgroundColor: Character.derivedStatsColors[stat].primary,
              },
            }}
          />
        </Grid2>
        <Grid2 xs={1} alignContent="center">
          <ListItemText primary={value} sx={{ marginLeft: "auto" }} />
        </Grid2>
      </Grid2>
    </ListItem>
  );
};

export type CharacterPreviewDerivedStatsListProps = ListProps & {
  stats: [CharacterDerivedStatName, number][];
};

export const CharacterPreviewDerivedStatsList: FC<
  CharacterPreviewDerivedStatsListProps
> = ({ stats, ...rest }) => {
  return (
    <List {...rest}>
      {stats.map(([stat, value], index) => (
        <CharacterPreviewDerivedStatListItem
          key={index}
          stat={stat}
          value={value}
        />
      ))}
    </List>
  );
};

export default CharacterPreviewDerivedStatsList;
