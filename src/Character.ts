import getEntries from "./getEntries";

import warriorImg from "/warrior.jpg";
import rogueImg from "/rogue.jpg";
import mageImg from "/mage.jpg";
import lordImg from "/knight.jpg";
import nomadImg from "/nomad.jpg";

export type CharacterBaseStatName =
    | "strength"
    | "agility"
    | "intelligence"
    | "charisma";
export type CharacterBaseStats = {
    [key in CharacterBaseStatName]: number;
};

export type CharacterDerivedStatName = "health" | "dodge" | "energy";
export type CharacterDerivedStats = {
    [key in CharacterDerivedStatName]: (baseStats: CharacterBaseStats) => number;
};

export type CharacterClassName =
    | "warrior"
    | "mage"
    | "rogue"
    | "lord"
    | "nomad";

export type CharacterSkillName =
    | "attack"
    | "stealth"
    | "archery"
    | "learning"
    | "survival"
    | "medicine"
    | "intimidation"
    | "insight"
    | "appearance"
    | "manipulation";

export type CharacterSkills = {
    [key in CharacterSkillName]: number;
};

export type CharacterSkillLevelName =
    | "novice"
    | "beginner"
    | "apprentice"
    | "adept"
    | "expert"
    | "master";

export type CharacterProps = {
    name: string;
    stats: CharacterBaseStats;
    skills: CharacterSkills;
};

export class Character {
    static derivedStats: CharacterDerivedStats = {
        health: ({strength}) => 3 + strength,
        dodge: ({agility}) => 10 + agility,
        energy: ({agility, intelligence}) => agility + intelligence,
    };
    static maxSkillLevel = 5;
    static totalStatPoints = 15;
    static totalSkillPoints = 20;
    static zeroBaseStats: CharacterBaseStats = {
        strength: 0,
        agility: 0,
        intelligence: 0,
        charisma: 0,
    };
    static zeroSkills: CharacterSkills = {
        appearance: 0,
        archery: 0,
        attack: 0,
        intimidation: 0,
        insight: 0,
        learning: 0,
        manipulation: 0,
        medicine: 0,
        stealth: 0,
        survival: 0,
    }
    static maxBaseStats: CharacterBaseStats = {
        strength: 10,
        agility: 10,
        intelligence: 10,
        charisma: 5,
    };
    static maxDerivedStats: { [key in CharacterDerivedStatName]: number } = {
        health: Character.derivedStats.health({
            ...Character.zeroBaseStats,
            strength: Character.maxBaseStats.strength,
        }),
        dodge: Character.derivedStats.dodge({
            ...Character.zeroBaseStats,
            agility: Character.maxBaseStats.agility,
        }),
        energy: Character.derivedStats.energy({
            ...Character.zeroBaseStats,
            agility: Math.min(
                Character.maxBaseStats.agility,
                Character.totalStatPoints - Character.maxBaseStats.intelligence
            ),
            intelligence: Math.max(
                this.totalStatPoints - Character.maxBaseStats.agility,
                Character.maxBaseStats.intelligence
            ),
        }),
    };
    static classImages: { [key in CharacterClassName]: string } = {
        warrior: warriorImg,
        rogue: rogueImg,
        mage: mageImg,
        lord: lordImg,
        nomad: nomadImg,
    };
    static classColors: { [key in CharacterClassName]: string } = {
        warrior: "#eb2323",
        rogue: "#f0960e",
        mage: "#02d6d3",
        lord: "#b409e8",
        nomad: "#5f5f5f",
    };
    static baseStatsColors: {
        [key in CharacterBaseStatName]: { primary: string; secondary: string };
    } = {
        agility: {primary: "#f0960e", secondary: "#f2e3cb"},
        charisma: {primary: "#b409e8", secondary: "#f2d9fa"},
        intelligence: {primary: "#02d6d3", secondary: "#cef5f4"},
        strength: {primary: "#eb2323", secondary: "#f5d5d5"},
    };

