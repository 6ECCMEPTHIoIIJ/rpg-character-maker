import {create} from "zustand";
import {Character, CharacterBaseStatName, CharacterSkillName} from "./Character.ts";
import getEntries from "./getEntries.ts";

export type EditableCharacter = {
    name: string;
    stats: {
        [key in CharacterBaseStatName]: number;
    };
    skills: {
        [key in CharacterSkillName]: number;
    };
    character: Character | undefined;
    statPoints: number;
    skillPoints: number;
    setCharacter: (character: Character) => void;
    getStats: () => [CharacterBaseStatName, number][];
    getSkills: () => [CharacterSkillName, number][];
    getStatPoints: () => number;
    getSkillPoints: () => number;
    updateName: (name: string) => void;
    updateStat: (stat: CharacterBaseStatName, value: number) => void;
    updateSkill: (skill: CharacterSkillName, value: number) => void;
};

export const useEditableCharacter = create<EditableCharacter>(
    (set, get) => ({
        name: "",
        stats: {...Character.zeroBaseStats},
        skills: {...Character.zeroSkills},
        character: undefined,
        statPoints: 0,
        skillPoints: 0,
        setCharacter: (character) => set({character}),
        getStats: () => getEntries(get().stats),
        getSkills: () => getEntries(get().skills),
        getStatPoints: () => {
            return get().getStats().reduce((sum, [, value]) => sum + value, 0);
        },
        getSkillPoints: () => {
            return get().getSkills().reduce((sum, [, value]) => sum + value, 0);
        },
        updateName: (name) => set((state) => {
            if (state.character) {
                state.character.name = name;
            }
            return {name};
        }),
        updateStat: (stat, value) => set((state) => {
            const usedStatPoints = state.statPoints - state.stats[stat];
            const pointsLeft = Character.totalStatPoints - usedStatPoints;
            const pointsAdded = Math.min(pointsLeft, value);
            let skillPoints = state.skillPoints;
            Character.baseStatsSkills[stat].forEach((skill) => {
                const diff = Math.max(0, state.skills[skill] - pointsAdded);
                skillPoints -= diff;
                state.skills[skill] -= diff;
            });

            if (state.character) {
                state.character.baseStats = {
                    ...state.stats,
                    [stat]: pointsAdded,
                };
                state.character.skills = {...state.skills};
            }
            return {
                stats: {
                    ...state.stats,
                    [stat]: pointsAdded,
                },
                statPoints: usedStatPoints + pointsAdded,
                skills: {...state.skills},
                skillPoints,
            }
        }),
        updateSkill: (skill, value) => set((state) => {
            const usedSkillPoints = state.skillPoints - state.skills[skill];
            const pointsLeft = Character.totalSkillPoints - usedSkillPoints;
            const pointsAdded = Math.min(pointsLeft, state.stats[Character.skillsBaseStats[skill]], value);

            if (state.character) {
                state.character.skills = {
                    ...state.skills,
                    [skill]: pointsAdded,
                };
            }
            return {
                skills: {
                    ...state.skills,
                    [skill]: pointsAdded,
                },
                skillPoints: usedSkillPoints + pointsAdded,
            }
        }),
    })
);

export default useEditableCharacter;