    static baseStatsSkills: {
        [key in CharacterBaseStatName]: CharacterSkillName[];
    } = {
        agility: ["stealth", "archery"],
        charisma: ["intimidation", "insight", "manipulation", "appearance"],
        intelligence: ["learning", "medicine", "survival"],
        strength: ["attack"],
    }
    static derivedStatsColors: {
        [key in CharacterDerivedStatName]: { primary: string; secondary: string };
    } = {
        dodge: {primary: "#90cc41", secondary: "#dfedcc"},
        energy: {primary: "#2279bf", secondary: "#c0d9ed"},
        health: {primary: "#db1d6c", secondary: "#f0d1de"},
    };
    static skillsBaseStats: {
        [key in CharacterSkillName]: CharacterBaseStatName;
    } = {
        attack: "strength",
        archery: "agility",
        stealth: "agility",
        learning: "intelligence",
        medicine: "intelligence",
        survival: "intelligence",
        intimidation: "charisma",
        insight: "charisma",
        manipulation: "charisma",
        appearance: "charisma",
    };
    static skillLevelsNames: CharacterSkillLevelName[] = [
        "novice",
        "beginner",
        "apprentice",
        "adept",
        "expert",
        "master",
    ];
    static skillsColors: { [key in CharacterSkillName]: { primary: string; secondary: string } } = {
        appearance: {primary: "#9b8b2a", secondary: "#e0dcc2"},
        archery: {primary: "#2a9b8b", secondary: "#c2e0dc"},
        attack: {primary: "#8b2a9b", secondary: "#dcc2e0"},
        intimidation: {primary: "#ec351d", secondary: "#ffd2cc"},
        insight: {primary: "#ecaa1d", secondary: "#ffefcc"},
        learning: {primary: "#f118b1", secondary: "#ffccf0"},
        manipulation: {primary: "#18f1b1", secondary: "#ccfff0"},
        medicine: {primary: "#2f66dc", secondary: "#ccd9f0"},
        stealth: {primary: "#66dc2f", secondary: "#d9f0cc"},
        survival: {primary: "#dc2f66", secondary: "#f0ccd9"},
    };
    static baseStatsClasses: {
        [key in CharacterBaseStatName]: CharacterClassName;
    } = {
        agility: "rogue",
        charisma: "lord",
        intelligence: "mage",
        strength: "warrior",
    };
    name: string = "New Character";
    baseStats: CharacterBaseStats = {...Character.zeroBaseStats,};
    skills: CharacterSkills = {...Character.zeroSkills,};

    constructor(props: Partial<CharacterProps> = {}) {
        const {name, stats, skills} = props;
        if (name) {
            this.name = name.slice(0, 20) + (name.length > 20 ? "..." : "");
        }
        if (stats) {
            const entries = getEntries(stats);
            let pointsLeft = Character.totalStatPoints;
            entries.forEach(([stat, value]) => {
                this.baseStats[stat] = Math.min(
                    pointsLeft,
                    Character.maxBaseStats[stat],
                    Math.max(0, value)
                );
                pointsLeft -= this.baseStats[stat];
            });
        }
        if (skills) {
            const entries = getEntries(skills);
            let pointsLeft = Character.totalSkillPoints;
            entries.forEach(([skill, value]) => {
                this.skills[skill] = Math.min(
                    pointsLeft,
                    this.baseStats[Character.skillsBaseStats[skill]],
                    Character.maxSkillLevel,
                    Math.max(0, value)
                );
                pointsLeft -= this.skills[skill];
            });
        }
    }

    getBaseStats(): [CharacterBaseStatName, number][] {
        return getEntries(this.baseStats);
    }

    getDerivedStats(): [CharacterDerivedStatName, number][] {
        return getEntries(Character.derivedStats).map(([stat, fn]) => [
            stat,
            fn(this.baseStats),
        ]);
    }

    getSkills(): [CharacterSkillName, number][] {
        return getEntries(this.skills);
    }

    getMainStat(): CharacterBaseStatName {
        const entries = this.getBaseStats();
        return entries.reduce((maxStat, [stat, value]) => {
            return value > this.baseStats[maxStat] ? stat : maxStat;
        }, entries[0][0]);
    }

    getClass(mainStat: CharacterBaseStatName): CharacterClassName {
        if (this.baseStats[mainStat] < Character.maxSkillLevel) return "nomad";
        switch (mainStat) {
            case "strength":
                return "warrior";
            case "agility":
                return "rogue";
            case "intelligence":
                return "mage";
            case "charisma":
                return "lord";
        }
    }

    getSkillLevel(
        skill: CharacterSkillName
    ): CharacterSkillLevelName | undefined {
        return Character.skillLevelsNames[this.skills[skill]];
    }

    toJSON(): CharacterProps {
        return {
            name: this.name,
            stats: this.baseStats,
            skills: this.skills,
        };
    }
}

export default Character;
